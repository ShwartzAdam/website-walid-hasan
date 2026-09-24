"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { defaultLocale, isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { href } from "@/lib/site";

export default function NotFound() {
  const params = useParams<{ locale?: string }>();
  const locale = isLocale(params?.locale) ? params.locale : defaultLocale;
  const dict = getDictionary(locale);
  return (
    <section className="survey-grid flex min-h-dvh items-center bg-ink text-paper">
      <div className="container-x py-32">
        <p className="font-display text-display font-bold text-signal">404</p>
        <h1 className="mt-6 font-display text-headline font-bold">{dict.notFound.title}</h1>
        <p className="mt-4 max-w-md text-sand">{dict.notFound.body}</p>
        <Link href={href(locale)} className="btn btn-primary mt-10">
          {dict.notFound.back}
        </Link>
      </div>
    </section>
  );
}
