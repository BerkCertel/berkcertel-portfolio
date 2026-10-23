"use client";

import { Mail } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useMemo, useRef } from "react";

import { CONTACT_SUBJECTS } from "@/constants/contact";

import { CONTACT_SENT_EVENT } from "./contact-events";
import styles from "./ContactNetwork.module.css";

type Point = [number, number];

/** Isometric projection of grid coordinates (from the reference: cell size 35, origin 260/212). */
const CELL = 35;
const iso = (x: number, y: number, z = 0): Point => [
  260 + (x - y) * CELL * 0.866,
  212 + (x + y) * CELL * 0.5 - z * CELL * 0.9,
];
const toPoints = (pts: [number, number, number?][]) =>
  pts
    .map(([x, y, z]) =>
      iso(x, y, z)
        .map((n) => n.toFixed(1))
        .join(","),
    )
    .join(" ");

/** Visitor blocks around the edge, and their Manhattan routes to the center block. */
const VISITORS: Point[] = [
  [-3, -3],
  [3, -3],
  [-3, 2],
  [2, 3],
  [4, 0],
  [-1, -4],
  [-4, 0],
];
const ROUTES: Point[][] = VISITORS.map(([x, y]) => {
  const pts: Point[] = [
    [x, y],
    [x, 0],
    [x > 0 ? 1.25 : x < 0 ? -1.25 : 0, 0],
  ];
  if (x === 0) pts.splice(1, 1, [0, y > 0 ? 1.25 : -1.25]);
  return pts;
});
const GRID = Array.from({ length: 9 }, (_, k) => k - 4);

const TRAVEL_MS = 1600;
const CARD_MS = 1900;
const NEXT_MS = 2600;
const LIFT_MS = 900;
const RIPPLE_MS = 1400;

/** The three faces of a box at (x, y), from height z0 to z0 + h, half-width w. */
function boxFaces(x: number, y: number, z0: number, h: number, w: number) {
  return {
    left: toPoints([
      [x - w, y + w, z0],
      [x + w, y + w, z0],
      [x + w, y + w, z0 + h],
      [x - w, y + w, z0 + h],
    ]),
    right: toPoints([
      [x + w, y - w, z0],
      [x + w, y + w, z0],
      [x + w, y + w, z0 + h],
      [x + w, y - w, z0 + h],
    ]),
    top: toPoints([
      [x - w, y - w, z0 + h],
      [x + w, y - w, z0 + h],
      [x + w, y + w, z0 + h],
      [x - w, y + w, z0 + h],
    ]),
  };
}

function Box({ x, y, z0, h, w }: { x: number; y: number; z0: number; h: number; w: number }) {
  const faces = boxFaces(x, y, z0, h, w);
  return (
    <>
      <polygon className={styles.faceL} points={faces.left} />
      <polygon className={styles.faceR} points={faces.right} />
      <polygon className={styles.faceTop} points={faces.top} />
    </>
  );
}

const length = (pts: Point[]) =>
  pts.slice(1).reduce((sum, p, i) => sum + Math.hypot(p[0] - pts[i]![0], p[1] - pts[i]![1]), 0);

/** Route drawn up to distance `d` (the packet sits on its last point). */
function partialRoute(pts: Point[], d: number): Point[] {
  const out: Point[] = [pts[0]!];
  let travelled = 0;
  for (let i = 1; i < pts.length; i++) {
    const [ax, ay] = pts[i - 1]!;
    const [bx, by] = pts[i]!;
    const segment = Math.hypot(bx - ax, by - ay);
    if (travelled + segment < d) {
      out.push(pts[i]!);
      travelled += segment;
    } else {
      const t = (d - travelled) / segment;
      out.push([ax + (bx - ax) * t, ay + (by - ay) * t]);
      break;
    }
  }
  return out;
}

const easeInOut = (k: number) => (k < 0.5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2);

/**
 * V6 "connection network": visitors on an isometric grid send yellow packets along the grid lines
 * to the three-layer block in the middle; on arrival the top layer lifts, a ripple spreads and a
 * "New message · topic" card appears. Pauses off-screen and in hidden tabs; static with reduced
 * motion. Sends a packet right away when the contact form succeeds.
 */
