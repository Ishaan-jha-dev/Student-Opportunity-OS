# 🌟 Student Opportunity OS

**A hyper-fast, beautifully designed, on-demand search engine for Internships and Competitions.**

Student Opportunity OS is designed to remove the friction from finding your next big career move. It strips away complex logins and bloated dashboards, offering a pure, unadulterated search experience. Built with a high-energy **Neo-Brutalist aesthetic**, the platform doesn't rely on stale database records; instead, it dynamically scrapes live opportunities directly from top platforms the moment you hit search.

---

## 🚀 Key Features

- **No-Login Required**: A pure, frictionless search platform. Just land on the page and start hunting.
- **Live On-Demand Scraping**: Opportunities are not stored in a local database. The platform dynamically fetches live data:
  - **Internships**: Scraped in real-time from LinkedIn using the `linkedin-jobs-api`.
  - **Competitions**: Fetched live directly from the Unstop public API.
- **Neo-Brutalist Aesthetic**: Built with a striking, high-contrast vivid yellow (`#FFEB3B`) theme, featuring thick dark borders, stark solid drop-shadows, and bright pop colors (`#FF0080`, `#1890FF`, `#8338EC`).
- **Lottie Loading Animations**: Integrates smooth, high-quality Lottie animations for seamless initial page loads and data-fetching states.
- **Instant Redirection**: Bypasses unnecessary detail pages. Clicking "VIEW" takes the user directly to the source application link.

---

## 🏗️ Architecture & Tech Stack

This project is built using modern, highly performant web technologies:

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router) for robust server-side rendering and routing.
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) mapped to a custom Neo-Brutalist design system.
- **Animations**: 
  - [Framer Motion](https://www.framer.com/motion/) for buttery-smooth page transitions, hover states, and micro-interactions.
  - `@lottiefiles/dotlottie-react` for rendering lightweight `.lottie` loading animations.
- **Data Fetching (Server Actions)**:
  - Custom API endpoints (`/api/linkedin-jobs` & `/api/unstop-competitions`) are consumed directly via Next.js Server Actions.
  - This ensures API keys and fetching logic remain securely on the server and do not block the client.
- **Icons**: `lucide-react` for crisp, scalable vector icons.

### System Flow
1. **Initial Load**: User hits `/dashboard` and is greeted with the category selection and universal search. A global Lottie animation covers the transition.
2. **Intent Trigger**: User types a keyword or selects a domain (e.g., "Internships" -> "Tech").
3. **Server Action**: The client fires an asynchronous request to `fetchOpportunities` in `src/actions/opportunity.actions.ts`.
4. **Live Scraping**: 
   - If "Internship" is selected, the server queries the `linkedin-jobs-api` filtering by the past month in India.
   - If "Competition" is selected, the server fires a request to Unstop's public search API.
5. **Data Transformation**: The unstructured scraped data is mapped to a unified `Opportunity` type.
6. **Client Render**: The UI updates to display the vivid Opportunity Cards, removing the Lottie loading state.

---

## 🛠️ Local Development Setup

To run this project locally, follow these steps:

### 1. Clone the repository
```bash
git clone https://github.com/Ishaan-jha-dev/Student-Opportunity-OS.git
cd "Student opportunity os"
```

### 2. Install dependencies
```bash
npm install
```

### 3. Run the development server
```bash
npm run dev
```

### 4. Open the application
Open your browser and navigate to [http://localhost:3000](http://localhost:3000).

---

## 📂 Folder Structure

```text
├── public/                 # Static assets (including loading.lottie)
├── src/
│   ├── actions/            # Next.js Server Actions for secure data fetching
│   ├── app/                # Next.js App Router pages (layout, loading, dashboard)
│   │   ├── api/            # API Routes for LinkedIn and Unstop scraping
│   ├── components/         # Reusable React components (Navbar, OpportunityCard)
│   ├── data/               # Mock data fallbacks
│   ├── services/           # Core business logic and scraping orchestrators
│   ├── types/              # TypeScript interfaces (Opportunity, etc.)
└── globals.css             # Tailwind imports and root CSS variables
```

---

*Designed and developed by [Ishaan Jha](https://github.com/Ishaan-jha-dev).*
