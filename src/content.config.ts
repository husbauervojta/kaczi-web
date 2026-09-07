import { defineCollection, z } from "astro:content";
import { file } from "astro/loaders";

/**
 * Jeden zdroj pravdy.
 * Termín se přidá do src/data/koncerty.json — a projeví se na homepage,
 * na stránce /koncerty, ve strukturovaných datech pro Google i v /koncerty.ics.
 * V další fázi se tenhle loader vymění za CMS a nic dalšího se měnit nemusí.
 */
const koncerty = defineCollection({
  loader: file("src/data/koncerty.json"),
  schema: z.object({
    date: z.string(),
    time: z.string(),
    city: z.string(),
    venue: z.string(),
    ticketUrl: z.string().optional().default(""),
    note: z.string().optional().default(""),
  }),
});

const vydani = defineCollection({
  loader: file("src/data/vydani.json"),
  schema: z.object({
    title: z.string(),
    year: z.number(),
    format: z.string(),
    note: z.string().optional().default(""),
    priceCzk: z.number(),
  }),
});

export const collections = { koncerty, vydani };
