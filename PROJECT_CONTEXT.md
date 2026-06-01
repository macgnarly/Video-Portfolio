# PROJECT_CONTEXT.md

Persistent reference for anyone (human or AI) working on this codebase. Read this before making changes — several conventions here are non-obvious and easy to get wrong.

---

## 1. Project Overview

**What it is:** The personal portfolio website for **Aaron MacCarley**, a Milwaukee-based filmmaker and photographer (online handle: `macgnarley`).

**Purpose:** Showcase his film work (documentary, music video, dance film, commercial, performance) and photography projects in a single, design-forward presentation. It is a marketing/portfolio site, not an app — there is no backend, no forms, no user accounts.

**Audience:** Prospective clients, festival programmers, collaborators, and press. The tone is minimal, dark, and cinematic.

**Live site:** Served at **macgnarly.com** (see [`CNAME`](CNAME)) via **GitHub Pages** straight from the repository root.

---

## 2. Tech Stack

This is a **static, zero-build, zero-dependency** site. There is no `package.json`, no bundler, no framework, and no compile step.

| Layer | Technology | Notes |
|---|---|---|
| Markup | Hand-written **HTML5** | One file per page in the repo root |
| Styling | **Vanilla CSS** | Single shared file: [`style.css`](style.css) (~22 KB). Per-project gallery pages add a small inline `<style>` block on top. |
| Scripting | **Vanilla JavaScript (ES6)** | No libraries. [`script.js`](script.js) powers the home page; gallery pages have their own inline `<script>`. |
| Fonts | **Google Fonts** | `IBM Plex Mono` (headings/UI/labels) + `Inter` 300/400/500 (body). Loaded via `<link>` in every page `<head>`. |
| Video hosting | **Vimeo** + **YouTube** | Embedded via iframe in a modal. No video files are stored in the repo. |
| Video thumbnails | **vumbnail.com** (Vimeo) / **img.youtube.com** (YouTube) | Generated from the video ID at runtime — no local thumbnail files. |
| Hosting / deploy | **GitHub Pages** | Push to the default branch (`main`) → live. No CI, no build. |
| Custom domain | `macgnarly.com` | Configured in [`CNAME`](CNAME). |

**To run locally:** open any `.html` file in a browser, or serve the folder with any static server (e.g. `python -m http.server 3000`). No install step.

---

## 3. Directory Structure

```
2026-05-10 MacCarley Portfolio Website/
├── index.html              # HOME — film/landing page (hero, selected work, about, contact)
├── photography.html        # Photography index — grid of photo projects, links to per-project pages
│
├── azov.html               # Per-project photo gallery — "Azov International"
├── ukraine.html            # Per-project photo gallery — "Ukraine Evacuation Volunteers"
├── otof.html               # Per-project photo gallery — "One Team One Fight"
├── cats.html               # Per-project photo gallery — "Worldly Cats"
├── dance.html              # Per-project photo gallery — "Dance"
├── portrait-travel.html    # Per-project photo gallery — "Portrait & Travel"
├── photo.html              # LEGACY full-screen single-image viewer (see Gotchas — not in current nav)
│
├── style.css               # Shared global stylesheet for ALL pages
├── script.js               # JS for index.html ONLY (video data, modal, hero animation, cursor)
│
├── CNAME                   # GitHub Pages custom domain → macgnarly.com
│
├── Photo Portfolio 2026/   # ALL photography image assets live here, one folder per project
│   ├── Azov International/          # 11 images
│   ├── Ukraine Evacuation Volunteers/  # 7 images
│   ├── One Team One Fight/          # 4 images
│   ├── Worldly Cats/                # 16 images
│   ├── Dance/                       # 12 images
│   └── Portrait & Travel/           # 16 images (also used by the index.html hero columns)
│
├── 2026-05-10_Magnarly Website Portfolio Links.xlsx   # Source spreadsheet of links (not used by the site)
├── 2026-05-10 MacCarley Portfolio Website.code-workspace
└── .claude/                # Claude Code local settings (settings.local.json)
```

There is no `assets/`, `src/`, or `dist/` directory. Everything is flat in the repo root except photo images, which live under `Photo Portfolio 2026/`.

---

## 4. Media Handling

### Photos

