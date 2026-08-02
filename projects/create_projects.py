import os

shared_css = """@font-face {
  font-family: 'Gambarino';
  src: url('../assets/fonts/Gambarino-Regular.woff2') format('woff2'),
       url('https://cdn.fontshare.com/wf/ZINX7PW4XMYISLZAZKYY4QHYYHYNPKAV/Z54IGKTR4PBLA5KTYL3IDQZHFQPJJVNZ/6KBHT5NXCZVM6GHTPKGIR6DXZLQAYIFK.woff2') format('woff2');
  font-weight: 400 700;
  font-style: normal;
  font-display: swap;
}
@font-face {
  font-family: 'Libertinus Math';
  src: url('../assets/fonts/LibertinusMath-Regular.otf') format('opentype'),
       url('assets/fonts/LibertinusMath-Regular.otf') format('opentype'),
       url('https://fontlibrary.org/assets/fonts/libertinus-math/669b2b03ec50a970ff13c8f3009bd78c/c567424c45cb2196bbf6697da4bab4b9/LibertinusMathRegular.otf') format('opentype');
  font-weight: 400 700;
  font-style: normal;
  font-display: swap;
}
:root{--font-heading:'Gambarino',Georgia,serif;--font-body:'Libertinus Math','LibertinusMathRegular',Georgia,serif;--bg:#0f0f1a;--bg2:#1a1a2e;--card:#16213e;--card2:#1e2a45;--ink:#ffffff;--ink-s:#b8b8d1;--ink-d:#6a6a8a;--ac:#7c3aed;--ac2:#a855f7;--pink:#ec4899;--grad:linear-gradient(135deg,#7c3aed 0%,#ec4899 100%);--brd:#2d2d44;--shd:0 8px 32px rgba(124,58,237,.18);--r:16px;--mono:var(--font-body);--disp:var(--font-heading);--body:var(--font-body);}
*,*::before,*::after{margin:0;padding:0;box-sizing:border-box;}
html{scroll-behavior:smooth;}
body{background:var(--bg);color:var(--ink);font-family:var(--body);line-height:1.7;overflow-x:hidden;-webkit-font-smoothing:antialiased;}
.glow-bg{position:fixed;inset:0;z-index:-1;pointer-events:none;background:radial-gradient(600px 500px at 5% 5%,rgba(124,58,237,.15),transparent 60%),radial-gradient(400px 300px at 90% 15%,rgba(236,72,153,.10),transparent 60%);}
a{color:inherit;text-decoration:none;}img{max-width:100%;display:block;}
nav{position:sticky;top:0;z-index:100;background:rgba(15,15,26,.88);backdrop-filter:blur(14px);border-bottom:1px solid var(--brd);}
.nav-inner{display:flex;align-items:center;justify-content:space-between;padding:14px 28px;max-width:1200px;margin:0 auto;}
.brand{font-family:var(--disp);font-weight:700;font-size:1rem;display:flex;align-items:center;gap:9px;}
.brand .mark{width:28px;height:28px;border-radius:8px;background:var(--grad);display:flex;align-items:center;justify-content:center;color:#0f0f1a;font-family:var(--mono);font-weight:700;font-size:.75rem;}
.nav-links-row{display:flex;align-items:center;gap:12px;}
.nav-link{font-family:var(--mono);font-size:.75rem;color:var(--ink-s);border:1px solid var(--brd);padding:7px 14px;border-radius:9px;transition:.25s;}
.nav-link:hover{color:var(--ink);border-color:var(--ac);transform:translateY(-1px);}
.nav-link.primary{background:var(--grad);border-color:transparent;color:#fff;}
.project-hero{padding:64px 0 0;}
.hero-inner{max-width:1200px;margin:0 auto;padding:0 28px;}
.crumb{font-family:var(--mono);font-size:.72rem;color:var(--ink-d);display:flex;align-items:center;gap:8px;margin-bottom:24px;}
.crumb a{color:var(--ac2);}
.proj-num-badge{font-family:var(--mono);font-size:.7rem;color:var(--ac2);background:rgba(168,85,247,.12);border:1px solid rgba(168,85,247,.2);padding:4px 12px;border-radius:20px;display:inline-block;margin-bottom:16px;}
.project-hero h1{font-family:var(--disp);font-weight:800;font-size:clamp(2rem,5.5vw,3.6rem);line-height:1.08;margin-bottom:16px;}
.project-hero h1 .grad{background:var(--grad);-webkit-background-clip:text;background-clip:text;color:transparent;}
.subtitle{color:var(--ink-s);font-size:1.1rem;max-width:680px;margin-bottom:32px;}
.hero-actions{display:flex;gap:12px;flex-wrap:wrap;margin-bottom:48px;}
.action-btn{font-family:var(--mono);font-size:.78rem;font-weight:600;padding:12px 22px;border-radius:10px;transition:.25s;display:inline-flex;align-items:center;gap:8px;cursor:pointer;}
.action-btn.primary{background:var(--grad);color:#fff;}
.action-btn.secondary{border:1px solid var(--brd);color:var(--ink);background:transparent;}
.action-btn:hover{transform:translateY(-2px);box-shadow:var(--shd);}
.hero-visual{width:100%;background:linear-gradient(135deg,var(--card) 0%,var(--card2) 100%);border-radius:20px 20px 0 0;border:1px solid var(--brd);border-bottom:none;min-height:320px;display:flex;align-items:center;justify-content:center;position:relative;overflow:hidden;margin-top:40px;}
.hero-visual .big-emoji{font-size:clamp(6rem,15vw,10rem);filter:drop-shadow(0 0 60px rgba(168,85,247,.5));animation:float 4s ease-in-out infinite;position:relative;z-index:1;}
.hero-visual::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse at 50% 50%,rgba(124,58,237,.18),transparent 70%);}
.mock-bar{position:absolute;top:0;left:0;right:0;height:38px;background:var(--bg2);border-bottom:1px solid var(--brd);display:flex;align-items:center;padding:0 16px;gap:8px;}
.mock-dot{width:11px;height:11px;border-radius:50%;}
.mock-dot.r{background:#ff5f57;}.mock-dot.y{background:#febc2e;}.mock-dot.g{background:#28c840;}
@keyframes float{0%,100%{transform:translateY(0);}50%{transform:translateY(-16px);}}
.content-wrap{max-width:1200px;margin:0 auto;padding:0 28px;}
.proj-sections{display:grid;grid-template-columns:1fr 340px;gap:40px;padding:56px 0 80px;align-items:start;}
@media(max-width:900px){.proj-sections{grid-template-columns:1fr;}}
.section{margin-bottom:40px;}
.section-label{font-family:var(--mono);font-size:.7rem;color:var(--ac2);text-transform:uppercase;letter-spacing:.1em;margin-bottom:12px;display:flex;align-items:center;gap:8px;}
.section-label::before{content:"✦";}
.section h2{font-family:var(--disp);font-size:1.4rem;font-weight:700;margin-bottom:16px;}
.section p{color:var(--ink-s);margin-bottom:12px;}
.section ul{list-style:none;display:flex;flex-direction:column;gap:10px;}
.section ul li{color:var(--ink-s);padding:12px 16px;border-radius:10px;background:var(--card);border:1px solid var(--brd);display:flex;align-items:flex-start;gap:10px;font-size:.92rem;}
.section ul li::before{content:"→";color:var(--ac2);flex-shrink:0;}
.sidebar>*{margin-bottom:24px;}
.sidebar-card{background:var(--card);border:1px solid var(--brd);border-radius:var(--r);padding:22px;}
.sidebar-card h4{font-family:var(--mono);font-size:.7rem;color:var(--ink-d);text-transform:uppercase;letter-spacing:.08em;margin-bottom:14px;}
.tag-cloud{display:flex;flex-wrap:wrap;gap:8px;}
.tag{font-family:var(--mono);font-size:.68rem;padding:5px 12px;border-radius:8px;background:rgba(124,58,237,.12);color:var(--ac2);border:1px solid rgba(124,58,237,.2);}
.info-row{display:flex;justify-content:space-between;align-items:center;padding:10px 0;border-bottom:1px solid var(--brd);}
.info-row:last-child{border-bottom:none;}
.info-key{font-family:var(--mono);font-size:.72rem;color:var(--ink-d);}
.info-val{font-size:.85rem;font-weight:600;}
.challenge-card{background:linear-gradient(135deg,rgba(124,58,237,.08),rgba(236,72,153,.05));border:1px solid rgba(168,85,247,.2);border-radius:var(--r);padding:22px;}
.challenge-card .ch-label{font-family:var(--mono);font-size:.7rem;color:var(--ac2);text-transform:uppercase;letter-spacing:.08em;margin-bottom:10px;}
.challenge-card p{color:var(--ink-s);font-size:.9rem;}
.side-actions{display:flex;flex-direction:column;gap:10px;}
.side-btn{font-family:var(--mono);font-size:.78rem;font-weight:600;padding:13px;border-radius:10px;text-align:center;transition:.25s;display:block;}
.side-btn.primary{background:var(--grad);color:#fff;}
.side-btn.secondary{border:1px solid var(--brd);color:var(--ink);}
.side-btn:hover{transform:translateY(-2px);box-shadow:var(--shd);}
.page-nav{border-top:1px solid var(--brd);padding:40px 0;display:flex;justify-content:space-between;align-items:center;gap:20px;flex-wrap:wrap;}
.page-nav a{font-family:var(--mono);font-size:.8rem;color:var(--ink-s);border:1px solid var(--brd);padding:10px 18px;border-radius:10px;transition:.25s;display:flex;align-items:center;gap:8px;}
.page-nav a:hover{border-color:var(--ac);color:var(--ink);transform:translateY(-1px);}
.page-nav .center a{border-color:transparent;background:var(--grad);color:#fff;}
footer{border-top:1px solid var(--brd);padding:32px 0;}
.footer-inner{max-width:1200px;margin:0 auto;padding:0 28px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px;}
.foot-brand{font-family:var(--disp);font-weight:700;}
.foot-fine{font-family:var(--mono);font-size:.72rem;color:var(--ink-d);}"""

