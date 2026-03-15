## r3aya — Child Physiotherapy Monitoring System API

**r3aya** is a scalable backend API designed to support a digital child physiotherapy monitoring platform.
The system connects parents with physiotherapy specialists and enables structured management of children’s therapy sessions and EMG-based muscle assessments.

Built using modern backend architecture principles, the platform ensures secure authentication, structured data management, and efficient handling of medical monitoring workflows.

---

## System Overview

The API provides the core infrastructure for managing users, parents, children, specialists, and EMG diagnostic sessions.
It enables parents to track their child’s physiotherapy progress while allowing specialists to review and interact with patient data.

The system focuses on **security, scalability, and modular design**, making it suitable for healthcare-related platforms that require reliable data handling.

---

## Tech Stack

| Technology | Purpose               |
| ---------- | --------------------- |
| Node.js    | Runtime environment   |
| Express.js | Backend framework     |
| MongoDB    | NoSQL database        |
| Mongoose   | Database modeling     |
| JWT        | Secure authentication |
| Joi        | Request validation    |
| Nodemailer | Email notifications   |

---

## Core Features

* 🔐 Secure authentication with **JWT** and **Email OTP verification**
* 👤 Dual user architecture separating **authentication data** from **parent profile data**
* 🧒 Child profile management linked to parent accounts
* 🩺 Specialist discovery with browsing, rating, and contact request features
* 📊 EMG session tracking with AI model result storage
* 🛡 Role-based authorization and secure access control
* 🗑 Soft delete system to maintain data integrity
* 📑 Pagination support for large medical datasets

---

## System Modules

| Module | Description                                                        |
| ------ | ------------------------------------------------------------------ |
| Auth   | User registration, login, OTP verification, password reset         |
| Parent | Guardian profile creation and management                           |
| Child  | Add, update, and monitor children profiles                         |
| Doctor | Browse specialists, view ratings, send contact requests            |
| EMG    | Start/stop EMG sessions and retrieve historical assessment results |

---

## Project Architecture

The project follows a **modular backend architecture** to ensure maintainability and scalability.

```
src/
 ├── modules/        # Feature modules (auth, parent, child, doctor, emg)
 ├── middleware/     # Authentication, authorization, validation
 ├── database/       # Database connection and models
 └── utils/          # Tokens, hashing, encryption, email, error handling
```

This structure separates **business logic, middleware, and utilities**, improving code organization and long-term maintainability.
