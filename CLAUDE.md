# Kontext projektu pro Claude

Nový web pro zpěvačku **Kaczi** (kaczi.cz). Náhrada za stávající WordPress + Divi
+ WooCommerce. Autor projektu je webdesigner a vývojář, který zároveň staví její
značku — mluv s ním technicky a bez vaty, česky.

## Proč se web dělá znovu

Audit stávajícího webu (www.kaczi.cz) našel tohle:

- WordPress 6.9.7 + Divi 4.27.8 + **WooCommerce 6.3.2** (verze z roku 2022 na
  běžícím eshopu — bezpečnostní riziko)
- ~2,3 MB na homepage, z toho 214 kB samotné HTML, `scripts.min.js` 361 kB,
  jQuery, dva ikonové fonty (167 kB) kvůli pěti ikonám. TTFB ~1 s.
- 8 obrázků, **všech 8 bez alt textu**, 6 bez lazy-loadingu, žádný WebP.
  Náhledy videí 1624 px vykreslené na 267 px.
- `<meta viewport>` s `maximum-scale=1.0, user-scalable=0` — zakázaný zoom, WCAG fail
- H1 je jen „KACZI". Ve strukturovaných datech **chybí `MusicEvent` i `MusicGroup`** —
  u muzikantky s 7 nadcházejícími koncerty je to největší ztracená příležitost.
- Průhledná sticky hlavička se při scrollu překrývá s obsahem stránky
- Kontrasty pod WCAG: duchový nadpis „Novinka", placeholdery v patičce,
  tlačítko KONTAKT světle růžové na vínové
- Neostylovaný odkaz v textu v defaultní prohlížečové modré
- Logo je ručně kreslené a organické, ale web běží na Poppins + Inter najednou —
  **typografie popírá značku**. Tohle je jádro problému, ne rychlost.
- Eshop: 23 produktů, ale **žádné obchodní podmínky, GDPR, cookie lišta ani IČO**
- Press kit pro pořadatele obsahuje jen dvě PDF; 40+ mediálních referencí je
  zahrabaných na podstránce, na kterou se nikdo neproklikne

## Co tenhle projekt řeší

Homepage má **20 kB HTML** (dnes 214 kB), celá stránka pod 40 kB (dnes 2,3 MB).
Všechny body výše jsou v novém webu opravené.

## Architektura

**Astro 5, staticky generované, bez Reactu.** Cíl je nula runtime JS kromě
canvasu s vrstevnicemi a přepínače směrů.

### Jeden zdroj pravdy pro koncerty

`src/data/koncerty.json` → přes content collection (`src/content.config.ts`)
se propisuje na:

- homepage (nejbližší koncert + výpis)
- `/koncerty/` (nadcházející i odehrané, dělí se podle dnešního data)
- strukturovaná data `MusicEvent` (`eventLd()` v `src/lib/gigs.ts`)
- kalendářový feed `/koncerty.ics` (`src/pages/koncerty.ics.ts`)

**Nikdy nepiš termín na dvě místa.** Když přidáváš funkci nad koncerty, ber data
z `upcoming()` / `past()` v `src/lib/gigs.ts`.

### Tři výtvarné směry

Web běží ve třech kompletních vizuálních polohách. Klient si zatím nevybral.

| `data-theme` | Poloha | Typografie |
| --- | --- | --- |
| `krajina` | tichá autorská, mlha, vrstevnice jako motiv z jejího loga | Newsreader + Archivo |
| `sanson` | noc, reflektor, divadelní | Bodoni Moda + Archivo |
| `provoz` | jízdní řád, prodejní, booking | Archivo + JetBrains Mono |

Přepíná se atributem na `<html data-theme="…">`. Výchozí hodnota je
`SITE.theme` v `src/lib/site.ts`. `src/components/ThemeSwitch.astro` je
**vývojová pomůcka**, v produkci se smaže.

## Pravidla, která drž

1. **Žádná komponenta nesahá na barvu, font ani rytmus přímo.** Všechno jde přes
   tokeny v `src/styles/tokens.css`. Nová hodnota = nový token ve všech třech
   směrech, ne literál v komponentě.
2. **Nepřidávej framework ani knihovnu**, dokud to nejde bez ní. Zatím není potřeba nic.
3. **Přístupnost není volitelná** — viewport bez `maximum-scale`, kontrast ≥ 4,5:1,
   viditelný focus, sémantické nadpisy, alt u každého obrázku.
4. **Obsah je český.** Diakritika, české uvozovky „…", mezera před jednotkou
   (`18:30`, `1 257 m n. m.`), datum ve formátu `11. 9.`
5. **Copy piš z pohledu návštěvníka**, ne systému. Tlačítko říká, co se stane.
6. Fotky zatím nejsou — rámečky `.shot` mají jen popisek. Až budou, nasadí se
   `<Image>` z `astro:assets` (vyžaduje `npm approve-scripts sharp`).

## Struktura

```
src/
├─ data/koncerty.json     ← termíny (jediný zdroj pravdy)
├─ data/vydani.json       ← desky a ceny
├─ lib/site.ts            ← kontakty, menu, citace médií, milníky, výchozí směr
├─ lib/gigs.ts            ← filtry, české datum, JSON-LD
├─ content.config.ts      ← schémata kolekcí
├─ styles/tokens.css      ← tři výtvarné směry
├─ styles/base.css        ← komponenty
├─ layouts/Base.astro     ← head, meta, JSON-LD, skip link
├─ components/            ← Nav, Footer, GigList, Newsletter, Terrain, ThemeSwitch
└─ pages/                 ← 9 stránek + koncerty.ics
```

## Stav a další kroky

Hotovo: struktura, tři směry, koncerty s ICS a JSON-LD, press kit pro pořadatele,
eshop jako výpis, právní stránky jako kostry, newsletter se souhlasem.

Další v pořadí:

1. **Rozhodnout směr.** Pak nastavit `SITE.theme`, smazat `ThemeSwitch.astro`
   a zbylé dva bloky v `tokens.css`.
2. **Fotky** přes `astro:assets`.
3. **CMS** — v `content.config.ts` vyměnit `file()` loader za Keystatic
   (zdarma, běží v repu). Zbytek kódu se nemění.
4. **Eshop** — Stripe Checkout místo WooCommerce.
5. **Nasazení** — Cloudflare Pages nebo Netlify, obojí zdarma na této velikosti.

Právní stránky (`obchodni-podminky`, `ochrana-osobnich-udaju`) jsou **kostry
k doplnění**, ne hotové dokumenty. Před ostrým provozem je musí projít právník.

## Spuštění

```bash
npm install
npm run dev      # http://localhost:4321
npm run build
```

Zůstáváme na Astro 5. Upgrade až po dokončení designu.
