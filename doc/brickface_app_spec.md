# 🧱 BrickFace.exe — Personal Portrait Generator (Single-Window App)

**Goal:** Let visitors answer **three predefined questions** and instantly get a **brick/LEGO‑style pixel portrait** they can **preview and download**. One window. Simple, fast, memorable — a “take‑home” artifact that proves API and UX skills.

---

## 1) UX/Flow (single window)
- **App icon:** `BrickFace.exe` (16/32px pixel icon). Lives on desktop.
- **Open → One window** titled **“BrickFace.exe — Portrait”** (XP‑hybrid styling per `design-system.md`).
- **Top section:** three **fixed** question → answer inputs (stacked), then **Generate** button.
- **Bottom section:** **Preview area** (empty placeholder until generated). After generation: **image + Download PNG** button + **Regenerate**.
- **Mobile:** same single‑window layout; inputs on top, preview below; buttons full‑width.

**Three questions (fixed for v1):**
1) **Vibe** *(select one)* → `Professional / Playful / Minimal / Experimental`
2) **Primary color** *(select one)* → `Blue / Teal / Red / Yellow / Purple / Green`
3) **Tool identity** *(select one)* → `Notion / Zapier / iOS Shortcuts / Excel / API / Other`

---

## 2) Data & Prompting
**Input → Prompt Template (to Image API):**
```
STYLE: retro pixel-art portrait in brick/LEGO-inspired minifigure style, head & shoulders, neutral background.
VIBE: {{vibe}}  (affects expression + accessory choices)
COLOR ACCENT: {{primary_color}} (background + shirt accent)
TOOL IDENTITY: {{tool_identity}} (subtle emblem on shirt or pin; no logos if unavailable)
DETAIL: clean lines, no text, centered composition, 512x512, high contrast, soft dithering.
AVOID: real brand logos, watermarks, photo-realism.
```
- Model: OpenAI Images (DALL·E 3) or equivalent.
- Size: `512x512`.

---

## 3) API & Backend
**Route:** `POST /api/brickface/generate`
- Body: `{ "vibe": "...", "primary_color": "...", "tool_identity": "..." }`
- Auth: server‑side only (`OPENAI_API_KEY`).
- Response: `{ "url": "/portraits/2025-10-03-123456-9981.png" }`

---

## 4) UI Constraints
- Retro XP styling from `design-system.md`.
- Draggable, minimizable, closeable window.
- Buttons: `Generate`, `Download`, `Regenerate`.

---

## 5) Analytics
- `brickface_open`, `brickface_generate`, `brickface_download`

---

## 6) Acceptance Criteria
- One window with dropdowns → Generate → Preview → Download.
- Image saved to `/public/portraits/`.
- Responsive + accessible.

---

## 7) Build Tasks
1. Scaffold UI window.
2. Implement backend route + OpenAI call.
3. Wire UI → API call.
4. Add preview + download.
5. Analytics + error handling.

---

## 8) Claude Prompt
> Build a new desktop app called `BrickFace.exe`. Single window. Three dropdowns (vibe, color, tool). On Generate, call OpenAI Images API with provided template. Save result to `/public/portraits/` and display preview. Add Download and Regenerate. Respect `design-system.md`. No client-side API key exposure.
