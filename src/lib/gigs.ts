import { getCollection, type CollectionEntry } from "astro:content";

export type Gig = CollectionEntry<"koncerty">;

/** Nadcházející koncerty, seřazené od nejbližšího. */
export async function upcoming(): Promise<Gig[]> {
  const dnes = new Date().toISOString().slice(0, 10);
  return (await getCollection("koncerty"))
    .filter((g) => g.data.date >= dnes)
    .sort((a, b) => a.data.date.localeCompare(b.data.date));
}

/** Odehrané koncerty, od nejnovějšího — důkaz pro pořadatele. */
export async function past(): Promise<Gig[]> {
  const dnes = new Date().toISOString().slice(0, 10);
  return (await getCollection("koncerty"))
    .filter((g) => g.data.date < dnes)
    .sort((a, b) => b.data.date.localeCompare(a.data.date));
}

/** 11. 9. — česky, bez nul na začátku. */
export function czDate(iso: string): string {
  const [, m, d] = iso.split("-");
  return `${Number(d)}. ${Number(m)}.`;
}

/** Strukturovaná data pro Google. To, co dnešnímu webu úplně chybí. */
export function eventLd(gigs: Gig[], performerUrl: string) {
  return gigs.map((g) => ({
    "@context": "https://schema.org",
    "@type": "MusicEvent",
    name: `Kaczi — ${g.data.venue}`,
    startDate: `${g.data.date}T${g.data.time}:00+02:00`,
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    location: {
      "@type": "Place",
      name: g.data.venue,
      address: { "@type": "PostalAddress", addressLocality: g.data.city, addressCountry: "CZ" },
    },
    performer: { "@type": "MusicGroup", name: "Kaczi", url: performerUrl },
    ...(g.data.ticketUrl
      ? { offers: { "@type": "Offer", url: g.data.ticketUrl, availability: "https://schema.org/InStock" } }
      : {}),
  }));
}
