---
# 🛍️ E-Commerce Website (MERN Stack)

A full-featured **E-Commerce web application** built using the **MERN stack (MongoDB, Express.js, React.js, Node.js)**.
This project includes a **customer-facing storefront**, a **secure backend API**, and a **dedicated admin dashboard** for product and order management.
Each part — **Frontend**, **Backend**, and **Admin Dashboard** — is independently deployed on **Vercel**.
---

## 🚀 Live Links

- **Frontend (User Site):** [https://e-commerce-frontend-three-alpha.vercel.app](https://e-commerce-frontend-three-alpha.vercel.app)
- **Backend (API):** [https://e-commerce-sooty-mu-13.vercel.app](https://e-commerce-sooty-mu-13.vercel.app)
- **Admin Dashboard:** [https://e-commerce-admin-gilt-ten.vercel.app](https://e-commerce-admin-gilt-ten.vercel.app)

---

## 🧩 Overview

This project demonstrates a complete online shopping experience — from product browsing to secure checkout.
Users can:

- Explore a catalog of products
- Apply filters and sorting
- Add products to their cart
- Select variants (like size)
- Checkout using **Cash on Delivery** or **Online Payment** via **Stripe** or **Razorpay**

The **Admin Dashboard** allows the admin to:

- Add new products
- Delete or edit existing ones
- View all products and orders

All data (users, products, orders) is stored in a **MongoDB** database, with product images hosted on **Cloudinary**.

---

## ⚙️ Features

- 🧾 Product listing with filtering and sorting
- 🛒 Add to cart with variant selection
- 👤 Secure user authentication (JWT)
- 🚚 Order placement with delivery address
- 💳 Payment integration with **Stripe** and **Razorpay**
- 👨‍💼 Admin panel for product & order management
- ☁️ Image uploads via Cloudinary
- 🌍 Fully deployed using Vercel

---

## 🧠 Tech Stack

**Frontend**

- React.js
- React Router DOM
- Axios
- Tailwind CSS
- React Toastify

**Backend**

- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication
- Multer (file upload)
- Cloudinary
- Stripe, Razorpay
- bcrypt, validator, dotenv, cors

**Admin Dashboard**

- React.js
- Tailwind CSS
- Axios
- React Router DOM
- React Toastify

---

## 🗂️ Folder Structure

```
e-commerce/
│
├── backend/
│   ├── server.js
│   ├── routes/
│   ├── models/
│   ├── controllers/
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   ├── context/
│   │   └── assets/
│   └── vite.config.js
│
└── admin/
    ├── src/
    │   ├── pages/
    │   ├── components/
    │   └── assets/
    └── vite.config.js
```

---

## ⚙️ Environment Variables

Each part of the project has its own `.env` file.
Below are the required environment variables for local setup.

---

### 🖥️ Backend (.env)

```
MONGODB_URI=your_mongodb_connection_string
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUD_NAME=your_cloudinary_cloud_name
JWT_SECRET=your_jwt_secret_key
ADMIN_EMAIL=your_admin_email@example.com
ADMIN_PASSWORD=your_admin_password
STRIPE_SECRET_KEY=your_stripe_secret_key
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
RAZORPAY_KEY_ID=your_razorpay_key_id
FRONTEND_URL=https://your-frontend-domain.vercel.app
PRODUCT_ASSET_BASE_URL=https://res.cloudinary.com/your_cloud_name/image/upload/ecommerce/products
```

---

### 💻 Frontend (.env)

```
VITE_BACKEND_URL="https://your-backend-domain.vercel.app"
VITE_RAZORPAY_KEY_ID=your_razorpay_key_id
```

---

### 🧭 Admin (.env)

```
VITE_BACKEND_URL="https://your-backend-domain.vercel.app"
```

---

**Note:**

- Use `http://localhost:4000` for local development and the deployed backend URL on Vercel.
- Never include actual keys, passwords, or database URIs in public repos.
- Use these variables locally, and configure real values securely on your hosting platform (like Vercel).

### Vercel deployment order

1. Deploy `backend` first with the MongoDB, Cloudinary, JWT, admin, and payment environment variables.
2. Copy the deployed backend URL into `VITE_BACKEND_URL` for both `frontend` and `admin`.
3. Set `VITE_RAZORPAY_KEY_ID` in `frontend` when Razorpay payments are enabled.
4. Deploy `frontend` and `admin` as separate Vercel projects, using each folder as its project root.

The existing catalog images have been migrated to Cloudinary. For a fresh production database, set `PRODUCT_ASSET_BASE_URL` to the Cloudinary folder containing the catalog images; localhost image URLs will not work after deployment.

---

## 🧱 Local Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/RummanShuja/e-commerce.git
   cd e-commerce
   ```

2. **Install dependencies**

   ```bash
   cd backend && npm install
   cd ../frontend && npm install
   cd ../admin && npm install
   ```

3. **Run the backend**

   ```bash
   cd backend
   npm run server
   ```

4. **Run the frontend**

   ```bash
   cd ../frontend
   npm run dev
   ```

5. **Run the admin dashboard**

   ```bash
   cd ../admin
   npm run dev
   ```

---

## 🔐 Admin Access

For security reasons, **admin login credentials are not shared publicly**.
If you’d like to explore the admin dashboard, please contact me for demo access.

---

## 🌍 Deployment

Each service is deployed separately on **Vercel**:

- Frontend → built with Vite
- Admin Dashboard → built with Vite
- Backend → Express.js API with environment variables configured on Vercel

---

## 💡 Learnings

- Structuring a full-stack MERN project with multi-service deployment
- Integrating Stripe and Razorpay payment gateways
- Implementing authentication and Cloudinary image uploads
- Efficiently connecting frontend and backend via REST APIs
- Handling deployment workflows for MERN apps on Vercel

---

## 🚀 Future Improvements

- Add product reviews and ratings
- Implement order tracking and inventory management
- Add email notifications for orders
- Integrate analytics and reports for admin

---

## 👨‍💻 Author

**Rumman Shuja**
B.Tech Electrical Engineering — Delhi Technological University
Aspiring Software Engineer | Passionate about Web Development and Full-Stack Engineering

---
# e-commerce
