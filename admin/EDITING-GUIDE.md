# Website bearbeiten – Kurzanleitung / Editing guide

Du bearbeitest die Website unter **/admin/** (mit deinem Netlify-Login).
Alle Änderungen werden automatisch gespeichert und erscheinen nach 1–2
Minuten live – ganz ohne Entwickler.

You edit the site at **/admin/** (with your Netlify login). Every change is
saved automatically and goes live after 1–2 minutes – no developer needed.

---

## 🇩🇪 Das Wichtigste

- **Zwei Sprachen:** Links gibt es „🇩🇪 Deutsch" und „🇬🇧 English". Beide werden
  getrennt bearbeitet. Ändere einen Text in beiden, wenn er in beiden Sprachen
  stimmen soll.
- **Nichts ist Pflicht.** Du kannst jedes Feld leeren und speichern. Ein leeres
  Feld verschwindet einfach von der Seite.
- **Listen (z.B. Absätze, Karten, Preise, Bewertungen, Galerie):**
  - **Hinzufügen:** unten auf **„Add …"** klicken.
  - **Entfernen:** beim Eintrag auf das **Papierkorb-/×-Symbol** klicken.
  - **Verschieben:** Einträge per **Ziehen (Drag)** neu anordnen.
- **Inhalts-Bausteine** (Beratung, Supervision, Über mich, Preise, AGB,
  Datenschutz, Nutzung): Du kannst frei **Überschrift, Absatz, Zitat,
  Aufzählung, Button, Bild** oder **Abstand** hinzufügen, löschen und sortieren.
- **Preise ändern:** Seite „Preise" → „Preiskarten" → Feld **„Betrag"**
  (nur die Zahl, z.B. `120`).
- **Speichern:** Oben auf **„Publish" / „Veröffentlichen"** klicken.

## 🇬🇧 In short

- **Two languages** are edited separately (DE / EN).
- **Nothing is required** – clear any field and save; empty fields disappear.
- **Lists** (paragraphs, cards, prices, testimonials, gallery): use **Add** to
  add, the **trash/×** icon to remove, and **drag** to reorder.
- **Content blocks** let you add/remove/reorder headings, paragraphs, quotes,
  bullet lists, buttons, images and spacers freely.
- **Change a price:** Pricing page → Price cards → **Amount** field (number only).
- Click **Publish** to go live.

---

### Für Entwickler / For developers

Inhalte liegen in `content-de.json` / `content-en.json`. Einfache Felder werden
über `data-i18n` eingesetzt; wiederholbare Inhalte rendert `main.js` aus Arrays:

- `data-list="KEY"` – wiederholt das enthaltene `<template>` pro Array-Eintrag
  (Felder via `data-field` / `data-field-html` / `data-href-field` / `data-src-field`).
- `data-blocks="KEY"` – typisierte Liste (heading, subheading, text, quote,
  bullets, button, image, spacer).

Statische Kinder mit `data-default` dienen als Fallback und werden nur ersetzt,
wenn die CMS-Liste tatsächlich Inhalte hat. Neue bearbeitbare Felder: Feld in
`admin/config.yml` ergänzen und passendes `data-…`-Markup im HTML setzen.
