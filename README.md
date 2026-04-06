# Xserious Engineering Works — Portfolio Website

A modern React.js portfolio site for Xserious Engineering Works, featuring a public-facing portfolio and a private admin panel for managing projects.

---

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ installed
- npm or yarn

### Installation

```bash
# 1. Navigate into the project folder
cd xserious-engineering

# 2. Install dependencies
npm install

# 3. Start development server
npm start
```

The site will open at **http://localhost:3000**

### Build for Production

```bash
npm run build
```

This creates a `build/` folder ready to deploy to Netlify, Vercel, or any static host.

---

## 📁 Project Structure

```
src/
├── components/
│   ├── Navbar.js          # Sticky navigation bar
│   ├── ProjectCard.js     # Project grid card component
│   └── Footer.js          # Site footer
├── pages/
│   ├── Portfolio.js       # Main public portfolio page (/)
│   ├── ProjectDetail.js   # Individual project page (/project/:id)
│   └── AdminPage.js       # Admin panel (/admin)
├── data/
│   └── projects.js        # Project data + localStorage utilities
├── App.js                 # Router setup
├── index.js               # Entry point
└── index.css              # Global styles & CSS variables
```

---

## 🔧 Pages

| Route | Description |
|-------|-------------|
| `/` | Public portfolio with hero, services, project catalog, about, and contact |
| `/project/:id` | Full project detail page |
| `/admin` | Admin panel to add, edit, delete projects and upload images |

---

## 📦 Admin Panel Features

- **Add Projects** — Fill in title, category, description, work details, tags, price, and upload images
- **Edit Projects** — Modify any existing project
- **Delete Projects** — Remove projects with confirmation
- **Image Upload** — Drag and drop or click to upload; images stored as base64 in localStorage
- **Search & Filter** — Real-time search and category filtering
- **Dashboard Stats** — Total projects, featured count, category breakdown

---

## 💾 Data Storage

Projects are stored in **browser localStorage**. This means:
- Data persists between sessions on the same browser
- No backend or database required for the portfolio
- To share data across devices, export/import JSON via admin

> 💡 For production use, consider replacing localStorage with a backend API (Firebase, Supabase, or a custom Express server)

---

## 🎨 Design

- **Theme**: Industrial dark aesthetic — carbon black backgrounds, amber accent (#f0a500), monospace technical typography
- **Fonts**: Barlow Condensed (display), Barlow (body), Share Tech Mono (code/labels)
- **Responsive**: Mobile-first, fully responsive across all screen sizes

---

## 🌐 Deployment

### Netlify (Recommended)

1. Run `npm run build`
2. Drag `build/` folder to [netlify.com/drop](https://netlify.com/drop)

Or connect your GitHub repo for automatic deployments.

### Vercel

```bash
npm install -g vercel
vercel
```

---

## 📝 Customization

### Update contact details
Edit `src/pages/Portfolio.js` — search for `+94 XXXXXXXXX` and replace with the actual phone number.

### Update business info
Edit `src/data/projects.js` to modify the default project catalog, or `src/pages/Portfolio.js` for the about section text.

### Add new service categories
Edit the `categories` array in `src/data/projects.js`.

---

## 📄 License

Built for Xserious Engineering Works. University project — all rights reserved.
