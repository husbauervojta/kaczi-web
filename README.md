# kaczi-web

Nový web pro Kaczi. Astro 5, staticky generovaný, bez WordPressu.

## Spuštění

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # výsledek v dist/
npm run preview  # náhled produkčního buildu
```

## Tři výtvarné směry

Web běží ve třech kompletních vizuálních směrech. Přepínač je vpravo dole
(jen ve vývoji, volba se pamatuje v localStorage).

| Směr        | Poloha                                       | Typografie                  |
| ----------- | -------------------------------------------- | --------------------------- |
| **Krajina** | tichá autorská, mlha a vrstevnice             | Newsreader + Archivo        |
| **Šanson**  | noční, divadelní, reflektor                   | Bodoni Moda + Archivo       |
| **Provoz**  | jízdní řád, prodej a booking                  | Archivo + JetBrains Mono    |

Až padne rozhodnutí:

1. nastav `theme` v `src/lib/site.ts`,
2. smaž `src/components/ThemeSwitch.astro` a jeho import v `src/layouts/Base.astro`,
3. smaž zbylé dva bloky v `src/styles/tokens.css`.

Žádná komponenta nesahá na barvu ani na font přímo — všechno jde přes tokeny,
takže se nic dalšího měnit nemusí.

## Kde se co edituje

| Co               | Kde                              |
| ---------------- | -------------------------------- |
| Termíny koncertů | `src/data/koncerty.json`         |
| Desky a ceny     | `src/data/vydani.json`           |
| Kontakty, menu, citace z médií, milníky | `src/lib/site.ts` |
| Barvy, typografie, rytmus | `src/styles/tokens.css` |
| Komponenty       | `src/styles/base.css`            |

## Jeden zdroj pravdy pro koncerty

Termín se zapíše jednou do `src/data/koncerty.json` a sám se objeví:

- na homepage (nejbližší koncert + výpis),
- na `/koncerty/` (nadcházející i odehrané, rozdělené podle dnešního data),
- ve strukturovaných datech `MusicEvent` pro Google — díky tomu se koncerty
  můžou zobrazovat ve vyhledávání jako události,
- v kalendářovém feedu `/koncerty.ics`, který si fanoušek přidá jednou.

## Co je oproti současnému webu opravené

- Homepage má **20 kB HTML** místo 214 kB, celá stránka pod 40 kB místo 2,3 MB.
- Žádné jQuery, žádný Divi, žádné ikonové fonty.
- `viewport` bez `maximum-scale` — zoom na mobilu funguje.
- `MusicEvent` a `MusicGroup` ve strukturovaných datech.
- Právní stránky, souhlas u newsletteru, IČO v patičce.
- Sticky hlavička nemá průhledné pozadí, takže se nepřekrývá s obsahem.
- Sémantické nadpisy, viditelný focus, přeskočení na obsah.

## Další kroky

1. **Fotky.** Rámečky `.shot` mají dnes jen popisek. Jakmile budou fotky,
   nasadí se `<Image>` z `astro:assets` — automaticky WebP/AVIF a správné rozměry.
2. **CMS.** V `src/content.config.ts` stačí vyměnit `file()` loader za CMS
   (Keystatic zdarma přímo v repu, nebo Sanity free tier). Zbytek kódu se nemění.
3. **Eshop.** Stripe Checkout nebo Shoptet — WooCommerce ven.
4. **Nasazení.** Cloudflare Pages nebo Netlify, obojí zdarma na této velikosti.
   Push do gitu = nasazeno.
