# Pixora - Visual Discovery Platform

Pixora is a modern, responsive Pinterest-style web application built with **React** and **Vite**. It leverages the **Pexels API** to provide users with a stunning visual discovery experience, featuring a dynamic masonry layout, infinite scrolling, and category-based exploration.

## 🚀 Features

- **Dynamic Masonry Layout**: A beautifully arranged grid of images that adjusts fluidly to different screen sizes.
- **Infinite Scrolling**: Seamlessly browse through thousands of images with automatic loading as you scroll.
- **Category Explorer**: Browse curated collections across multiple genres like Nature, Architecture, Technology, and more.
- **Real-time Search**: Find specific inspiration using the integrated search bar powered by Pexels.
- **Modern UI/UX**: Clean, minimal design with smooth transitions and hover effects for a premium feel.
- **Responsive Design**: Fully optimized for mobile, tablet, and desktop viewing.

## 🛠️ Tech Stack

- **Frontend**: React 19
- **Build Tool**: Vite 8
- **Styling**: CSS Modules & Vanilla CSS
- **API**: Pexels API
- **Routing**: React Router 7
- **Hooks**: Custom hooks for data fetching (`usePinsFeed`) and infinite scroll (`useInfiniteScroll`).

## ⚙️ Setup & Installation

### 1. Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- A Pexels API Key (Get it at [pexels.com/api](https://www.pexels.com/api/))

### 2. Clone the Repository
```bash
git clone <your-repo-url>
cd vite-project
```

### 3. Environment Configuration
Create a `.env` file in the root directory and add your API key:
```env
VITE_PEXELS_API_KEY=your_api_key_here
```

### 4. Install Dependencies
```bash
npm install
```

### 5. Run Development Server
```bash
npm run dev
```
The app will be available at `http://localhost:5173` (or the port specified in your terminal).

## 📂 Project Structure

```
src/
├── components/     # Reusable UI components (MasonryGrid, Navbar, etc.)
├── hooks/          # Custom React hooks (useInfiniteScroll, usePinsFeed)
├── pages/          # Page-level components (Home, Explore)
├── services/       # API services and data normalization
├── data/           # Static data and constants
└── App.jsx         # Main application routing and layout
```


---
Deployed Link
https://thriving-froyo-f436d0.netlify.app/