template = """<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>TITLE | Abdul Rahman</title>
<link rel="icon" type="image/png" href="../image/logo.png">
<link rel="shortcut icon" type="image/png" href="../image/logo.png">
<link rel="apple-touch-icon" href="../image/logo.png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&family=JetBrains+Mono:wght@400;500;600&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
<style>[SHARED CSS HERE]</style>
</head>
<body>
<div class="glow-bg"></div>
<nav><div class="nav-inner"><div class="brand"><img src="../image/logo.png" alt="AR Logo" style="height:32px;width:auto;border-radius:6px;"></div><div class="nav-links-row"><a href="../index.html" class="nav-link">Home</a><a href="../projects.html" class="nav-link">All Projects</a><a href="#" class="nav-link primary">Live Demo</a></div></div></nav>
<section class="project-hero">
  <div class="hero-inner">
    <div class="crumb"><a href="../index.html">Home</a><span>/</span><a href="../projects.html">Projects</a><span>/</span><span>TITLE</span></div>
    <div class="proj-num-badge">Project PROJECT_NUM / 15</div>
    <h1><span class="grad">HEADING_GRAD</span> HEADING_REST</h1>
    <p class="subtitle">SUBTITLE</p>
    <div class="hero-actions"><a href="#" class="action-btn primary">🚀 Live Demo</a><a href="#" class="action-btn secondary">GitHub</a></div>
    <div class="hero-visual"><div class="mock-bar"><div class="mock-dot r"></div><div class="mock-dot y"></div><div class="mock-dot g"></div></div><span class="big-emoji">EMOJI</span></div>
  </div>
</section>
<div class="content-wrap">
  <div class="proj-sections">
    <div class="main-col">
      <div class="section"><div class="section-label">Overview</div><h2>What is this project?</h2>OVERVIEW_PARAS</div>
      <div class="section"><div class="section-label">Key Features</div><h2>What it can do</h2><ul>FEATURES_LI</ul></div>
      <div class="section"><div class="section-label">My Role</div><h2>What I built</h2><ul>ROLE_LI</ul></div>
    </div>
    <aside class="sidebar">
      <div class="sidebar-card"><h4>Tech Stack</h4><div class="tag-cloud">TAGS_HTML</div></div>
      <div class="sidebar-card"><h4>Project Info</h4><div class="info-row"><span class="info-key">Project</span><span class="info-val">#PROJECT_NUM / 15</span></div><div class="info-row"><span class="info-key">Status</span><span class="info-val" style="color:#4ade80">Completed</span></div><div class="info-row"><span class="info-key">Type</span><span class="info-val">Personal Project</span></div><div class="info-row"><span class="info-key">Year</span><span class="info-val">2025–2026</span></div></div>
      <div class="challenge-card"><div class="ch-label">⚡ Challenges & Learnings</div><p>CHALLENGE_TEXT</p></div>
      <div class="side-actions"><a href="#" class="side-btn primary">🚀 View Live Demo</a><a href="#" class="side-btn secondary">GitHub Repository</a></div>
    </aside>
  </div>
  <nav class="page-nav"><a href="project-PREV_NUM.html">← Project PREV_NUM</a><div class="center"><a href="../projects.html">All Projects</a></div><a href="project-NEXT_NUM.html">Project NEXT_NUM →</a></nav>
</div>
<footer><div class="footer-inner"><div class="foot-brand">Abdul Rahman M</div><div class="foot-fine">© 2026 · built while learning, one commit at a time</div></div></footer>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
<script src="../cinematic-reveal.js"></script>
</body>
</html>"""