- **Where they go:** `Photo Portfolio 2026/<Project Name>/`. Create a new subfolder per project. (The folder name can contain spaces and `&`.)
- **Formats:** `.jpg` (most) and `.png` are both in use. No format conversion or optimization pipeline exists — images are committed at full resolution (some are 4–6 MB). Prefer pre-exporting to a reasonable web size (the existing "3k JPEG" exports suggest ~3000px long edge) before committing.
- **Naming:** There is **no enforced naming convention** — filenames are whatever came off the camera/export (e.g. `20250423_A7300672-_AZOV_3k JPEG.jpg`, `FCM03187.jpg`, `BEAZY DANCER.png`). Spaces and parentheses appear in real filenames. Keep names as-is when copying in; just make sure you reference them with correct URL encoding (below).
- **How they're referenced:** Hardcoded `<img src="...">` tags. **Paths must be URL-encoded** because of the spaces and `&`:
  - space → `%20`
  - `&` → `%26`
  - Example: `Photo Portfolio 2026/Portrait & Travel/foo.jpg` → `Photo%20Portfolio%202026/Portrait%20%26%20Travel/foo.jpg`
- **No auto-discovery:** Dropping a file into a project folder does **nothing** on its own. Each gallery page contains a hand-written list of `<img>` tags; you must add the tag and update the photo count manually (see §6).

### Videos

- **Not stored in the repo.** All video lives on Vimeo or YouTube.
- Referenced by **platform + video ID** in the data arrays in [`script.js`](script.js). The iframe embed URL and the thumbnail URL are both derived from the ID at runtime — you never paste a full embed URL or a thumbnail file.
  - Vimeo thumbnail: `https://vumbnail.com/<id>.jpg`
  - YouTube thumbnail: `https://img.youtube.com/vi/<id>/maxresdefault.jpg`

---

## 5. Page / Component Map

There is no component framework. "Components" here means repeated HTML/CSS patterns. Markup is either static in the `.html` file or generated by a render function in `script.js`.

| Page | File | Key sections / "components" | Where defined |
|---|---|---|---|
| **Home / Film** | [`index.html`](index.html) | Nav + mobile menu; **Hero** (3 auto-scrolling photo columns + name); **Selected Work** grid (`#projects-grid`); **More Work** list (`#overflow-list`); **About**; **Contact**; Footer; **Video modal** | Static shell in `index.html`; work cards + list **rendered by JS** from arrays in `script.js`; modal logic in `script.js` |
| **Photography index** | [`photography.html`](photography.html) | Nav + mobile menu; `.photo-projects-grid` of `.photo-project` cards (one per project); Footer | All **static HTML** (cards are hand-written, not generated); inline `<script>` handles cursor/nav/burger/reveal |
| **Per-project galleries** | [`azov.html`](azov.html), [`ukraine.html`](ukraine.html), [`otof.html`](otof.html), [`cats.html`](cats.html), [`dance.html`](dance.html), [`portrait-travel.html`](portrait-travel.html) | Nav + mobile menu; `#project-bar` (back link / title / count); horizontal-scroll `.gallery-strip` of `<img>`; left/right scroll arrows | Each page is **fully self-contained**: inline `<style>` for gallery layout + inline `<script>` for wheel/drag/keyboard/touch scrolling. They share only `style.css`. |
| **Legacy viewer** | [`photo.html`](photo.html) | Full-screen single-image fader with prev/next click zones; data in a `PROJECTS` object (slugs: `azov`, `ukraine`, `otof`, `cats`) | Self-contained inline `<style>`/`<script>`. **Not linked from the current navigation** — see Gotchas. |

**Shared UI pattern across every page:** the `#nav` bar, `#mobile-menu`, and the custom cursor (`#cursor` + `#cursor-ring`) markup are **copy-pasted into each HTML file**. There is no include/template mechanism — a nav change must be repeated in every file.

---

## 6. How to Add Common Content

### A) Add a new photo to an existing project

1. Copy the image into the matching `Photo Portfolio 2026/<Project>/` folder.
2. Open that project's gallery page (e.g. [`cats.html`](cats.html)). Inside `<div class="gallery-strip">`, add an `<img>` in the desired order:
   ```html
   <img src="Photo%20Portfolio%202026/Worldly%20Cats/NEWFILE.jpg" alt="" loading="lazy" draggable="false">
   ```
   Use `loading="eager"` only for the **first** image; everything else is `loading="lazy"`. Remember to **URL-encode** spaces (`%20`) and `&` (`%26`).
3. Update the photo count in **two** places:
   - The `.proj-count` span in that gallery page (`<span class="proj-count">15 PHOTOS</span>`).
   - The `.photo-project-meta` span for that project's card in [`photography.html`](photography.html).

