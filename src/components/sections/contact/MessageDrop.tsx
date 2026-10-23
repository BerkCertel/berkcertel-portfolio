"use client";

import { useEffect, useState } from "react";

import { VISUAL_CELL_CLASS } from "@/components/common/styles";
import { cn } from "@/lib/utils";

import { CONTACT_SENT_EVENT } from "./contact-events";
import styles from "./MessageDrop.module.css";

/** V5: a blue message card drops onto two isometric layers; replays when the form is sent. */
export function MessageDrop() {
  // Changing the key remounts the card, which restarts its animation from the top.
  const [run, setRun] = useState(0);

  useEffect(() => {
    const replay = () => setRun((value) => value + 1);
    window.addEventListener(CONTACT_SENT_EVENT, replay);
    return () => window.removeEventListener(CONTACT_SENT_EVENT, replay);
  }, []);

  return (
    <div className={VISUAL_CELL_CLASS} aria-hidden="true">
      <div className={styles.scene}>
        <div className={cn(styles.sheet, styles.bottom)} />
        <div className={cn(styles.sheet, styles.top)} />
        <div key={run} className={styles.msg} />
      </div>
    </div>
  );
}