projects = [
    {
        "PROJECT_NUM": "02",
        "PREV_NUM": "01",
        "NEXT_NUM": "03",
        "TITLE": "Task Manager / To-Do App",
        "HEADING_GRAD": "Task Manager",
        "HEADING_REST": "/ To-Do App",
        "EMOJI": "📋",
        "SUBTITLE": "A Kanban-style task manager with drag-and-drop, real-time Firebase sync, and user workspaces",
        "TAGS": ["Vue.js", "Vuex", "Firebase Auth", "Firestore", "SCSS"],
        "OVERVIEW": [
            "This Kanban-style task manager was designed to help individuals and small teams organize their workflow visually without the complexity of enterprise tools.",
            "Users create boards, add lists (e.g., To Do, In Progress, Done), and drag tasks seamlessly between columns. The app uses Firebase Firestore for real-time updates — changes made on one device are reflected instantly on all other connected devices.",
            "The project includes full user authentication, so each user has their own private workspace. Dark mode is baked in for late-night productivity sessions."
        ],
        "FEATURES": [
            "Drag-and-drop interface for moving tasks between Kanban columns",
            "Real-time data synchronization across multiple devices via Firebase",
            "Customizable task cards with labels, due dates, priority levels, and descriptions",
            "User authentication and isolated personal workspaces per user",
            "Dark/light mode toggle with preference persisted locally",
            "Keyboard shortcut support (N for new task, Enter to confirm, Esc to cancel)"
        ],
        "ROLE": [
            "Sole developer handling front-end Vue.js architecture and Firebase backend-as-a-service setup",
            "Implemented the drag-and-drop logic using the HTML5 DnD API with touch fallback for mobile",
            "Designed the real-time subscription model using Firestore listeners"
        ],
        "CHALLENGE": "Implementing smooth drag-and-drop on both desktop and mobile touch devices required combining the HTML5 Drag and Drop API with touch event listeners. The trickiest part was reordering items within the same column while maintaining Firestore consistency — I used optimistic UI updates to keep it responsive."
    },
    {
        "PROJECT_NUM": "03",
        "PREV_NUM": "02",
        "NEXT_NUM": "04",
        "TITLE": "Weather Dashboard",
        "HEADING_GRAD": "Weather",
        "HEADING_REST": "Dashboard",
        "EMOJI": "🌤️",
        "SUBTITLE": "Real-time weather for any city with 5-day forecasts, animated charts, and geolocation auto-detect",
        "TAGS": ["JavaScript (ES6+)", "OpenWeather API", "Chart.js", "CSS3", "HTML5 Geolocation"],
        "OVERVIEW": [
            "A sleek, interactive weather dashboard delivering accurate up-to-the-minute weather data for any city worldwide — built for travelers and commuters who need clear visual answers fast.",
            "The app pulls data from the OpenWeather One Call API and presents it cleanly. The UI background and icons change dynamically based on current conditions — sunny days get warm gradients, rainy days get cool blues.",
            "The 5-day forecast is rendered as an animated Chart.js line graph, giving users an at-a-glance view of temperature trends over the coming week."
        ],
        "FEATURES": [
            "City search with keyboard navigation and debounced API calls",
            "Current weather metrics: temperature, humidity, wind speed, UV index, visibility",
            "5-day / 3-hour forecast rendered as an animated Chart.js line graph",
            "HTML5 Geolocation API support for instant local weather detection",
            "Dynamic UI theming based on weather condition (clear, cloudy, rainy, etc.)",
            "Search history stored in localStorage for one-click access to favourites"
        ],
        "ROLE": [
            "Full lifecycle development from API integration to CSS animation work",
            "Implemented data visualization for the forecast charts using Chart.js",
            "Optimized API call frequency using debouncing and localStorage caching"
        ],
        "CHALLENGE": "Handling API rate limits and structuring multiple async requests efficiently taught me a lot. I implemented a debounce function on the search input to reduce unnecessary API calls by ~80%, and added a localStorage cache that stores results for 10 minutes so repeat searches are instant."
    },
    {
        "PROJECT_NUM": "04",
        "PREV_NUM": "03",
        "NEXT_NUM": "05",
        "TITLE": "Personal Blog / CMS",
        "HEADING_GRAD": "Personal Blog",
        "HEADING_REST": "/ CMS",
        "EMOJI": "📝",
        "SUBTITLE": "Full-stack blogging platform with a custom CMS, JWT auth, markdown rendering, and SSR for SEO",
        "TAGS": ["Next.js 14", "Node.js", "MongoDB", "Mongoose", "JWT", "Tailwind CSS"],
        "OVERVIEW": [
            "A bespoke blogging platform built from scratch to give content creators complete ownership of their publishing workflow. It supports markdown authoring and includes a secure admin dashboard that requires zero coding knowledge to use.",
            "The public-facing blog is server-side rendered for optimal SEO — every post gets its own meta tags, OG image, and structured data. The CMS allows authorized users to draft, schedule, edit, publish, and delete posts through a clean admin UI.",
            "The backend exposes a fully documented REST API, making the platform headless and future-proof — you could plug in a React Native app to consume the same content effortlessly."
        ],
        "FEATURES": [
            "Full CRUD for blog posts via a secure REST API",
            "JWT-based authentication and role-based access control (Admin / Viewer)",
            "Markdown parsing with syntax highlighting for code blocks using Prism.js",
            "Server-side rendering with Next.js for superior SEO and Core Web Vitals",
            "Image upload and hosting via Cloudinary integration",
            "Post tagging, category management, and related posts suggestions"
        ],
        "ROLE": [
            "Architected the complete full-stack application from database schema to UI",
            "Implemented the secure JWT authentication and refresh token rotation flow",
            "Designed the markdown-to-HTML pipeline with custom Prism.js rendering"
        ],
        "CHALLENGE": "Designing a flexible MongoDB schema to efficiently handle tags, categories, and relationships between posts required careful planning. I used Mongoose's population feature for related content queries and built aggregation pipelines for tag-based filtering without performance degradation."
    },
    {
        "PROJECT_NUM": "05",
        "PREV_NUM": "04",
        "NEXT_NUM": "06",
        "TITLE": "Real-Time Chat Application",
        "HEADING_GRAD": "Real-Time",
        "HEADING_REST": "Chat Application",
        "EMOJI": "💬",
        "SUBTITLE": "Instant messaging with WebSockets, group chats, presence detection, and persistent message history",
        "TAGS": ["React", "Socket.io", "Express.js", "PostgreSQL", "CSS Modules"],
        "OVERVIEW": [
            "A fast, responsive web-based chat application bringing the feel of modern messaging platforms to the browser. It connects users instantly, allowing seamless communication without page reloads, built entirely on WebSocket technology.",
            "The app relies on Socket.io for bi-directional communication. It handles multiple concurrent users with room-based isolation and features online/offline status indicators, typing notifications, and read receipts.",
            "Message history is persisted in PostgreSQL so users never lose their conversation history when they close the browser. The app scales horizontally using Redis as a Socket.io adapter."
        ],
        "FEATURES": [
            "Real-time bi-directional messaging via Socket.io with automatic reconnection",
            "User presence detection showing who is online, offline, or actively typing",
            "Create and join custom chat rooms alongside direct 1:1 messaging",
            "Persistent message history stored in PostgreSQL, paginated for performance",
            "Emoji reactions on messages and rich-text input support",
            "Fully responsive UI optimized for mobile messaging workflows"
        ],
        "ROLE": [
            "Built the entire React front-end including the message list, input, and room sidebar",
            "Developed the Node/Express backend server and WebSocket event architecture",
            "Designed the PostgreSQL database schema for users, rooms, and messages"
        ],
        "CHALLENGE": "Managing WebSocket connections across network interruptions was the hardest part. I built a client-side reconnection strategy using Socket.io's built-in retry logic combined with an offline message queue in localStorage — messages sent while disconnected are dispatched automatically on reconnect."
    },
    {
        "PROJECT_NUM": "06",
        "PREV_NUM": "05",
        "NEXT_NUM": "07",
        "TITLE": "Recipe Finder App",
        "HEADING_GRAD": "Recipe Finder",
        "HEADING_REST": "App",
        "EMOJI": "🍕",
        "SUBTITLE": "Search recipes by ingredients, cuisine, and dietary restrictions — with full nutritional breakdowns",
        "TAGS": ["Vanilla JS", "HTML5", "CSS Grid/Flexbox", "Spoonacular API"],
        "OVERVIEW": [
            "A web application built to solve the universal question: 'What should I make with what I have?' The Recipe Finder lets users input ingredients from their kitchen and receive curated high-quality recipe suggestions instantly.",
            "The app connects to the Spoonacular API for access to over a million recipes, complete with nutritional information, step-by-step instructions, and dietary labels such as vegan, gluten-free, and keto-friendly.",
            "The UI is designed to be food-focused: large appetizing photography, a card-grid layout, and a detail view with a printable ingredients checklist and cooking timer."
        ],
        "FEATURES": [
            "Ingredient-based search (pantry-mode) — type what you have and get what to cook",
            "Filter results by dietary restrictions, cuisine type, and maximum cooking time",
            "Detailed recipe view with ingredient checklist and step-by-step instructions",
            "Save to Favourites functionality persisted across sessions via localStorage",
            "Nutritional breakdown per serving (calories, macros, micronutrients)",
            "Clean, magazine-style responsive grid layout with skeleton loading states"
        ],
        "ROLE": [
            "Designed the user interface with a strong focus on food photography and visual hierarchy",
            "Implemented the Spoonacular API integration and client-side search/filter logic",
            "Built the localStorage persistence layer for saved recipes and search history"
        ],
        "CHALLENGE": "Parsing complex nested JSON responses from the API and normalizing them into a clean internal data model was an interesting data-mapping exercise. I also spent significant time on CSS Grid to achieve a masonry-like layout that adapts gracefully from 1 to 4 columns."
    },
    {
        "PROJECT_NUM": "07",
        "PREV_NUM": "06",
        "NEXT_NUM": "08",
        "TITLE": "Expense / Budget Tracker",
        "HEADING_GRAD": "Expense",
        "HEADING_REST": "/ Budget Tracker",
        "EMOJI": "💰",
        "SUBTITLE": "Personal finance dashboard with category breakdowns, interactive Chart.js visuals, and CSV export",
        "TAGS": ["Vue.js", "Vuex", "Chart.js", "LocalStorage", "Bulma CSS"],
        "OVERVIEW": [
            "A client-side personal finance application that empowers users to take full control of their spending habits. It acts as a digital ledger — users log income and expenses, categorize them, and the dashboard immediately shows where every rupee is going.",
            "The dashboard features interactive donut and bar charts that break down spending by category and visualize trends over time, providing actionable insights without ever connecting to a bank account.",
            "All data is stored locally in the browser, making it completely private. Users can also export their entire transaction history to CSV for use in Excel or other tools."
        ],
        "FEATURES": [
            "Add, edit, and delete income and expense transactions with rich metadata",
            "Real-time balance, total income, and total expense calculation",
            "Interactive donut chart for spending-by-category and bar chart for monthly trends",
            "Category management — create and colour-code custom spending categories",
            "Data persistence using browser localStorage (no account needed)",
            "CSV export of full transaction history with date-range filtering"
        ],
        "ROLE": [
            "Designed and developed the entire SPA from component architecture to chart integration",
            "Implemented dynamic Vuex state management for real-time reactive chart updates",
            "Configured and custom-styled Chart.js instances for accurate financial visualisation"
        ],
        "CHALLENGE": "Keeping Chart.js visualisations in sync with Vuex state mutations was tricky — Vue's reactivity system and Chart.js's imperative update API don't naturally work together. I solved this by using watchers on Vuex getters to trigger chart.update() only when the underlying dataset changed."
    },
    {
        "PROJECT_NUM": "08",
        "PREV_NUM": "07",
        "NEXT_NUM": "09",
        "TITLE": "Movie & TV Show Search App",
        "HEADING_GRAD": "Movie & TV Show",
        "HEADING_REST": "Search App",
        "EMOJI": "🎬",
        "SUBTITLE": "Browse movies and shows, view trailers, ratings, and cast info with infinite scroll powered by TMDB",
        "TAGS": ["React", "React Router", "TMDB API", "Styled Components", "Intersection Observer"],
        "OVERVIEW": [
            "A comprehensive entertainment discovery application powered by The Movie Database (TMDB) API. It delivers a Netflix-like browsing experience for exploring popular, top-rated, trending, and upcoming films and shows.",
            "The app prioritises visual impact — high-resolution posters and backdrop images dominate the interface. Clicking into a title shows full details including a trailer embedded from YouTube, the full cast list, similar recommendations, and user ratings.",
            "Infinite scrolling is implemented using the Intersection Observer API, meaning the page loads more results automatically as the user scrolls, eliminating pagination friction entirely."
        ],
        "FEATURES": [
            "Multi-type search across movies, TV shows, and actors with real-time results",
            "Dynamic routing for individual movie/show detail pages via React Router",
            "Infinite scrolling powered by the Intersection Observer API",
            "Embedded YouTube trailer player on each detail page",
            "Cast list with links to actor filmographies",
            "User rating display and Add to Watchlist functionality"
        ],
        "ROLE": [
            "Designed the cinematic UI with a strong emphasis on high-quality imagery",
            "Integrated the multi-endpoint TMDB API and handled paginated async data fetching",
            "Implemented the Intersection Observer-based infinite scroll system"
        ],
        "CHALLENGE": "Managing paginated state across multiple API endpoints simultaneously (trending movies, TV shows, search results) required a custom data-fetching hook. I built a useInfiniteFetch hook that abstracts the pagination logic, making it reusable across every content type in the app."
    }
]

