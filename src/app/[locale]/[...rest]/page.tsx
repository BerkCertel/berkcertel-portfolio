import { notFound } from "next/navigation";

// This route only ever renders the 404, so there is no instant navigation to validate.
export const instant = false;

// Any unknown path inside a locale renders the localized not-found page.
export default function CatchAllPage() {
  notFound();
}
