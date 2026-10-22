import { notFound } from "next/navigation";

// Posts are wired up in the blog step; until then every slug is a 404.
export default function BlogPostPage() {
  notFound();
}
