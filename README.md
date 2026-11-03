# Google Cloud Learn with Community Campaign Tracker — GDGoC CIT

Official Progress, Milestone, and Leaderboard Tracker for **Google Cloud Learn with Community Campaign** at **Chennai Institute of Technology** (GDG on Campus CIT).

---

## 🚀 Features

- **Public Profile Progress Checker**: Parses public Google Cloud Skills Boost profiles (`cloudskillsboost.google/public_profiles/...`), extracts earned badges, and evaluates completion against the official curriculum.
- **Official 10 Curriculum Badges**: Matches the official curriculum with course links, credit costs (free 0-credit badges highlighted), and completion dates.
- **Milestone 1 & 2 Rewards**:
  - **Milestone 1** (5 badges): Google Water Bottle.
  - **Milestone 2** (10 badges): T-Shirt + Goodies Box.
  - Interactive confetti fireworks when milestones are achieved!
- **Campus Leaderboard**: Real-time ranking of enrolled learners at Chennai Institute of Technology.
- **Remember Me / Quick Bookmark**: Saves profile links to `localStorage` so returning students don't need to paste their link every time.
- **Shareable Achievement Pass**: Students can generate their official achievement pass and copy ready-to-post copy for LinkedIn and WhatsApp.
- **Facilitator Admin Dashboard**:
  - Chapter metrics & milestone completion counts.
  - One-click CSV roster download for Hack2skill / Google reporting.
- **About Modal**: Step-by-step instructions on making profiles public, referral code (`GDGC-CIT`), and WhatsApp community links.

---

## 🛠️ Tech Stack

- **Frontend**: React 19, Vite, Tailwind CSS, Lucide React, Canvas-Confetti.
- **Backend**: Node.js, Express.js, Cheerio.
- **Storage**: In-memory store with JSON backup (`server/participants.json`).

---

## 💻 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Development Mode
Run both frontend and backend concurrently:
```bash
npm run dev
```
- Frontend runs on `http://localhost:5173`
- Backend runs on `http://localhost:5000`

### 3. Production Build & Run
```bash
npm run build
npm start
```
The full application will be served on `http://localhost:5000`.

---

## ⚙️ Customization

All chapter branding, referral codes, and contact links can be customized in:
`src/config/campaign.js`
