# 🚀 Project Setup Guide

This project is a robust backend server built with Node.js, TypeScript, Express, and Prisma ORM using PostgreSQL.

---

## 📁 Project Structure

```text
server/
│
├── prisma/
│   └── schema.prisma
│
├── src/
│   ├── app.ts
│   ├── server.ts
│   ├── routes/
│   │   ├── user.route.ts
│   │   ├── category.route.ts
│   │   ├── product.route.ts
│   │   └── review.route.ts
│   ├── services/
│   │   ├── user/
│   │   ├── category/
│   │   ├── product/
│   │   └── review/
│   └── middlewares/
│       └── auth.ts
│
├── .env
├── .gitignore
├── package.json
└── tsconfig.json
```

---

## ⚙️ Getting Started & Installation

Follow these steps to set up and run the project locally.

### 1. Clone the Repository

```bash
git clone https://github.com/mahmudul-Hasan-2/Assignment-backend.git
cd Assignment-backend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Setup Environment Variables

Create a `.env` file in the root directory and add the following configurations:

```env
PORT=5000
DATABASE_URL="postgresql://user:password@localhost:5432/db_name?schema=public"
JWT_SECRET="your_super_secret_jwt_key"
```

### 4. Run Prisma Migrations

```bash
npx prisma migrate dev --name init
```

### 5. Start the Server

For development mode (with hot-reloading):

```bash
npm run dev
```

For production build:

```bash
npm run build
```

```bash
npm start
```

---

### Part 4: (API Endpoints Documentation)

```markdown
## 🔌 API Endpoints Documentation

### Authentication (`/api/v1/users`)

- **POST /register** - Register a new user
- **POST /login** - Login user and receive an `accessToken`

### Categories (`/api/v1/categories`)

- **POST /** - Create a new category _(Protected)_
- **GET /** - Get all categories with related products _(Public)_

### Products (`/api/v1/products`)

- **POST /** - Create a new product _(Protected)_
- **GET /** - Get all available products _(Public)_
- **GET /:id** - Get product by ID _(Public)_
- **PATCH /:id** - Update product details _(Protected)_
- **DELETE /:id** - Soft delete a product _(Protected)_

### Reviews (`/api/v1/reviews`)

- **POST /** - Create a product review _(Protected)_
- **GET /** - Get all reviews _(Public)_
```

---

## 🛡️ Authentication & Authorization

Protected routes require a Bearer Token in the headers:

- **Header Key:** `Authorization`
- **Header Value:** `Bearer <your_access_token>`

---

## 📄 License

This project is developed as a part of the JP Backend Development coursework.
