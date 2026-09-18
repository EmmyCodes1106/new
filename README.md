# Estate E-Tag System

A resident/security/admin portal for managing estate vehicle access: resident
profiles, vehicle registration, E-Tag applications, and gate verification.

This is a **frontend prototype** served by a small Express static server.
There is no real database or authentication yet — see [Known limitations](#known-limitations).

## Project structure

```
estate-etag-system/
├── server.js                    Express server (static files + named routes)
├── package.json
└── public/
    ├── index.html                Landing page
    ├── login.html                Sign in
    ├── register.html             Create an account
    ├── dashboard.html            Role-based hub (resident / security / admin)
    ├── profile.html              Resident profile, vehicles, E-Tag status
    ├── vehicle-registration.html Add a vehicle
    ├── etag-application.html     Apply for an E-Tag
    ├── scan.html                 Gate verification (scan / manual lookup)
    └── assets/
        ├── css/
        │   ├── shared.css          Design tokens, sidebar, form/button primitives
        │   ├── auth.css            Login/register-specific styling
        │   ├── index.css           Landing page hero
        │   ├── dashboard.css
        │   ├── profile.css
        │   ├── vehicle-registration.css
        │   ├── etag-application.css
        │   └── scan.css
        └── js/
            ├── session.js          Shared "who's signed in" helper
            ├── login.js
            ├── register.js
            ├── dashboard.js
            ├── profile.js
            ├── vehicle-registration.js
            ├── etag-application.js
            └── scan.js
```

Every page loads `shared.css` first, then its own page-specific stylesheet —
so common styles (colors, sidebar, inputs, buttons) live in one place instead
of being duplicated per page.

## Getting started

```bash
npm install
npm start
```

Then open `http://localhost:3000`.

## How sign-in works right now

`login.html` lets you pick a role (Resident / Security Personnel / Estate
Administrator) and stores a small session object in the browser's
`localStorage` via `assets/js/session.js`. Every protected page calls
`requireSession()` on load, which redirects back to `login.html` if nobody
is signed in, and renders the current user's name/role in the topbar.

This is intentionally the only place that would need to change to wire up
a real backend — swap `setSession()` / `getSession()` in `session.js` for
real API calls (e.g. a `/api/login` endpoint that sets an HTTP-only cookie),
and the rest of the pages don't need to change.

## Known limitations (by design, for now)

- **No real backend.** Vehicle registration, E-Tag applications, and gate
  scans are all simulated in the browser — nothing is persisted server-side.
- **No password checking.** Any email/password combination signs you in.
- **No role-based route protection.** Any signed-in session can open any
  page by URL (e.g. a resident could open `scan.html`). The dashboard only
  *shows* the tools relevant to the chosen role.
- **Demo data.** The resident profile, vehicles, and E-Tag status on
  `profile.html` are fixed sample data, not tied to the signed-in session.

These are natural next steps once a real API/database is introduced.
