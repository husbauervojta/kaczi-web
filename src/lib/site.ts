/** Globální nastavení webu — jedno místo na všechno, co se opakuje. */
export const SITE = {
  name: "Kaczi",
  url: "https://www.kaczi.cz",
  claim:
    "Multiinstrumentalistka a písničkářka z Beskyd. Šanson, pop a rock v jednom hlase, a v harmonice, kterou si nosí na záda.",
  description:
    "Kaczi, multiinstrumentalistka, autorka a písničkářka z Beskyd. Termíny koncertů, alba Kněhyně a Nahá, press kit pro pořadatele.",
  booking: {
    person: "Jan Kořenek",
    phone: "+420 605 517 841",
    phoneHref: "tel:+420605517841",
    email: "booking@kaczi.cz",
  },
  shopEmail: "info@kaczi.cz",
  /**
   * Výchozí výtvarný směr: "krajina" | "sanson" | "provoz".
   * Přepínač vpravo dole je jen pro vývoj — až se rozhodneš,
   * smažeš ThemeSwitch a zbylé dva bloky v tokens.css.
   */
  theme: "krajina" as const,
  nav: [
    { href: "/koncerty/", label: "Koncerty" },
    { href: "/hudba/", label: "Hudba" },
    { href: "/o-kaczi/", label: "O Kaczi" },
    { href: "/pro-poradatele/", label: "Pro pořadatele" },
    { href: "/obchod/", label: "Obchod" },
    { href: "/kontakt/", label: "Kontakt" },
  ],
};

export const MEDIA = [
  { quote: "Zahrála na vrcholu Lysé hory, s harmonikou, kytarou i vlastními texty.", source: "Český rozhlas Ostrava" },
  { quote: "Písničkářka, která střídá šanson s rockem, aniž by ztratila hlas.", source: "Rock&Pop Magazín" },
  { quote: "Album Kněhyně je její nejautentičtější poloha.", source: "Musicserver.cz" },
];

export const MILNIKY = [
  { year: "2012", text: "Vítězka soutěže Czechtalent" },
  { year: "2018", text: "Finalistka ceny Jantar, koncerty v Německu" },
  { year: "2019", text: "EP Polonahá, turné v Japonsku a na Ukrajině" },
  { year: "2021", text: "Debutové album Nahá, nominace na cenu Anděl" },
  { year: "2022", text: "Vánoční klip se sbory a orchestrem Českého rozhlasu" },
  { year: "2024", text: "Druhé studiové album Kněhyně" },
  { year: "2025", text: "Jarní turné po Česku, Edinburgh, Madeira, USA" },
];

/** Reálná videa z jejího YouTube kanálu, nejnovější napřed. */
export const VIDEOS = [
  { id: "KdBxxJwj_oQ", title: "Chtěla bych být", note: "oficiální videoklip" },
  { id: "NT1uv8wLyHM", title: "Kněhyně", note: "oficiální videoklip" },
  { id: "hwA8BLGWX60", title: "Hraj", note: "oficiální video" },
  { id: "FgjRLpnYuBs", title: "Domov", note: "oficiální videoklip" },
  { id: "uJeLdmzreJk", title: "Lampy", note: "oficiální videoklip" },
  { id: "_cEwcyQyDIc", title: "Chladná voda", note: "oficiální videoklip" },
];

export const PRESS_KIT = [
  { item: "Tiskové fotografie v tiskovém rozlišení", meta: "ZIP · 24 MB" },
  { item: "Logo, vektor i křivky", meta: "SVG · EPS" },
  { item: "Technický rider a stage plan", meta: "PDF" },
  { item: "Playlist 2026", meta: "PDF" },
  { item: "Bio ve třech délkách", meta: "300 / 900 / 2000 zn." },
  { item: "Podklady na plakát a sociální sítě", meta: "A3 · 1:1 · 9:16" },
];
