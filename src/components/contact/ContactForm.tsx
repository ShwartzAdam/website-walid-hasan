"use client";

import { useRef, useState } from "react";
import { contact } from "@/content/company";
import { categories } from "@/content/taxonomy";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { track } from "@/lib/analytics";
import {
  ALLOWED_EXTENSIONS,
  SCOPE_OPTIONS,
  validateFiles,
  validateInquiry,
  type FieldError,
  type InquiryInput,
} from "@/lib/contact-schema";

type Status = "idle" | "sending" | "success" | "error";

/**
 * Where inquiries are posted. The server build uses its own /api/contact route.
 * A static build (GitHub Pages) has no server, so it posts to
 * NEXT_PUBLIC_CONTACT_ENDPOINT (e.g. a Formspree / Basin / Getform URL) when
 * set, and otherwise hands the inquiry to the visitor's email app.
 */
const STATIC = process.env.NEXT_PUBLIC_STATIC_EXPORT === "true";
const ENDPOINT = process.env.NEXT_PUBLIC_CONTACT_ENDPOINT || (STATIC ? "" : "/api/contact");

export function ContactForm({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const t = dict.contact;
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, FieldError>>({});
  const [fileNames, setFileNames] = useState<string[]>([]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const input = Object.fromEntries(
      ["name", "company", "phone", "email", "location", "type", "scope", "message"].map((k) => [k, String(data.get(k) ?? "")]),
    ) as unknown as InquiryInput;
    const files = data.getAll("files").filter((f): f is File => f instanceof File && f.size > 0);

    const next: Record<string, FieldError> = { ...validateInquiry(input) };
    const fileError = validateFiles(files);
    if (fileError) next.files = fileError;
    setErrors(next);
    if (Object.keys(next).length > 0) {
      const first = Object.keys(next)[0];
      form.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }

    if (!ENDPOINT) {
      const body = Object.entries(input)
        .filter(([, v]) => v)
        .map(([k, v]) => `${t.fields[k as keyof typeof t.fields] ?? k}: ${v}`)
        .join("\n");
      track("contact_form_submit", { locale, project_type: input.type || "unspecified", files: 0, channel: "mailto" });
      window.location.href = `mailto:${contact.email}?subject=${encodeURIComponent(`${t.formTitle} — ${input.name}`)}&body=${encodeURIComponent(body)}`;
      return;
    }

    setStatus("sending");
    data.set("locale", locale);
    try {
      const res = await fetch(ENDPOINT, { method: "POST", body: data, headers: { Accept: "application/json" } });
      const json = (await res.json().catch(() => ({}))) as { ok?: boolean; errors?: Record<string, FieldError> };
      // Our API answers { ok: true }; third-party form services answer 2xx with their own shape.
      if (res.ok && (json.ok ?? true)) {
        setStatus("success");
        track("contact_form_submit", { locale, project_type: input.type || "unspecified", files: files.length });
        form.reset();
      } else {
        if (json.errors) setErrors(json.errors);
        setStatus("error");
        track("contact_form_error", { locale, status: res.status });
      }
    } catch {
      setStatus("error");
      track("contact_form_error", { locale, status: 0 });
    }
  };

  if (status === "success") {
    return (
      <div role="status" className="border-s-4 border-signal bg-ink p-8 text-paper md:p-12">
        <p className="font-display text-3xl font-bold">{t.success}</p>
      </div>
    );
  }

  const fieldProps = (name: string) => ({
    id: `f-${name}`,
    name,
    "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby": errors[name] ? `f-${name}-error` : undefined,
    className:
      "mt-2 block w-full border-0 border-b border-steel bg-transparent px-0 py-3 text-lg text-ink placeholder:text-stone focus:border-ink focus:ring-0 focus:outline-none aria-invalid:border-red-700",
  });

  const err = (name: string) =>
    errors[name] ? (
      <p id={`f-${name}-error`} className="mt-2 text-sm text-red-700">
        {t.errors[errors[name]]}
      </p>
    ) : null;

  const label = (name: keyof typeof t.fields, required = false) => (
    <label htmlFor={`f-${name}`} className="text-sm font-semibold text-steel">
      {t.fields[name]}
      {required && (
        <span className="text-signal-deep" aria-hidden>
          {" "}*
        </span>
      )}
      {required && <span className="sr-only"> ({t.required})</span>}
    </label>
  );

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="grid gap-x-8 gap-y-10 md:grid-cols-2">
      {/* Honeypot — hidden from people and assistive tech */}
      <div className="hidden" aria-hidden>
        <label>
          Website <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div>
        {label("name", true)}
        <input {...fieldProps("name")} type="text" autoComplete="name" required />
        {err("name")}
      </div>
      <div>
        {label("company")}
        <input {...fieldProps("company")} type="text" autoComplete="organization" />
      </div>
      <div>
        {label("phone", true)}
        <input {...fieldProps("phone")} type="tel" autoComplete="tel" dir="ltr" required className={`${fieldProps("phone").className} rtl:text-end`} />
        {err("phone")}
      </div>
      <div>
        {label("email", true)}
        <input {...fieldProps("email")} type="email" autoComplete="email" dir="ltr" required className={`${fieldProps("email").className} rtl:text-end`} />
        {err("email")}
      </div>
      <div>
        {label("location")}
        <input {...fieldProps("location")} type="text" />
      </div>
      <div>
        {label("type")}
        <select {...fieldProps("type")} defaultValue="">
          <option value="">{t.selectPlaceholder}</option>
          {Object.entries(categories).map(([id, label]) => (
            <option key={id} value={id}>
              {label[locale]}
            </option>
          ))}
          <option value="other">{t.typeOther}</option>
        </select>
      </div>
      <div className="md:col-span-2">
        {label("scope")}
        <select {...fieldProps("scope")} defaultValue="">
          <option value="">{t.selectPlaceholder}</option>
          {SCOPE_OPTIONS.map((id) => (
            <option key={id} value={id}>
              {t.scopeOptions[id]}
            </option>
          ))}
        </select>
      </div>
      <div className="md:col-span-2">
        {label("message")}
        <textarea {...fieldProps("message")} rows={5} />
      </div>
      <div className="md:col-span-2">
        {label("files")}
        {/* The native control is stretched invisibly over a localized one: the browser's own
            "Choose files / No file chosen" text follows the browser language, not the page's. */}
        <div className="relative mt-3 flex flex-wrap items-center gap-4 border border-dashed border-steel p-6 hover:border-ink has-[input:focus-visible]:outline-2 has-[input:focus-visible]:outline-offset-3 has-[input:focus-visible]:outline-signal">
          <input
            {...fieldProps("files")}
            type="file"
            multiple
            accept={ALLOWED_EXTENSIONS.map((e) => `.${e}`).join(",")}
            aria-describedby={`f-files-hint${errors.files ? " f-files-error" : ""}`}
            onChange={(e) => setFileNames(Array.from(e.currentTarget.files ?? [], (f) => f.name))}
            className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
          />
          <span aria-hidden className="bg-ink px-4 py-2 text-sm font-semibold text-paper">
            {t.chooseFiles}
          </span>
          <span aria-live="polite" className="min-w-0 text-sm break-all text-steel">
            {fileNames.length > 0 ? fileNames.join(", ") : t.noFiles}
          </span>
        </div>
        <p id="f-files-hint" className="mt-2 text-sm text-steel">
          {t.fields.filesHint}
        </p>
        {err("files")}
      </div>

      <div className="flex flex-col items-start gap-4 md:col-span-2">
        <button type="submit" disabled={status === "sending"} className="btn btn-dark min-h-14 px-8 text-base disabled:opacity-60">
          {status === "sending" ? t.sending : t.submit}
        </button>
        <p className="text-sm text-steel">{t.privacy}</p>
        {status === "error" && (
          <p role="alert" className="text-red-700">
            {t.error}
          </p>
        )}
      </div>
    </form>
  );
}
