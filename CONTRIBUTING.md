# Contributing to Conch

Thanks for taking the time. Conch is intentionally minimal — contributions that preserve that minimalism are the ones most likely to be merged.

---

## Before You Start

### Understand the product boundary

Conch has a hard product definition. Some things will never be added regardless of implementation quality:

| Not in scope | Reason |
|---|---|
| Cloud sync or any server-side storage | Violates the zero-storage promise |
| Share / export features | Contradicts the ephemeral nature |
| User accounts or any identity layer | Anonymous by design |
| AI analysis or emotional tagging | Turns expression into data |
| Social or community features | Adds social pressure Conch is designed to remove |

If your idea falls into the table above, it's not a fit for this project — but you're welcome to fork.

### Check for an existing issue first

Search [open issues](../../issues) before filing a new one or starting work. Duplicate reports and PRs slow everyone down.

---

## Ways to Contribute

### Reporting a bug

Open an issue with:

1. **What happened** — a clear description of the problem
2. **Steps to reproduce** — the exact sequence that triggers it
3. **Expected behavior** — what should have happened
4. **Environment** — browser name + version, OS, screen size if relevant
5. **Console output** — paste any errors from DevTools (`F12 → Console`)

A minimal reproduction is more valuable than a long description.

### Suggesting an improvement

Open an issue tagged `enhancement`. Explain:

- What problem the change solves for the user
- Why it fits within Conch's product principles (see above)
- Any tradeoffs or alternatives you considered

Feature requests without a clear user problem are unlikely to move forward.

### Submitting a pull request

1. **Fork** the repository and create a branch from `main`

   ```bash
   git checkout -b fix/particle-cull-off-screen
   ```

2. **Make your changes** (see [Development setup](#development-setup) below)

3. **Test manually** in at least two browsers (Chrome and Firefox cover most cases)

4. **Keep scope tight** — one logical change per PR. Mixed concerns make review harder and slow merge.

5. **Open the PR** with a description that explains:
   - *What* changed
   - *Why* it's better
   - Any *tradeoffs* introduced

---

## Development Setup

No build step. No package manager. Open the project directly in a browser that supports ES Modules (all modern browsers do).

```bash
git clone https://github.com/your-username/conch.git
cd conch
```

Then serve locally — ES Modules require a server (they won't load over `file://`):

```bash
# Python (usually pre-installed)
python3 -m http.server 8080

# Node (if you have it)
npx serve .

# VS Code: use the Live Server extension
```

Open `http://localhost:8080` in your browser.

---

## Project Structure

```
conch/
├── index.html              Markup, semantic HTML, ARIA labels
├── css/
│   └── style.css           Design tokens, layout, all styles
└── js/
    ├── main.js             Entry point — DOM wiring, release flow
    ├── particles.js        Unified RAF loop, Particle + Mote classes
    └── storage-guard.js    Zero-storage guarantee
```

Each JS file is a self-contained ES Module with a single clear responsibility. Keep it that way.

---

## Code Style

Conch has no linter config — just follow the conventions already in the file you're editing.

**General principles:**

- Prefer clarity over cleverness
- Comments should explain *why*, not *what*
- Keep the zero-dependency constraint — no `npm install`
- All spacing in CSS must use multiples of `var(--u)` (8px base unit)
- New colour values should be verified for contrast ratio against `#f0ece6` before use

**Particle system specifically:**

- Do not add `setTimeout` for stagger logic — use the `birthDelay` frame counter on `Particle` instances. This is deliberate; see the race-condition note in `particles.js`.
- Do not add a second `requestAnimationFrame` loop. There is one loop; it owns the canvas.

---

## Commit Messages

Use the imperative mood and keep the subject line under 72 characters:

```
fix: cull particles below textarea bottom edge
feat: add reduced-motion media query support
docs: clarify birthDelay in particles.js
style: align CSS token comments
```

Prefix options: `fix`, `feat`, `docs`, `style`, `refactor`, `perf`, `chore`.

---

## Privacy & the Zero-Storage Guarantee

This is the non-negotiable core of Conch. Any contribution that introduces — even accidentally — a path for user-typed content to leave the browser will be rejected. This includes:

- Any new `fetch` or `XMLHttpRequest` call
- `localStorage`, `sessionStorage`, `IndexedDB`, or `CookieStore` writes
- `navigator.sendBeacon`
- Service Worker caches that store request bodies

If you're unsure whether your change has side effects here, open a discussion issue before building it.

---

## Licensing

By submitting a pull request you agree that your contribution will be licensed under the project's [MIT License](LICENSE).