### B) Add a whole new photo project (a new gallery page)

1. Create `Photo Portfolio 2026/<New Project>/` and add the images.
2. Duplicate an existing gallery page — [`dance.html`](dance.html) is the cleanest current template. Rename it (e.g. `liveshows.html`).
3. In the new file, change: the `<title>`, the `.proj-title` text, the `.proj-count`, and the full `<img>` list inside `.gallery-strip` to point at the new folder (URL-encoded).
4. Add a card to the `.photo-projects-grid` in [`photography.html`](photography.html), copying an existing `<a class="photo-project">` block. Update its `href`, thumbnail `src`, `.photo-project-num` (next sequential number), `.photo-project-title`, and `.photo-project-meta` count. Adjust the `--reveal-delay` (alternates `0s` / `0.1s` per column).

### C) Embed a new video on the home page

1. Get the **Vimeo numeric ID** or **YouTube ID**.
2. In [`script.js`](script.js), add an object to the `FEATURED` array (large cards) or `OVERFLOW` array (the "More Work" text list):
   ```js
   {
     num: '09',                    // sequential, two digits
     title: 'Project Title',
     sub: 'Short subtitle / location',
     category: 'Documentary',      // free text label
     role: 'Director / DP / Editor',  // FEATURED only; OVERFLOW omits role
     platform: 'vimeo',            // 'vimeo' | 'youtube'
     videoId: '1234567890',
     thumb: 'https://vumbnail.com/1234567890.jpg',  // FEATURED only; OVERFLOW has no thumb
   }
   ```
   - Vimeo `thumb`: `https://vumbnail.com/<id>.jpg`
   - YouTube `thumb`: `https://img.youtube.com/vi/<id>/maxresdefault.jpg`
3. That's it — `renderFeatured()` / `renderOverflow()` build the card markup and wire up the modal automatically. The modal embed URL and "WATCH ON" link are derived from `platform` + `videoId`.

### D) Add a new page or section

- **New top-level page:** create a new `.html` file in the repo root, link `style.css`, and copy the nav/mobile-menu/cursor blocks from an existing page. Add a link to it in the nav of every page that should point to it.
- **New section on the home page:** add a `<section id="...">` in [`index.html`](index.html) and a matching nav anchor (`<a href="#yourid">`). Use the existing `.section-header` + `.section-label` pattern and add `class="reveal"` to elements you want to fade in on scroll.

### E) Update navigation

The nav markup is duplicated in **every** HTML file (both the desktop `.nav-links` and the `.mobile-nav-links`). To add/rename/reorder a nav item, edit **all** of: `index.html`, `photography.html`, `azov.html`, `ukraine.html`, `otof.html`, `cats.html`, `dance.html` (and `photo.html` if you still consider it active). Internal home-page links use hash anchors (`index.html#work`); the photo index uses a real file (`photography.html`).

---

## 7. Routing & URL Structure

There is **no router and no server-side logic**. GitHub Pages serves files by path:

- `/` → `index.html`
- `/photography.html` → photo index
- `/azov.html`, `/cats.html`, etc. → per-project galleries
- Home-page sections are **hash anchors** on `index.html`: `#hero`, `#work`, `#about`, `#contact`. Smooth scrolling is enabled via `html { scroll-behavior: smooth; }` in CSS.
- The legacy [`photo.html`](photo.html) reads a **URL hash** of the form `#<slug>` or `#<slug>/<index>` (e.g. `photo.html#azov/3`) to pick a project and starting image. (Again — not used by the current nav.)

To "add a route," you simply add a new `.html` file and link to it.

---

## 8. Environment & Config

- **No environment variables, no `.env`, no secrets.** Everything is public static content.
- **No build step.** Editing a file and pushing to `main` deploys it.
- **Config files that exist:**
  - [`CNAME`](CNAME) — single line, the custom domain (`macgnarly.com`). Do not delete; removing it breaks the custom domain on GitHub Pages.
  - `.claude/settings.local.json` — local Claude Code tool permissions only; irrelevant to the site itself.
- **No `.nojekyll`** is present. Folders/files here don't start with `_`, so Jekyll processing on GitHub Pages doesn't currently strip anything — but be aware GitHub Pages runs Jekyll by default. If you ever add an underscore-prefixed folder, add a `.nojekyll` file to the root.

---

## 9. Style System

