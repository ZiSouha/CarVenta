# 🚗 CarVenta — Modern Automotive Fleet & Rental Platform

<div align="center">

### Designed, Engineered & Developed by **Ziane Souhayl**

[![GitHub](https://img.shields.io/badge/GitHub-ZiSouha-181717?style=for-the-badge&logo=github)](https://github.com/ZiSouha)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Ziane_Souhayl-0A66C2?style=for-the-badge&logo=linkedin)](https://www.linkedin.com/in/ziane-souhayl)
[![Email](https://img.shields.io/badge/Email-zianesouhayl%40gmail.com-EA4335?style=for-the-badge&logo=gmail)](mailto:zianesouhayl@gmail.com)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-20+-green.svg)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-19-blue.svg)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38bdf8.svg)](https://tailwindcss.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248.svg)](https://www.mongodb.com/)
[![Stripe](https://img.shields.io/badge/Stripe-Payments-635BFF.svg)](https://stripe.com/)
[![ImageKit](https://img.shields.io/badge/ImageKit-Media_CDN-007FFF.svg)](https://imagekit.io/)
[![Socket.IO](https://img.shields.io/badge/Socket.IO-Realtime-010101.svg)](https://socket.io/)

</div>

---

**CarVenta** is an enterprise-grade car rental and fleet management web platform engineered by **Ziane Souhayl**. Built with a modern full-stack architecture (React 19, Vite, Tailwind CSS v4, Node.js, Express, MongoDB, Socket.IO, ImageKit, Stripe), CarVenta provides real-time vehicle discovery, dynamic telemetry HUDs, automated damage dispute reporting, seamless Stripe checkout, multi-tier role-based access control (RBAC), and a comprehensive administration terminal.

---

## 📋 Table of Contents

- [Architectural Overview](#-architectural-overview)
- [Key Features](#-key-features)
- [Technology Stack](#-technology-stack)
- [Project Structure](#-project-structure)
- [Prerequisites](#-prerequisites)
- [Installation & Quick Start](#-installation--quick-start)
- [Environment Variables](#-environment-variables)
- [Database Seeding & Admin Setup](#-database-seeding--admin-setup)
- [Available Scripts](#-available-scripts)
- [Security & RBAC](#-security--rbac)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🏗 Architectural Overview

CarVenta operates on a modern decoupled architecture:
- **Client (SPA)**: Fast, responsive React 19 single-page application built on Vite and Tailwind CSS v4, featuring spring physics animations via Motion and icons via Lucide React.
- **Server (API)**: High-throughput Node.js / Express REST API and Socket.IO engine with structured MVC patterns, Mongoose ODM schemas, JWT token authorization, and automated media optimization via ImageKit.
- **Database & Storage**: MongoDB database with indexed geospatial coordinates, booking date range overlap detection, and ImageKit CDN asset management.

```
                    ┌────────────────────────┐
                    │  React 19 Vite Client  │
                    │ (Tailwind v4 / Motion) │
                    └───────────┬────────────┘
                                │ HTTP / WebSocket
                                ▼
                    ┌────────────────────────┐
                    │ Express.js + Socket.IO │
                    │     (Node.js API)      │
                    └───────┬────────┬───────┘
                            │        │
             ┌──────────────┴──┐  ┌──┴─────────────┐
             │ MongoDB / Mongoose │ ImageKit Media │
             └─────────────────┘  └────────────────┘
```

---

## ✨ Key Features

### 🚘 Customer Experience & Booking
- **Smart Fleet Discovery**: Filter vehicles by location, category (Luxury, SUV, Electric, Sport), transmission, fuel type, and price range.
- **Interactive Cockpit HUD**: View detailed specs, simulated engine metrics, and digital cockpit telemetry.
- **Frictionless Booking & Availability Engine**: Date-overlap conflict prevention ensuring vehicles cannot be double-booked for confirmed rentals.
- **Secure Stripe Checkout**: Automated rental payment capture with metadata correlation.
- **Automated Damage Reporting**: Upload multi-angle photos with coordinates and severity rankings to safeguard rental disputes.
- **Document & KYC Verification**: Driver's license upload and verification system.

### 🛡 Enterprise Fleet Administration
- **Centralized Admin Terminal**: Real-time revenue analytics, fleet utilization stats, and transaction ledgers.
- **Role-Based Access Control (RBAC)**: Support for `customer`, `owner`, `admin`, and `super-admin` roles with hierarchical permission validation.
- **Dynamic Fleet Management**: Instant vehicle onboarding with image upload, maintenance tracking, and live availability toggling.
- **Real-Time Live Chat**: Two-way communication between customers and operations operators powered by Socket.IO.
- **System Audit Logs**: Traceable event tracking for administrative actions, fleet updates, and security events.

---

## 🛠 Technology Stack

### Frontend
- **Framework**: React 19 (`react`, `react-dom`)
- **Build Tool**: Vite 7
- **Styling**: Tailwind CSS v4 (`@tailwindcss/vite`)
- **Animation**: Motion (`motion/react`)
- **Routing**: React Router DOM v7
- **Icons**: Lucide React
- **Notifications**: React Hot Toast
- **HTTP Client**: Axios

### Backend
- **Runtime**: Node.js (ES Modules, `"type": "module"`)
- **Framework**: Express.js
- **Database**: MongoDB via Mongoose 8
- **Authentication**: JSON Web Tokens (`jsonwebtoken`) & Bcrypt password hashing
- **Real-Time Engine**: Socket.IO 4
- **Media CDN**: ImageKit SDK with Multer multipart processing
- **Payment Gateway**: Stripe SDK (lazy client initialization)
- **Security**: CORS, Dotenv

---

## 📁 Project Structure

```
CarVenta/
├── client/                     # Frontend React 19 application
│   ├── public/                 # Static public assets and favicon
│   ├── src/
│   │   ├── assets/             # Images and local vector assets
│   │   ├── components/         # Reusable UI components (Navbar, Footer, etc.)
│   │   │   └── owner/          # Admin/Owner specific navigation and HUDs
│   │   ├── context/            # Global AppContext and auth state
│   │   ├── pages/              # Public routes (Home, Cars, Booking, etc.)
│   │   │   └── owner/          # Back-office admin views (ManageCars, Analytics, etc.)
│   │   ├── App.jsx             # Main routing registry
│   │   ├── index.css           # Global Tailwind and custom CSS variables
│   │   └── main.jsx            # React root DOM mount
│   ├── .env.example            # Client environment template
│   ├── package.json
│   └── vite.config.js
├── server/                     # Backend Node.js / Express API
│   ├── configs/                # Database and service connection initializers
│   ├── controllers/            # Request handlers (car, booking, user, owner, payment)
│   ├── middleware/             # Auth JWT verification and Multer file upload
│   ├── models/                 # Mongoose schemas (Car, Booking, User, DamageReport, etc.)
│   ├── routes/                 # Express route definitions
│   ├── createSuperAdmin.js     # Script to provision an administrator user
│   ├── seedCars.js             # Fleet database seeder
│   ├── socket.js               # Socket.IO connection and room manager
│   ├── server.js               # Express application entrypoint
│   ├── .env.example            # Server environment template
│   └── package.json
├── .github/                    # CI/CD workflows
│   └── workflows/ci.yml
├── CONTRIBUTING.md             # Contribution guidelines
├── SECURITY.md                 # Vulnerability disclosure policy
├── LICENSE                     # MIT License
└── README.md                   # Repository documentation
```

---

## ⚙️ Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js**: Version 18.x or later (v20+ recommended)
- **npm** or **yarn**
- **MongoDB**: A local MongoDB instance or a free [MongoDB Atlas](https://www.mongodb.com/atlas) cluster URI.
- **ImageKit Account**: Free [ImageKit.io](https://imagekit.io/) account for vehicle photo management.
- **Stripe Account** *(Optional)*: Free [Stripe](https://stripe.com/) account for payment processing in test mode.

---

## 🚀 Installation & Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/CarVenta.git
cd CarVenta
```

### 2. Configure Backend Server

```bash
cd server
npm install
cp .env.example .env
```

Open `server/.env` and fill in your connection credentials (see [Environment Variables](#-environment-variables) below).

### 3. Configure Frontend Client

In a separate terminal window:

```bash
cd ../client
npm install
cp .env.example .env
```

Open `client/.env` and verify the API endpoint matches your backend port.

---

## 🔐 Environment Variables

### Backend (`server/.env`)

```ini
# Server Configuration
PORT=3000
NODE_ENV=development

# Database Configuration
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/carventa?retryWrites=true&w=majority

# Security & Authentication
JWT_SECRET=your_jwt_secret_minimum_32_characters_long

# Media Storage (ImageKit)
IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/your_endpoint_id

# Payment Processing (Stripe)
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key

# Default Administrator Seed Credentials
ADMIN_EMAIL=admin@carventa.com
ADMIN_PASSWORD=your_strong_admin_password_here
```

### Frontend (`client/.env`)

```ini
# Backend API Base URL
VITE_BASE_URL=http://localhost:3000

# Currency Symbol
VITE_CURRENCY=$

# Payment Gateway (Stripe Public Key)
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key
```

---

## 🗄 Database Seeding & Admin Setup

### Create a Super Admin Account

Run the administrative initialization script to provision your root admin user:

```bash
cd server
npm run create-admin
```

You can optionally specify custom credentials on the command line:

```bash
node createSuperAdmin.js admin@example.com MySecurePassword123
```

### Seed Initial Vehicle Fleet

Populate the database with a catalog of premium showcase vehicles:

```bash
cd server
npm run seed:cars
```

---

## 📜 Available Scripts

### Backend (`server/`)

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with auto-reload via `nodemon` |
| `npm start` | Start server in production mode via `node server.js` |
| `npm run create-admin` | Provision initial Super Admin account |
| `npm run seed:cars` | Seed vehicle catalog into MongoDB |

### Frontend (`client/`)

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite development server with Hot Module Replacement (HMR) |
| `npm run build` | Build optimized production bundle to `client/dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | Run ESLint across frontend components |

---

## 🔒 Security & RBAC

- **Role-Based Authorization**: Endpoints are strictly guarded with `userAuth` middleware and role checks (`super-admin`, `admin`, `owner`).
- **Dynamic Administration**: No personal emails or identities are hardcoded. Access is determined purely by the user's authenticated database role.
- **Safe Payment Fallback**: Lazy Stripe initialization ensures the application can run in non-payment development modes without crashing.
- **IDOR Protection**: Damage reports, fleet modifications, and booking statuses verify vehicle ownership before executing modifications.
- **Temporary Upload Cleanup**: Server automatically unlinks local files after streaming uploads to ImageKit.

## 👨‍💻 Author & Lead Architect

* **Creator**: **Ziane Souhayl**
* **GitHub**: [@ZiSouha](https://github.com/ZiSouha)
* **LinkedIn**: [in/ziane-souhayl](https://www.linkedin.com/in/ziane-souhayl)
* **Email**: [zianesouhayl@gmail.com](mailto:zianesouhayl@gmail.com)

---

## 🤝 Contributing

Contributions are welcomed! Please read our [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct, development workflow, and pull request process.

---

## 📄 License & Credits

Copyright © 2026 CarVenta.  
Architected and engineered with passion by **[Ziane Souhayl](https://github.com/ZiSouha)**.  
Licensed under the [MIT License](LICENSE).
