import { NextResponse } from "next/server";
import {
  validateFiles,
  validateInquiry,
  type InquiryInput,
} from "@/lib/contact-schema";

export const runtime = "nodejs";

const FIELDS: (keyof InquiryInput)[] = ["name", "company", "phone", "email", "location", "type", "scope", "message"];

function escapeHtml(s: string) {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
}

export async function POST(request: Request) {
  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_body" }, { status: 400 });
  }

  // Honeypot: bots fill every field. Pretend success.
  if (String(form.get("website") ?? "").trim()) return NextResponse.json({ ok: true });

  const input = Object.fromEntries(
    FIELDS.map((f) => [f, String(form.get(f) ?? "").slice(0, f === "message" ? 5000 : 300)]),
  ) as unknown as InquiryInput;
  const locale = String(form.get("locale") ?? "he").slice(0, 5);

  const files = form.getAll("files").filter((f): f is File => f instanceof File && f.size > 0);
  const errors: Record<string, string> = { ...validateInquiry(input) };
  const fileError = validateFiles(files);
  if (fileError) errors.files = fileError;
  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ ok: false, errors }, { status: 422 });
  }

  const summary = FIELDS.map((f) => `${f}: ${input[f] || "—"}`).join("\n");
  const fileNames = files.map((f) => `${f.name} (${Math.round(f.size / 1024)} KB)`);

  try {
    if (process.env.RESEND_API_KEY && process.env.CONTACT_TO_EMAIL) {
      const attachments = await Promise.all(
        files.map(async (f) => ({ filename: f.name, content: Buffer.from(await f.arrayBuffer()).toString("base64") })),
      );
      const html = `<h2>New project inquiry (${escapeHtml(locale)})</h2><table>${FIELDS.map(
        (f) => `<tr><th align="left">${f}</th><td>${escapeHtml(input[f] || "—").replace(/\n/g, "<br>")}</td></tr>`,
      ).join("")}</table>`;
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          from: process.env.CONTACT_FROM_EMAIL || "website@walidhasan.co.il",
          to: process.env.CONTACT_TO_EMAIL.split(",").map((s) => s.trim()),
          reply_to: input.email,
          subject: `Project inquiry — ${input.name}${input.company ? ` / ${input.company}` : ""}`,
          html,
          text: summary,
          attachments,
        }),
      });
      if (!res.ok) throw new Error(`Resend responded ${res.status}`);
    } else if (process.env.CONTACT_WEBHOOK_URL) {
      const res = await fetch(process.env.CONTACT_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...input, locale, files: fileNames, receivedAt: new Date().toISOString() }),
      });
      if (!res.ok) throw new Error(`Webhook responded ${res.status}`);
    } else if (process.env.NODE_ENV === "production") {
      // Never silently drop a lead in production.
      console.error("[contact] No delivery channel configured (RESEND_API_KEY / CONTACT_WEBHOOK_URL).");
      return NextResponse.json({ ok: false, error: "not_configured" }, { status: 503 });
    } else {
      console.info(`[contact] Inquiry received (dev, not delivered):\n${summary}\nfiles: ${fileNames.join(", ") || "—"}`);
    }
  } catch (err) {
    console.error("[contact] Delivery failed", err);
    return NextResponse.json({ ok: false, error: "delivery_failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
