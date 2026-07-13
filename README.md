# Remotion + Codex Demo

Eine kleine, vollständig deterministische Remotion-Komposition mit React und TypeScript.

## Voraussetzungen

- Node.js 20 oder neuer
- npm

## Installation

```bash
npm install
```

## Remotion Studio starten

```bash
npm run dev
```

## Demo rendern

```bash
npm run render
```

Die zehnsekündige Komposition wird mit 30 FPS als VP9-Video im WebM-Container nach `out/demo.webm` gerendert.

Neue Kompositionen werden in `src/Root.tsx` mit einer weiteren `Composition` registriert. Verwende für deren `fps` ebenfalls die zentrale Konstante `VIDEO_FPS` aus `src/config/video.ts`.

## Lower Third

Die wiederverwendbare Komponente `src/components/LowerThird.tsx` erhält `name` und `description` als Props. Sie nutzt die Epikur-Farben sowie die Font-Stacks `Ainslie Sans` und `Open Sans`. Da keine Fontdateien mitgeliefert werden und keine Netzwerkabhängigkeit besteht, fallen Systeme ohne Corporate Fonts auf `Trebuchet MS` beziehungsweise `Arial` und anschließend auf generische Sans-Serif-Schriften zurück.

## Weitere Befehle

- `npm run render:demo` – rendert ebenfalls die Demo
- `npm run check` – führt die TypeScript-Prüfung aus
- `npm run lint` – prüft ESLint und TypeScript
- `npm run build` – erzeugt ein Remotion-Bundle
