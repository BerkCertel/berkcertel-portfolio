import { notFound } from "next/navigation";

// TODO(step 08): remove once posts render; until then this route only renders the 404.
export const instant = false;

// Posts are wired up in the blog step; until then every slug is a 404.
export default function BlogPostPage() {
  notFound();
}
