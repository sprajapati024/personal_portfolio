# Design System

## Design System Rule

A dedicated file `design-system.md` defines all UI tokens and rules. Any UI or styling changes must reference this design system first. Claude cannot apply arbitrary colors, fonts, or spacing.

---

## User Journey

1. **Login splash** (skippable, 1.5s)
2. **Boot sequence** (fake load, skip)
3. **Desktop** (icons, taskbar, wallpaper)
4. **Icons**: Projects, Impact, Now, About, Contact, Changelog
5. **Windows**: draggable, resizable, minimized to taskbar
6. **Mobile**: skip boot/login → Start menu + full-screen sheets

---

## Projects Explorer

**Columns**: Title, Tools, Impact, Year

**Sort**: Impact desc, Year desc

**Filter**: tool

**Search**: title+impact

---

## Project Detail

**Tabs**:
- **Overview**: problem/solution/outcome
- **Tools**: badges+tooltips
- **Impact**: 2–3 metrics
- **Flow**: Mermaid TD w/ PNG fallback
- **Media**: images/GIFs

---

## Impact Window

**KPI Tiles**: hours/week, % error, # automations

**Top 3 Wins**: project + headline metric

---

## Now Window

**Cards**: Focus, Experiment, Next (from site.json)

---

## About Window

- **Tagline**
- **Stack icons**
- **Values**: 3 words
- **Buttons**: Resume + LinkedIn

---

## Contact Window

- **Email** + **LinkedIn** (+Calendly optional)
- **Subtext**: "Prefer async. Share context."

---

## Changelog

**Format**: Date + ≤80 char note per entry

---

## Data Model

Defined in `/data/projects.json` + `site.json` (see schema).

- Validated via **zod**
- Mermaid flows stored inline as code

---

## Tech Stack

- **Next.js** static export
- **98.css/custom XP CSS**
- **Mermaid.js**
- **Vercel** deploy
- **Plausible** analytics

---

## Performance & Accessibility

- **LCP** <1.2s
- Lazy-load
- Reduced-motion
- Semantic HTML
- ARIA
- Full keyboard nav

---

## Analytics Events

- `desktop_icon_click`
- `project_open(slug)`
- `tab_viewed(slug,tab)`
- `contact_click(channel)`
- `resume_click`

---

*Last Updated: 2025-10-02*
