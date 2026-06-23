# SCIENCE PULSE

A polished, responsive bilingual science newsroom built with Angular 21, TypeScript, and SCSS. The demo runs entirely in the browser with persistent local data, so it needs no backend.

## Start locally

Requirements: Node.js 20.19+ or 22.12+ and npm.

```bash
npm install
npm start
```

Open `http://localhost:4200`.

Create a production bundle with:

```bash
npm run build
```

## Demo administrator

- First name: `Nika`
- Last name: `Alaverdashvili`
- Password: `D28ffMMs`

The admin can publish bilingual stories and quizzes, manage creator permissions, view dashboard statistics, and remove comments. Creators can publish; regular users can react, comment, and take quizzes.

## Included

- English and Georgian interface with persistent language selection
- Responsive liquid-glass design, mobile menu, and original cinematic hero artwork
- Latest-five-post hero carousel and six category views
- News search, article details, reactions, and public comments
- Interactive quizzes with progress, scoring, and result messages
- Registration, profile photo preview, login, profile, and route guards
- Admin dashboard, post editor, dynamic quiz builder, and user permissions
- Seeded bilingual stories and quiz content
- LocalStorage persistence for users, content, comments, reactions, and language
- Empty states, validation, and mobile/tablet layouts

## Data reset

The app seeds its demo content on first launch. To return to the original demo state, clear this site’s local storage in your browser and reload.

## Security note

Authentication in this project is deliberately local-only for demonstration. Passwords and roles are visible in browser storage. Before production deployment, replace the local services with a real backend, hash passwords, use secure session/token handling, validate all data server-side, and enforce roles and permissions on the server.

## Project map

```text
src/app/
  core/
    guards/       route access rules
    models/       shared data types
    services/     auth, users, posts, quizzes, language
  pages/          public and studio pages
  shared/         navigation, footer, story and quiz cards
public/assets/    local visual assets
```
