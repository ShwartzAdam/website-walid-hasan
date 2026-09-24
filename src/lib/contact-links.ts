import { contact } from "@/content/company";

export function telHref() {
  return `tel:${contact.phone}`;
}

export function mailHref() {
  return `mailto:${contact.email}`;
}

export function whatsappHref(text?: string) {
  const q = text ? `?text=${encodeURIComponent(text)}` : "";
  return `https://wa.me/${contact.whatsapp}${q}`;
}
