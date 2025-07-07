# 🌱 Green Club MNNIT - Official Website

Welcome to the official website of **Green Club MNNIT** — a vibrant, student-driven initiative dedicated to sustainability, nature, and environmental action at MNNIT Allahabad.

---

## 🌿 Our Mission

> "Empowering the campus community to create a greener, cleaner, and more sustainable future."

Currently, Green Club MNNIT is not involved in any official mission or program. Stay tuned for future updates and opportunities to join our movement!

---

## ✨ Features

- **Modern, eco-friendly UI** (glassmorphism, green gradients, animated backgrounds)
- **Responsive design** (mobile-first, looks great everywhere)
- **Team page** (filter by year, 3D animated cards, optimized rendering)
- **Gallery** (drag & drop upload, lightbox, admin-only delete, upload progress, modern effects)
- **Problem Listing & Management**
  - Submit problems/issues (with labels)
  - Advanced filtering and search
  - Label-based organization
  - Admins can edit/delete any problem
  - Users can manage their own submissions
- **Admin Login & Dashboard**
  - Secure login (JWT-based)
  - Admin/member roles
  - Admins have full access to all features
  - Members have access to their own data
- **Contact Form** (Nodemailer, SMTP, secure)
- **MongoDB Database** (users, problems, gallery)
- **Production-ready** (Vercel hosting, cloud-ready)

---

## 🖥️ Tech Stack

- **Next.js** (App Router, SSR, API routes)
- **React** (Modern UI, hooks)
- **Tailwind CSS** (Utility-first, responsive design)
- **Framer Motion** (Smooth, modern animations)
- **MongoDB + Mongoose** (Database for users, problems, gallery)
- **Nodemailer (SMTP)** (Contact form email, secure)
- **JWT Auth** (Secure login, admin/member dashboard)
- **Vercel** (Production hosting)

---

## 📁 Project Structure

```
/public
  /fonts         # Custom fonts
  /gallery       # (Dev only) Local image uploads
  /Images        # Static images
/src
  /app           # Next.js app directory (pages, API, layout)
  /Components    # UI components (Hero, Team, Gallery, etc.)
  /lib           # Utilities, data, auth, DB logic
  /auth          # Auth pages (login, signup)
README.md
```

---

## 🖼️ Image Upload (Important!)
- **Local image upload works only in development.**
- On Vercel (production), use a cloud storage service (e.g., S3, Cloudinary) for uploads.

---

## 📬 Contact & Contributing

- Email: [greenclub@mnnit.ac.in](mailto:greenclub@mnnit.ac.in)
- Want to contribute? Fork, branch, and PR! Suggestions and new features are welcome.

---

## 🌐 Deploy on Vercel

Deploy instantly with [Vercel](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

---

> Designed & built with 💚 by the Green Club MNNIT team.
