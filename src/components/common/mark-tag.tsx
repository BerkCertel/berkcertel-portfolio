import { Marker } from "./Marker";

/**
 * `t.rich` tag map for messages containing `<mark>…</mark>`:
 * `t.rich("hero.lead", markTag)`. Plain module so server components can import it.
 */
export const markTag = { mark: (chunks: React.ReactNode) => <Marker>{chunks}</Marker> };
