# 📄 Windows XP-Hybrid Portfolio Website — BRD (Business Requirements Document)

## Overview
This BRD defines the Windows XP-Hybrid themed personal portfolio website for Shirin.  
It combines retro Windows UI elements with XP-style polish (gradients, icons, shadows).  
The site will showcase automation projects with clear impact metrics, flows, and a desktop metaphor.

## Design System Rule
A dedicated file `design-system.md` defines all UI tokens and rules.  
Any UI or styling changes must reference this design system first.  
Claude cannot apply arbitrary colors, fonts, or spacing.  
All UI work is governed by this design system.

## User Journey
1. Login splash → auto advance 1.5s (skippable)  
2. Boot sequence (2–3 lines + progress bar) → skippable  
3. Desktop with wallpaper, taskbar, icons  
4. Icons: Projects, Impact, Now, About, Contact, Changelog  
5. Windows: draggable, resizable, minimizable  
6. Mobile: skip login/boot → Start menu → full-screen sheets  

## Core Windows

### Projects Explorer
- Columns: Title | Tools | Impact | Year  
- Sorting: Impact desc, Year desc  
- Filters: by tool  
- Search: title + impact text  

### Project Detail
- Tabs: Overview (problem/solution/outcome), Tools (badges+tooltips), Impact (2–3 metrics), Flow (Mermaid TD, PNG fallback), Media (screenshots/GIFs)  

### Impact Window
- KPI Tiles: total hours saved/week, % error reduction, # automations live  
- Top 3 Wins list  

### Now Window
- Cards: Focus, Experiment, Next (from site.json)  

### About Window
- Tagline, stack icons row, 3 values, Resume + LinkedIn buttons  

### Contact Window
- Buttons: Email, LinkedIn, (optional) Calendly  
- Subtext: "Prefer async. Share context."  

### Changelog Window
- Plain list: date + note (≤80 chars)  

## Data Model
All project data lives in `/data/projects.json` and `/data/site.json`.  
Validated with zod schema. Mermaid flows stored inline as text. PNG fallback required.

## Tech Stack
- Framework: Next.js (static export)  
- Styling: 98.css or custom XP-hybrid CSS  
- Diagrams: Mermaid.js (inline)  
- Hosting: Vercel/Netlify  
- Analytics: Plausible or custom minimal events  

## Performance & Accessibility
- LCP <1.2s  
- Lazy-load images  
- Reduced-motion supported  
- Semantic HTML with ARIA  
- Keyboard complete  
- Lighthouse ≥90 across categories  

## Analytics
- desktop_icon_click  
- project_open(slug)  
- tab_viewed(slug,tab)  
- contact_click(channel)  
- resume_click  

---

# Appendix: Step-by-Step Build Playbook

The build is divided into 9 phases, each with dependencies, tasks, and acceptance criteria.  
Claude must implement sequentially and not skip ahead.

### Phase 0 — Repo & Shell
- Scaffold Next.js project  
- Add globals.css, import 98.css  
- Configure ESLint/Prettier  

### Phase 1 — Login & Boot
- Login splash tile, boot screen  
- Desktop shell, window manager (draggable/resizable)  

### Phase 2 — Data Model & Loader
- Define zod schemas  
- Load projects.json/site.json  
- Seed with sample projects  

### Phase 3 — Projects Explorer
- Explorer table: Title, Tools, Impact, Year  
- Sorting, filtering, search  

### Phase 4 — Project Detail
- Tabs: Overview, Tools, Impact, Flow (Mermaid + fallback), Media  

### Phase 5 — Secondary Windows
- Implement Impact, Now, About, Contact, Changelog windows  

### Phase 6 — Navigation/Keyboard/Mobile
- Start menu  
- Keyboard shortcuts  
- Mobile sheet layout  

### Phase 7 — Performance/A11y/Analytics
- Optimize performance, accessibility  
- Fire analytics events  

### Phase 8 — Deploy
- Static export, deploy to Vercel/Netlify  
- Configure domain + HTTPS  