export function ContactNetwork() {
  const t = useTranslations("contact");
  const topics = useMemo(
    () => CONTACT_SUBJECTS.map((subject) => t(`form.subjects.${subject}`)),
    [t],
  );

  const rootRef = useRef<HTMLDivElement>(null);
  const nodesRef = useRef<SVGGElement>(null);
  const slabRefs = useRef<(SVGGElement | null)[]>([]);
  const routeRef = useRef<SVGPolylineElement>(null);
  const packetRef = useRef<SVGCircleElement>(null);
  const glowRef = useRef<SVGCircleElement>(null);
  const fxRef = useRef<SVGGElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const topicRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const root = rootRef.current!;
    const route = routeRef.current!;
    const packet = packetRef.current!;
    const glow = glowRef.current!;
    const fx = fxRef.current!;
    const card = cardRef.current!;
    const visitorNodes = [...nodesRef.current!.children] as SVGGElement[];

    let hover = 0;
    let lift = 0;
    let liftAt = 0;
    let current: { pts: Point[]; len: number; t: number } | null = null;
    let nextIndex = 0;
    let topicIndex = 0;
    let idleSince = 0;
    let ripples: number[] = [];
    let cardTimer = 0;

    /** Redraws the center block (layers open on hover, the top one lifts on arrival). */
    const drawCenter = () => {
      const gap = 0.46 + 0.32 * hover + 0.08 * lift;
      slabRefs.current.forEach((group, i) => {
        if (!group) return;
        const faces = boxFaces(0, 0, i * gap + (i === 2 ? 0.4 * lift : 0), 0.24, 1.15);
        const [left, right, top] = group.children;
        left?.setAttribute("points", faces.left);
        right?.setAttribute("points", faces.right);
        top?.setAttribute("points", faces.top);
      });
    };

    const setHot = (index: number | null) =>
      visitorNodes.forEach((node, k) => node.classList.toggle(styles.hot!, k === index));

    const launch = (index?: number) => {
      let i = index;
      if (i === undefined) {
        i = nextIndex;
        nextIndex = (nextIndex + 1 + Math.floor(Math.random() * 2)) % VISITORS.length;
      }
      const pts = ROUTES[i]!;
      current = { pts, len: length(pts), t: 0 };
      setHot(i);
    };

    const showCard = () => {
      topicRef.current!.textContent = topics[topicIndex++ % topics.length]!;
      card.setAttribute("data-on", "");
      window.clearTimeout(cardTimer);
      cardTimer = window.setTimeout(() => card.removeAttribute("data-on"), CARD_MS);
    };

    const arrive = (now: number) => {
      lift = 1;
      liftAt = now;
      ripples.push(now);
      showCard();
      setHot(null);
    };

    // Reduced motion: one static frame — a drawn route and the card.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      drawCenter();
      route.setAttribute("points", toPoints(ROUTES[0]!.map(([x, y]) => [x, y, 0.02])));
      topicRef.current!.textContent = topics[0]!;
      card.setAttribute("data-on", "");
      return;
    }

    let frame = 0;
    let last = performance.now();
    let inView = true;

    const tick = (now: number) => {
      frame = 0;
      const dt = Math.min(50, now - last);
      last = now;

      hover += ((root.matches(":hover") ? 1 : 0) - hover) * 0.12;
      if (lift > 0) lift = Math.max(0, 1 - (now - liftAt) / LIFT_MS);
      drawCenter();

      if (current) {
        current.t += dt / TRAVEL_MS;
        const k = Math.min(1, current.t);
        const drawn = partialRoute(current.pts, easeInOut(k) * current.len);
        route.setAttribute("points", toPoints(drawn.map(([x, y]) => [x, y, 0.02])));
        route.style.opacity = "1";
        const [x, y] = drawn[drawn.length - 1]!;
        const [px, py] = iso(x, y, 0.15);
        for (const dot of [packet, glow]) {
          dot.setAttribute("cx", String(px));
          dot.setAttribute("cy", String(py));
          dot.style.opacity = "1";
        }
        if (k >= 1) {
          arrive(now);
          current = null;
          idleSince = now;
        }
      } else {
        route.style.opacity = String(Math.max(0, 1 - (now - idleSince) / 700));
        packet.style.opacity = glow.style.opacity = "0";
        if (now - idleSince > NEXT_MS) launch();
      }

      // Ripples spreading on the floor around the center.
      ripples = ripples.filter((start) => now - start < RIPPLE_MS);
      const [cx, cy] = iso(0, 0, 0);
      fx.replaceChildren(
        ...ripples.map((start) => {
          const p = (now - start) / RIPPLE_MS;
          const r = 1.3 + p * 2.6;
          const ellipse = document.createElementNS("http://www.w3.org/2000/svg", "ellipse");
          ellipse.setAttribute("class", styles.ripple!);
          ellipse.setAttribute("cx", String(cx));
          ellipse.setAttribute("cy", String(cy));
          ellipse.setAttribute("rx", String(r * CELL * 1.2247));
          ellipse.setAttribute("ry", String(r * CELL * 0.7071));
          ellipse.setAttribute("opacity", String((1 - p) * 0.8));
          return ellipse;
        }),
      );

      if (inView && !document.hidden) frame = requestAnimationFrame(tick);
    };

    const resume = () => {
      if (frame || !inView || document.hidden) return;
      last = performance.now();
      frame = requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(([entry]) => {
      inView = entry?.isIntersecting ?? false;
      resume();
    });
    const onSent = () => launch(Math.floor(Math.random() * VISITORS.length));

    launch(0);
    observer.observe(root);
    document.addEventListener("visibilitychange", resume);
    window.addEventListener(CONTACT_SENT_EVENT, onSent);
    resume();

    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(cardTimer);
      observer.disconnect();
      document.removeEventListener("visibilitychange", resume);
      window.removeEventListener(CONTACT_SENT_EVENT, onSent);
    };
  }, [topics]);

  return (
    <div ref={rootRef} className={styles.net} aria-hidden="true">
      <svg viewBox="0 0 520 400">
        <g className={styles.grid}>
          {GRID.map((i) => {
            const [ax, ay] = iso(i, -4);
            const [bx, by] = iso(i, 4);
            const [cx, cy] = iso(-4, i);
            const [dx, dy] = iso(4, i);
            return (
              <g key={i}>
                <line x1={ax} y1={ay} x2={bx} y2={by} />
                <line x1={cx} y1={cy} x2={dx} y2={dy} />
              </g>
            );
          })}
        </g>
        <g>
          {ROUTES.map((pts, i) => (
            <polyline
              key={i}
              className={styles.ghost}
              points={toPoints(pts.map(([x, y]) => [x, y, 0.02]))}
            />
          ))}
        </g>
        <g ref={nodesRef}>
          {VISITORS.map(([x, y]) => (
            <g key={`${x},${y}`}>
              <Box x={x} y={y} z0={0} h={0.45} w={0.32} />
            </g>
          ))}
        </g>
        <g ref={fxRef} />
        <g>
          <polyline ref={routeRef} className={styles.route} points="" />
          <circle ref={glowRef} className={styles.packetGlow} r="11" style={{ opacity: 0 }} />
          <circle ref={packetRef} className={styles.packet} r="5" style={{ opacity: 0 }} />
        </g>
        <g>
          {[styles.slab0, styles.slab1, styles.slab2].map((slab, i) => (
            <g
              key={slab}
              className={slab}
              ref={(node) => {
                slabRefs.current[i] = node;
              }}
            >
              <Box x={0} y={0} z0={i * 0.46} h={0.24} w={1.15} />
            </g>
          ))}
        </g>
      </svg>
      <div ref={cardRef} className={styles.card}>
        <span className={styles.cardIcon}>
          <Mail className="size-4" strokeWidth={2} />
        </span>
        <div>
          <b className={styles.cardTitle}>{t("visual.newMessage")}</b>
          <span ref={topicRef} className={styles.cardTopic}>
            {topics[0]}
          </span>
        </div>
        <i className={styles.cardDot} />
      </div>
    </div>
  );
}