- **Global stylesheet:** [`style.css`](style.css), linked by every page. Per-project gallery pages and the legacy viewer add a scoped inline `<style>` for their specific layout only.
- **Design tokens** are CSS custom properties on `:root` (top of `style.css`):
  - Colors: `--black #000`, `--dark #0d0d0d`, `--darker #080808`, `--white #fff`, and a white-opacity scale `--w60 / --w40 / --w25 / --w15 / --w08 / --w05`, plus `--border` (`rgba(255,255,255,0.08)`). **The palette is strictly monochrome — do not introduce color.**
  - Fonts: `--mono` (`'IBM Plex Mono', 'Courier New', monospace`) for headings, labels, nav, counts; `--sans` (`'Inter', system-ui...`) for body copy.
  - Layout: `--nav-h: 56px`, `--pad-x: 48px`, `--sec-py: 140px`.
- **Typography is fluid** — sizes use `clamp(min, vw, max)` throughout, so things scale with viewport. Match this when adding new text.
- **Motion conventions:**
  - `.fade-up` — one-time entrance animation on load; stagger with an inline `style="--d:0.3s"`.
  - `.reveal` → `.reveal.visible` — scroll-triggered fade/slide via IntersectionObserver; stagger with `style="--reveal-delay:0.1s"`. Add `class="reveal"` to any new element you want revealed on scroll (the observer is set up in `script.js` for the home page and inline on the other pages).
  - Easing used everywhere: `cubic-bezier(0.22, 1, 0.36, 1)`.
- **Custom cursor:** the whole site uses `cursor: none` and renders a JS-driven dot (`#cursor`) + lagging ring (`#cursor-ring`). Elements that should trigger the ring's hover-expand are matched by selector lists like `'a, button, .project-card, .work-item, [role="button"]'`. If you add a new clickable element type, add its selector to that list (in `script.js` for the home page, or the inline script on other pages) so the cursor responds.
- **Responsive breakpoints** (in `style.css`): `1100px`, `860px` (desktop nav links hide, mobile burger takes over), and `600px` (the custom cursor is disabled and the native `cursor: auto` is restored; gallery pages switch from horizontal to vertical stacking at `768px` via their inline styles).

---

## 10. Gotchas & Conventions

1. **Gallery image lists are a hand-maintained subset, not the folder.** The `<img>` tags on a gallery page are written by hand and do not auto-sync with the folder. Adding a file to a folder has **no visible effect** until you add the `<img>` tag, and deleting a file leaves a broken reference behind. Always keep the page in sync with the folder, and update the count text in two places (see §6A). All pages are currently in sync, but treat this as the #1 thing to re-verify after any image change.

2. **URL-encode every asset path.** Folder and file names contain spaces, `&`, and parentheses. Use `%20` for spaces and `%26` for `&` (parentheses are safe as-is). An un-encoded `src` will 404 on the live server even if it "works" in some local setups. The trickiest folder is `Portrait & Travel/` → `Photo%20Portfolio%202026/Portrait%20%26%20Travel/`. Always confirm the exact on-disk folder name before encoding — the hero once pointed at a nonexistent `Travel & Street/` folder.

3. **`photo.html` is legacy and not wired into the current site.** The active flow is `photography.html` → per-project pages (`cats.html`, etc.). `photo.html` is an older full-screen viewer with its own separate `PROJECTS` data object. Editing it will **not** change what visitors see. Don't confuse it with the per-project pages when asked to "update a photo gallery."

4. **No shared layout / templating.** Nav, mobile menu, cursor markup, and the gallery CSS/JS are copy-pasted across files. A change to shared chrome must be applied to every file by hand. When duplicating a gallery page, copy the newest one ([`portrait-travel.html`](portrait-travel.html) or [`dance.html`](dance.html)) to inherit the latest markup.

5. **Two sources of truth for one number.** A project's photo count appears both on its card in `photography.html` and in its gallery's `.proj-count`. Keep them in sync.

6. **Hardcoded year.** Footers say `© 2025`. Update intentionally if needed.

7. **Home-page work cards are generated, photo cards are not.** Video cards/list come from the `FEATURED`/`OVERFLOW` arrays in `script.js`; photo project cards are static HTML in `photography.html`. Edit the right layer.

8. **Line endings:** Git on Windows reports `LF will be replaced by CRLF`. This is expected/harmless for this repo.

9. **Deploy = push.** There's no preview build. Pushing to `main` publishes to macgnarly.com immediately, so verify locally first.