out_dir = "c:/Users/acer/Desktop/portfolio/projects/"
os.makedirs(out_dir, exist_ok=True)

for p in projects:
    tags_html = "".join([f'<span class="tag">{t}</span>' for t in p['TAGS']])
    overview_paras = "".join([f'<p>{o}</p>' for o in p['OVERVIEW']])
    features_li = "".join([f'<li>{f}</li>' for f in p['FEATURES']])
    role_li = "".join([f'<li>{r}</li>' for r in p['ROLE']])
    
    html = template
    html = html.replace("[SHARED CSS HERE]", shared_css)
    html = html.replace("PROJECT_NUM", p['PROJECT_NUM'])
    html = html.replace("PREV_NUM", p['PREV_NUM'])
    html = html.replace("NEXT_NUM", p['NEXT_NUM'])
    html = html.replace("TITLE", p['TITLE'])
    html = html.replace("HEADING_GRAD", p['HEADING_GRAD'])
    html = html.replace("HEADING_REST", p['HEADING_REST'])
    html = html.replace("EMOJI", p['EMOJI'])
    html = html.replace("SUBTITLE", p['SUBTITLE'])
    html = html.replace("TAGS_HTML", tags_html)
    html = html.replace("OVERVIEW_PARAS", overview_paras)
    html = html.replace("FEATURES_LI", features_li)
    html = html.replace("ROLE_LI", role_li)
    html = html.replace("CHALLENGE_TEXT", p['CHALLENGE'])
    
    with open(os.path.join(out_dir, f"project-{p['PROJECT_NUM']}.html"), "w", encoding="utf-8") as f:
        f.write(html)
    print(f"Created project-{p['PROJECT_NUM']}.html")
