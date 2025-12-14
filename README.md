# 🔗 URL Shortener Web Application

A full-stack URL shortener built with **Spring Boot**, **React**, and **PostgreSQL**.
The application allows users to shorten long URLs, manage them through a dashboard, generate customizable QR codes, and share links easily. It also supports **Docker-based deployment** for consistent setup.



## 🌐 Live Demo

🔗 **Application:** [https://seeurl.netlify.app](https://seeurl.netlify.app)

> Deployed using Docker containers with a cloud-hosted PostgreSQL database (Neon).  
> Backend is deployed on Render, and the frontend is deployed on Netlify.

> Note: The backend runs on a free tier, so the first request may take a few seconds to respond.



## 🚀 Tech Stack

| Layer       | Technology                                       |
|------------|-------------------------------------------------- |
| Frontend   | React, Tailwind CSS, Axios, Chart.js              |
| Backend    | Spring Boot, Spring Web, Spring Data JPA          |
| Security   | JWT Authentication                                |
| Database   | PostgreSQL, pgAdmin / Neon                        |
| API Tools  | Postman                                           |
| Dev Tools  | Maven, Lombok, Docker, Git                        |




## ✨ Key Features

* Shorten long URLs instantly
* Persistent storage using PostgreSQL
* Fast redirection via short code
* Copy shortened links to clipboard
* Update and delete short URLs
* QR Code generation with:
   * Size and color customization
   * PNG / PDF / JPG download and share option
* URL click tracking
* JWT-based secure access



## 📸 Screenshots
### 🏠 Home Page
![Home Page](screenshots/Home.png)

### 📊 Dashboard
![Dashboard](screenshots/Dashboard.png)

### 🧪 API Testing (Postman)
![API Testing](screenshots/postman.png)

### 🐳 Docker Dashboard
![Docker Dashboard](screenshots/DockerDashboard.png)

### 🗄 Database (PostgreSQL / Neon)
![Database](screenshots/neonDB.png)



## 📦 Local Setup

### Backend (Spring Boot)

```bash
git clone https://github.com/rohit-backend-dev/urlshortener-web-Application.git
cd urlshortener-web-Application
```

Update `backend/src/main/resources/application.properties`:

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/urlshortener
spring.datasource.username=postgres
spring.datasource.password=your_password
spring.jpa.hibernate.ddl-auto=update
base.url=http://localhost:8080/
```

Run backend:

```bash
mvn spring-boot:run
```



### Frontend (React)

```bash
cd frontend
npm install
npm start
```

Frontend runs on `http://localhost:3000`.



## 🗄 Database Setup

* Create a PostgreSQL database named:

```
urlshortener
```

* Ensure credentials match `application.properties`.


## 🚀 Deployment Guide (Docker)

This project supports **Docker-based deployment** for easy and consistent setup.

### Prerequisites

* Docker
* Docker Compose

### Run with Docker

```bash
docker-compose up --build
```

This starts:

* Spring Boot backend
* React frontend
* PostgreSQL database

**Access:**

* Frontend → `http://localhost:3000`
* Backend → `http://localhost:8080`

> In production, environment variables are used for DB credentials and JWT secrets. A managed PostgreSQL service (Neon) is recommended.


## 🔍 Sample API Endpoints

| Method | Endpoint           | Description              |
| ------ | ------------------ | ------------------------ |
| POST   | `/api/shorten`     | Create short URL         |
| GET    | `/{shortCode}`     | Redirect to original URL |
| PUT    | `/api/update/{id}` | Update short URL         |
| DELETE | `/api/delete/{id}` | Delete short URL         |



### Sample Request

```json
POST /api/shorten
{
  "originalUrl": "https://example.com",
  "customAlias": "my-link"
}
```

### Sample Response

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
🔗 [LinkedIn](https://www.linkedin.com/in/rohit-backenddev/)


