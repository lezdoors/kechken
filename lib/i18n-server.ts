import { headers } from "next/headers";
import { DEFAULT_LOCALE, dirForLocale, isLocale, type Locale } from "@/lib/i18n";

export async function getRequestLocale(): Promise<Locale> {
  const h = await headers();
  const locale = h.get("x-mt-locale");
  return isLocale(locale) ? locale : DEFAULT_LOCALE;
}

export async function getRequestDir(): Promise<"ltr" | "rtl"> {
  return dirForLocale(await getRequestLocale());
}
