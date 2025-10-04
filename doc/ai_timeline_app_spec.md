# 🗂️ AI‑Timeline.exe — Interactive Career Timeline

**Goal:** A retro XP-style timeline app to showcase Shirin’s journey (2015→today). Arrows move through events; AI narrates and answers Qs.

---

## 1) UX/Flow
- Desktop icon: `AI‑Timeline.exe`.
- Opens a draggable window with horizontal timeline.
- Event card shows: year/date, title, description, image.
- Controls: ◀ ▶ arrows, dots for quick jump, “Narrate” + “Ask” buttons.

---

## 2) Data
File: `/data/timeline.json`  
Each event: `{ id, date, title, location, description, media, tags }`

---

## 3) AI Features
- **Narrate:** AI expands event into 1–2 sentence story.  
- **Ask:** User enters free-text Q → AI finds matching event, answers, and jumps there.  
- **Summarize:** optional; AI outputs 5-bullet “career arc.”

---

## 4) API & Backend
- `POST /api/timeline/narrate` → `{ event }` → `{ text }`  
- `POST /api/timeline/query` → `{ question }` → `{ text, jump_to_id }`  
- Uses `OPENAI_API_KEY` server-side.  
- Optional: AI generates retro pixel-art for events without media.

---

## 5) UI Constraints
- Retro XP-hybrid styling from `design-system.md`.
- Dots = event positions; clickable.
- Narration/Ask buttons aligned bottom-right.

---

## 6) Analytics
- `timeline_open`, `timeline_jump`, `timeline_narrate`, `timeline_query`

---

## 7) Acceptance Criteria
- Events render in order, arrows/dots navigate correctly.
- Narrate returns valid AI output in <2s.
- Ask maps to correct event if possible.
- Mobile swipe works.

---

## 8) Build Tasks
1. Scaffold Timeline window + arrows/dots nav.  
2. Load `/data/timeline.json`.  
3. Implement narrate + query endpoints.  
4. Wire UI → backend.  
5. Add mobile + a11y polish.  
6. Analytics.

---

## 9) Claude Prompt
> Build a new app `AI‑Timeline.exe`. Horizontal timeline from `/data/timeline.json`. Use XP-hybrid styling. Add arrows/dots nav. Implement backend: narrate (AI expands event), query (AI answers + jumps). Wire buttons. Ensure mobile + keyboard support. No client-side key exposure.
