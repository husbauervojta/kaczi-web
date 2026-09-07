import type { APIRoute } from "astro";
import { upcoming } from "../lib/gigs";

/**
 * Kalendářový feed. Fanoušek si ho přidá jednou a další termíny mu naskočí samy.
 * Generuje se ze stejných dat jako výpis — nic se nikde nepíše dvakrát.
 */
export const GET: APIRoute = async () => {
  const gigs = await upcoming();

  const esc = (s: string) => s.replace(/([,;\\])/g, "\\$1").replace(/\n/g, "\\n");
  const stamp = (iso: string, time: string) => `${iso.replace(/-/g, "")}T${time.replace(":", "")}00`;

  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//kaczi.cz//koncerty//CS",
    "CALSCALE:GREGORIAN",
    "X-WR-CALNAME:Koncerty Kaczi",
    "X-WR-TIMEZONE:Europe/Prague",
  ];

  for (const g of gigs) {
    lines.push(
      "BEGIN:VEVENT",
      `UID:${g.id}@kaczi.cz`,
      `DTSTAMP:${stamp(g.data.date, g.data.time)}`,
      `DTSTART;TZID=Europe/Prague:${stamp(g.data.date, g.data.time)}`,
      `SUMMARY:${esc(`Kaczi — ${g.data.venue}`)}`,
      `LOCATION:${esc(`${g.data.venue}, ${g.data.city}`)}`,
      `URL:https://www.kaczi.cz/koncerty/`,
      "END:VEVENT"
    );
  }

  lines.push("END:VCALENDAR");

  return new Response(lines.join("\r\n"), {
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Content-Disposition": 'attachment; filename="koncerty-kaczi.ics"',
    },
  });
};
