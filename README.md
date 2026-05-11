# 📚 Book Manager - Full Stack Application

<div align="center">

![React](https://img.shields.io/badge/React-18.x-61dafb?style=for-the-badge&logo=react)
![Node.js](https://img.shields.io/badge/Node.js-20.x-339933?style=for-the-badge&logo=node.js)
![Express](https://img.shields.io/badge/Express-4.x-000000?style=for-the-badge&logo=express)
![MongoDB](https://img.shields.io/badge/MongoDB-8.x-47A248?style=for-the-badge&logo=mongodb)
![JWT](https://img.shields.io/badge/JWT-Auth-000000?style=for-the-badge&logo=jsonwebtokens)

**Complete book management system with authentication**

</div>

---

## 📖 About

Full-stack application for managing books with user authentication, search, filters, and pagination.

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| 🔐 Authentication | Register/Login with JWT |
| 📚 Book Management | Create, Read, Update, Delete |
| 🔍 Search | Search books by title/author |
| 🏷️ Filters | By category, price, rating |
| 📊 Sorting | By price, rating, date |
| 📄 Pagination | Split results into pages |
| ⭐ Favorites | Save favorite cities (in weather app) |
| 🌓 Dark Mode | Toggle theme |

---

## 🛠️ Tech Stack

### Backend

- Node.js + Express  
- MongoDB + Mongoose  
- JWT Authentication  
- bcryptjs for passwords  

### Frontend

- React 18  
- React Router DOM  
- Axios  
- React Hot Toast  

---

## 🚀 Quick Start

### Prerequisites

- Node.js (v18+)  
- MongoDB Atlas account (free) or local MongoDB  

### Installation

```bash
# Clone repository
git clone https://github.com/yourusername/books-fullstack.git
cd books-fullstack

# Install backend
cd backend
npm install

# Install frontend
cd frontend
npm install
```

### Environment Variables (.env)

```env
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/booksdb #Here my data, edit it
JWT_SECRET=your_secret_key_here #Here my random password
JWT_EXPIRE=7d
```

### Run

```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm run dev
```

Open http://localhost:5173

---

## 📡 API Endpoints

### Auth

| Method | Endpoint            | Description   |
|--------|---------------------|---------------|
| POST   | `/api/auth/register`| Register user |
| POST   | `/api/auth/login`   | Login user    |
| GET    | `/api/auth/me`      | Get profile   |

### Books (require Bearer token)

| Method | Endpoint          | Description    |
|--------|-------------------|----------------|
| GET    | `/api/books`      | Get all books  |
| GET    | `/api/books/:id`  | Get single book|
| POST   | `/api/books`      | Create book    |
| PUT    | `/api/books/:id`  | Update book    |
| DELETE | `/api/books/:id`  | Delete book    |

### Query Parameters (GET `/api/books`)

```text
?category=Fiction&minPrice=10&maxPrice=50&minRating=4&search=harry&sort=price_asc&page=1&limit=10
```

---

## 🧪 Testing with Postman

1. **Register**

   ```text
   POST http://localhost:5000/api/auth/register
   Body: { "name": "John", "email": "john@test.com", "password": "123456" }
   ```

2. **Login**

   ```text
   POST http://localhost:5000/api/auth/login
   Body: { "email": "john@test.com", "password": "123456" }
   ```

3. **Create Book**

   ```text
   POST http://localhost:5000/api/books
   Headers: { "Authorization": "Bearer YOUR_TOKEN" }
   Body: { "title": "Book Title", "author": "Author Name", "price": 19.99, "category": "Fiction" }
   ```

---

## 📸 Screenshots

<div align="center">
  <img src="screenshots/main_menu.png" alt="Main Menu" width="45%"/>
  <img src="screenshots/register.png" alt="Gameplay" width="45%"/>
  <img src="screenshots/login.png" alt="Gameplay" width="45%"/>
  <img src="screenshots/add_book.png" alt="Game Over" width="45%"/>
</div>

---

## 🐛 Common Issues

| Problem                 | Solution                         |
|-------------------------|----------------------------------|
| MongoDB connection error| Check Atlas connection string or start local MongoDB |
| JWT invalid             | Verify `JWT_SECRET` in `.env`   |
| Port 5000 busy          | Change `PORT` in `.env`         |
| CORS error              | Ensure backend has `app.use(cors())` |
