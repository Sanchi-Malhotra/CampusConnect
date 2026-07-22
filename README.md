# CampusConnect

CampusConnect is a full-stack web application that allows college students to rent, sell, or exchange items within their university community. The goal is to make it easier for students to buy or borrow items like books, calculators, laptops, cycles, and hostel essentials from fellow students.

---

## Tech Stack

**Frontend**
- HTML
- CSS
- JavaScript
- Fetch API

**Backend**
- Java
- Spring Boot
- Spring Data JPA
- Spring Security (basic setup)
- REST APIs

**Database**
- MySQL

**Tools**
- Git
- GitHub
- VS Code
- Maven

---

## Features

### 1. User Registration
Users can create a new account.

Information stored:
- Name
- Email
- Password

Duplicate email registration is prevented.

```
POST /auth/register
```

### 2. User Login
Users can log in using their email and password.

```
POST /auth/login
```

Currently the backend verifies credentials and returns the logged-in user.

### 3. Product Listing
A logged-in user can post products. Each product contains:
- Title
- Description
- Price
- Category
- Type (Rent / Sell / Exchange)

### 4. Product Categories
- `BOOK`
- `NOTES`
- `CALCULATOR`
- `CYCLE`
- `LAPTOP`
- `HOSTEL_ITEM`

### 5. Listing Types
- `RENT`
- `SELL`
- `EXCHANGE`

### 6. View Products
Any user can view all available products.

```
GET /products
```

### 7. View Single Product

```
GET /products/{id}
```

### 8. Delete Product

```
DELETE /products/{id}
```

### 9. Product Ownership
Every product belongs to a registered user.

```
User
  |
  | 1
  |
  |------< Product
```

Implemented using JPA:
```java
@OneToMany
@ManyToOne
```

This allows displaying who uploaded each product.

---

## Database Structure

**User**
```
id
name
email
password
```

**Product**
```
id
title
description
price
category
type
user_id
```
`user_id` references the owner (foreign key to `User`).

---

## REST APIs

**Authentication**
```
POST /auth/register
POST /auth/login
```

**Products**
```
GET    /products
GET    /products/{id}
POST   /products/user/{userId}
DELETE /products/{id}
```

---

## Frontend Pages
- Home (`index.html`)
- Login (`login.html`)
- Register (`register.html`)
- Products (`products.html`)

Built using HTML, CSS, and JavaScript.

---

## Spring Boot Concepts Used
- REST Controllers
- Dependency Injection
- Spring Data JPA
- Entity Relationships
- Repository Pattern
- Service Layer
- MySQL Integration
- CORS Configuration
- Maven
- Spring Boot Auto Configuration

---

## Getting Started

### Prerequisites
- Java 21
- Maven
- MySQL Server running locally (or accessible remotely)

### Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/Sanchi-Malhotra/CampusConnect.git
   cd CampusConnect/demo
   ```

2. **Create a database** in MySQL matching the name you'll use below.

3. **Set up environment variables**

   This project reads sensitive configuration (DB credentials, JWT secret) from environment variables — nothing is hardcoded in `application.properties`.

   Copy `.env.example` to `.env` and fill in your own values:
   ```
   DB_URL=jdbc:mysql://localhost:3306/your_db_name
   DB_USERNAME=your_mysql_username
   DB_PASSWORD=your_mysql_password
   JWT_SECRET=your_jwt_secret
   ```

   If running via VS Code, you can instead set these in `.vscode/launch.json` under the `env` block (not committed to git).

4. **Run the application**
   ```bash
   mvn spring-boot:run
   ```

5. The backend will start on `http://localhost:8080`.

6. **Frontend**: open the HTML files (`index.html`, `login.html`, etc.) directly in your browser, or serve them with a simple static server.

---

## Workflow

```
User Registers
      |
      v
User Logs In
      |
      v
Creates Product Listing
      |
      v
Product Stored in MySQL
      |
      v
Other Students View Listings
      |
      v
Student Contacts Owner
```

---

## Problems Solved During Development
- CORS errors
- `ERR_CONNECTION_REFUSED`
- Fetch API issues
- Login failures
- MySQL connection configuration
- JPA entity mapping
- `user_id` being `NULL`
- Git and GitHub setup
- Protecting secrets in `application.properties`

---

## Future Enhancements
- JWT-based authentication (in progress)
- Password encryption with BCrypt
- Product images uploads and check
- Search and filter by category
- Wishlist / Favorites
- Chat between buyer and seller
- Pagination and sorting
- Email notifications
- Admin dashboard
- Deployment (backend + database + frontend)
- Responsive UI improvements

---

