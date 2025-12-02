# 🔗 URL Shortener Web App

A full-stack URL shortener application built with **Spring Boot**, **React**, and **PostgreSQL**.
It lets users shorten long URLs, manage them in a dashboard, generate customizable QR codes, and share links instantly.

---

## 🚀 Tech Stack

| Layer    | Technology                   |
| -------- | ---------------------------- |
| Frontend | React, TailwindCSS, Axios    |
| Backend  | Spring Boot, Spring Web, JPA |
| Auth     | JWT                          |
| Database | PostgreSQL + pgAdmin         |
| Tools    | Maven, Lombok, QR Generator  |

---

## ✨ Features

* Shorten long URLs
* Persist URLs with PostgreSQL
* Instant redirect using short code
* Copy link to clipboard
* Editable short URLs (Update feature)
* Delete URL entry
* QR Code generator with:

  * Size customization
  * Color customization
  * Download option (PNG)
  * Share option
* Click tracking (optional)
* Clean and responsive UI
* JWT-based secure access (optional toggle)

---

## 📁 Project Structure

```
url-shortener/
 ┣ backend/
 ┃ ┣ src/main/java/...  (Spring Boot)
 ┃ ┗ pom.xml
 ┣ frontend/
 ┃ ┣ src/ (React UI)
 ┃ ┗ package.json
 ┗ README.md
```

---

## 📦 Setup Guide

### 🛠 Backend (Spring Boot)

1. Clone the repository:

```bash
git clone https://github.com/Rohitmishra7295/urlshortenerwebapp.git
cd urlshortenerwebapp
```

2. Update database configuration:
   `src/main/resources/application.properties`

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/urlshortener
spring.datasource.username=postgres
spring.datasource.password=your_password
spring.jpa.hibernate.ddl-auto=update
base.url=http://localhost:8080/
```

3. Run the backend:

```bash
mvn spring-boot:run
```

---

### 🎨 Frontend (React)

```bash
cd frontend
npm install
npm start
```

---

## 🗄 Database Setup

* Create a PostgreSQL database:

```
urlshortener
```

* Ensure credentials match `application.properties`.

---

## 🔍 Sample API Endpoints (Optional Auth Enabled)

| Method | Endpoint           | Description              |
| ------ | ------------------ | ------------------------ |
| POST   | `/api/shorten`     | Create short URL         |
| GET    | `/{shortCode}`     | Redirect to original URL |
| PUT    | `/api/update/{id}` | Update short URL         |
| DELETE | `/api/delete/{id}` | Delete short URL         |

### 🔧 Sample Request

```json
POST /api/shorten
{
  "originalUrl": "https://example.com",
  "customAlias": "my-link"
}
```

### 📌 Sample Response

```json
{
  "shortUrl": "http://localhost:8080/my-link",
  "qrCode": "base64String",
  "createdAt": "2025-01-01T10:15:30"
}
```



## 👨‍💻 Author

**Rohit Kumar Mishra**

📧 Email: `rohitmishra729595@gmail.com`
🔗 LinkedIn: `https://www.linkedin.com/in/rohit-backenddev/`

---
