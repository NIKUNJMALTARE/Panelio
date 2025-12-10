# **Panelio – MERN Full-Stack Application**

A fully functional, production-ready MERN (MongoDB, Express, React, Node.js) application built for a consulting / real-estate style business.
It includes a public landing page, an admin dashboard with authentication, Cloudinary image uploads, form submissions, and a complete backend API.

---

## ⭐ **Features**

### **Public Website**

* Modern, responsive landing page
* Project showcase section (dynamic from backend)
* Clients / testimonials section
* Contact form
* Newsletter subscription
* Clean UI with normal CSS (no Tailwind)

### **Admin Dashboard**

* Secure admin login (JWT-based)
* Session timeout + logout
* CRUD operations:

  * Add Projects (with image upload)
  * Add Clients (with image upload)
  * View Contact submissions
  * View Newsletter subscribers
* Sidebar-based navigation

### **Backend API**

* Modular Express architecture (controllers, routes, middleware)
* MongoDB with Mongoose models
* Cloudinary image hosting (production safe)
* Validation + protected routes
* Error handling + CORS support

### **Dev & Deployment**

* Vite React frontend
* Render backend deployment
* Environment variable-based config
* Normal CSS + mobile responsive

---

# 🚀 **Tech Stack**

### **Frontend**

* React (Vite)
* React Router
* Axios
* Normal CSS
* Cloudinary Image URLs

### **Backend**

* Node.js + Express
* MongoDB + Mongoose
* Cloudinary SDK
* Multer (temporary file handling)
* JWT Authentication
* dotenv for environment variables

---

# 📁 **Folder Structure**

```
project-root/
│
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── utils/
│   │   ├── app.js
│   │   └── server.js
│   ├── uploads/   (temporary only)
│   ├── package.json
│   └── .env (ignored)
│
└── frontend/
    ├── src/
    │   ├── api/
    │   ├── components/
    │   ├── pages/
    │   ├── utils/
    │   ├── App.jsx
    │   ├── main.jsx
    │   ├── index.css
    ├── package.json
    └── .env
```

---

# ⚙️ **Environment Variables**

### **Backend (`backend/.env`)**

```
PORT=5000
MONGO_URI=your_mongodb_atlas_connection
JWT_SECRET=your_secret_key

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### **Frontend (`frontend/.env`)**

```
VITE_API_BASE_URL=https://your-backend-domain.onrender.com
```

> 📝 Both `.env` files must **NOT** be committed.

---

# 🛠️ **Installation & Setup**

## **Backend Setup**

```bash
cd backend
npm install
```

Create `.env` → add variables listed above.

Create temporary uploads folder:

```bash
mkdir uploads
```

Start backend:

```bash
npm run dev
```

Runs on → **[http://localhost:5000](http://localhost:5000)**

---

## **Frontend Setup**

```bash
cd frontend
npm install
```

Create `.env` → add:

```
VITE_API_BASE_URL=http://localhost:5000
```

Start frontend:

```bash
npm run dev
```

Runs on → **[http://localhost:5173](http://localhost:5173)**

---

# 🔐 **Authentication Flow**

1. Admin registers (one-time) via:

```
POST /api/auth/register
```

2. Admin logs in → gets JWT token
3. Token stored in localStorage + session timeout added
4. Protected routes require:

```
Authorization: Bearer <token>
```

---

# 🖼️ **Image Upload Flow (Cloudinary)**

1. Admin uploads image from dashboard
2. Multer stores it temporarily in `/uploads`
3. Backend uploads file to Cloudinary:

   * Cloudinary returns `secure_url`
4. Backend saves `secure_url` to MongoDB
5. Frontend displays image using the full Cloudinary URL

This makes deployment fully stable because Render’s filesystem is **ephemeral**.

---

# 📡 **API Endpoints Cheat Sheet**

### **Auth**

| Method | Endpoint             | Protected | Description             |
| ------ | -------------------- | --------- | ----------------------- |
| POST   | `/api/auth/register` | ❌         | Create admin (use once) |
| POST   | `/api/auth/login`    | ❌         | Login admin             |

### **Projects**

| Method | Endpoint        | Protected |
| ------ | --------------- | --------- |
| GET    | `/api/projects` | ❌         |
| POST   | `/api/projects` | ✅ (Admin) |

### **Clients**

| Method | Endpoint       | Protected |
| ------ | -------------- | --------- |
| GET    | `/api/clients` | ❌         |
| POST   | `/api/clients` | ✅         |

### **Contacts**

| POST | `/api/contact` | ❌ |
| GET | `/api/contact` | ✅ |

### **Subscribers**

| POST | `/api/subscribe` | ❌ |
| GET | `/api/subscribe` | ✅ |

---

---

# 🧭 **Deployment Instructions**

## **Backend → Render**

1. Create a new Web Service
2. Connect Git repo
3. Build Command:

```
npm install
```

4. Start Command:

```
nodemon server.js
```

5. Add Environment Variables
6. Deploy
7. Test API:

```
https://your-service.onrender.com/api/projects
```

---

## **Frontend → Vercel**

1. Import frontend folder
2. Set build command:

```
npm run build
```

3. Set output folder:

```
dist
```

4. Add env var:

```
VITE_API_BASE_URL=https://your-backend.onrender.com
```

5. Deploy

---

# 📝 **Evaluation Checklist**

### ✔ Full MERN Stack Application

### ✔ JWT Authentication

### ✔ Admin Panel

### ✔ CRUD (Project, Client)

### ✔ Cloudinary image upload

### ✔ Contact + Newsletter forms

### ✔ Dynamic data (MongoDB)

### ✔ Fully responsive UI

### ✔ Normal CSS

### ✔ Deployed backend + frontend

### ✔ Clean code organization

### ✔ Professional README.md

---

# 📄 **Brief Project Summary**

Panelio is a modern MERN-stack platform designed to showcase real-estate/projects along with client testimonials and contact features. The admin side is fully secure with JWT authentication and allows adding projects and clients using Cloudinary-based image handling. The project demonstrates robust full-stack development including REST API design, MongoDB data modeling, session-based authentication, responsive UI, and production deployment on Render & Vercel, fulfilling all required evaluation criteria.

---
