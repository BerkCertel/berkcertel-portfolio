import { useTranslations } from "next-intl";

import { cn } from "@/lib/utils";

import styles from "./ServicesFlow.module.css";

type NodeKey = "browser" | "api" | "service" | "queue" | "database";

/** Boxes of the request flow (positions from the reference SVG, viewBox 560×240). */
const NODES: { key: NodeKey; x: number; y: number }[] = [
  { key: "browser", x: 10, y: 94 },
  { key: "api", x: 150, y: 94 },
  { key: "service", x: 300, y: 30 },
  { key: "queue", x: 300, y: 158 },
  { key: "database", x: 440, y: 94 },
];

/** Connector curves: browser→api, api→service, api→queue, service→db, queue→db. */
const WIRES = [
  "M120 120 H150",
  "M260 112 C282 112,278 56,300 56",
  "M260 128 C282 128,278 184,300 184",
  "M410 56 C432 56,428 112,440 112",
  "M410 184 C432 184,428 128,440 128",
];

/** Glowing dots travelling along the wires (2.4s loop): blue towards Servis, yellow to Kuyruk. */
const PACKETS: { wire: number; begin: string; sun?: boolean }[] = [
  { wire: 0, begin: "0s" },
  { wire: 1, begin: "0.6s" },
  { wire: 2, begin: "0.6s", sun: true },
  { wire: 3, begin: "1.2s" },
  { wire: 4, begin: "1.2s", sun: true },
];

/** V1 "data flow": Browser → API → (Service, Queue) → Database, with travelling packets. Used once per page (fixed SVG ids). */
export function ServicesFlow() {
  const t = useTranslations("services.flow");

  return (
    <div className={styles.cell} aria-hidden="true">
      <svg className={styles.svg} viewBox="0 0 560 240">
        {WIRES.map((d, i) => (
          <path key={d} id={`services-flow-w${i}`} className={styles.wire} d={d} />
        ))}
        {NODES.map(({ key, x, y }) => (
          <g key={key} className={cn(styles.node, key === "database" && styles.db)}>
            <rect x={x} y={y} width="110" height="52" rx="12" />
            <text x={x + 14} y={y + 23}>
              {t(key)}
            </text>
            <text className={styles.note} x={x + 14} y={y + 40}>
              {t(`${key}Note`)}
            </text>
          </g>
        ))}
        {PACKETS.map(({ wire, begin, sun }) => (
          <circle key={wire} r="4.5" opacity="0" className={cn(styles.packet, sun && styles.sun)}>
            <animateMotion
              dur="2.4s"
              begin={begin}
              repeatCount="indefinite"
              keyPoints="0;1;1"
              keyTimes="0;0.42;1"
              calcMode="linear"
            >
              <mpath href={`#services-flow-w${wire}`} />
            </animateMotion>
            <animate
              attributeName="opacity"
              values="0;1;1;0;0"
              keyTimes="0;0.05;0.38;0.45;1"
              dur="2.4s"
              begin={begin}
              repeatCount="indefinite"
            />
          </circle>
        ))}
      </svg>
    </div>
  );
}
