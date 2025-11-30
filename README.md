# Career Compass (কেরিয়ার কম্পাস)

A bilingual (Bengali/English) React application that suggests career paths based on a 15-question psychological assessment.

## Features
- **Psychometric Scoring**: 15 dimensions including Curiosity, Analytical, Social, etc.
- **Privacy First**: All logic runs in the browser. Data stored in `localStorage` only.
- **Sharable Results**: Results encoded in URL hash (Base64) for easy sharing without a database.
- **Visualization**: Radar chart of personality strengths.
- **PWA Ready**: Mobile-first design using Tailwind CSS.

## Getting Started

### Prerequisites
- Node.js (v16+)

### Installation

1. Create a standard React + TypeScript setup (if not using the zip):
   ```bash
   npm create vite@latest career-compass -- --template react-ts
   cd career-compass
   npm install
   ```

2. Install dependencies (Recharts is required for the chart):
   ```bash
   npm install recharts
   npm install -D tailwindcss postcss autoprefixer jest ts-jest @types/jest
   npx tailwindcss init -p
   ```

3. Copy the source files provided into the project structure.

### Running Locally

```bash
npm run dev
```
Open `http://localhost:5173` in your browser.

### Running Tests

```bash
npm test
```

## Deployment

### Static Build (Netlify/Vercel/GitHub Pages)

This app is a static SPA (Single Page Application).

```bash
npm run build
```

This generates a `dist` folder. You can upload this folder directly to Netlify Drop or use the provided script to zip it.

### Generate Zip for Hosting

Run this command in the root to create a deployable archive:

```bash
npm run build
zip -r career-compass-deploy.zip dist
```

## Privacy Note
This application does not collect user data. If you wish to clear your data, click "Retake Quiz" or clear your browser cache.

## Customization
- **Questions**: Edit `constants.ts` to modify text or weights.
- **Scoring Logic**: Edit `services/scoring.ts` to adjust the algorithm.
- **Themes**: Edit `tailwind.config.js` or the script tag in `index.html`.
