/**
 * /support is retired — the page now lives at /faq.
 * This redirect runs at build time for the static export.
 */
import { redirect } from "next/navigation";

export default function SupportRedirect() {
  redirect("/faq");
}
