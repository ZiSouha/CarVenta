# CarVenta — Frontend Client

Engineered and Built by **Ziane Souhayl**

- **GitHub**: [https://github.com/ZiSouha](https://github.com/ZiSouha)
- **LinkedIn**: [https://www.linkedin.com/in/ziane-souhayl](https://www.linkedin.com/in/ziane-souhayl)
- **Email**: [zianesouhayl@gmail.com](mailto:zianesouhayl@gmail.com)

The frontend application for **CarVenta**, an automotive fleet management and car rental platform. Built with React 19, Vite, and Tailwind CSS v4.

## Features

- **Modern Responsive UI**: Built with React 19 and Tailwind CSS v4.
- **Fleet Discovery & Filtering**: Real-time search by location, category, seats, and price.
- **Interactive Cockpit**: Dynamic vehicle telemetry HUD with animated dashboard dials.
- **Booking Lifecycle**: Reservation flows with Stripe payment integration and status tracking.
- **Owner & Admin Console**: Comprehensive fleet management, booking approvals, damage reports, and real-time live chat via Socket.IO.

## Getting Started

### Prerequisites

- Node.js 18+ (Node.js 20+ recommended)
- npm or yarn

### Installation

```bash
cd client
npm install
```

### Environment Configuration

Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

Configure your environment variables:

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_CURRENCY` | Currency symbol used across the client | `$` |
| `VITE_BASE_URL` | Backend API base URL | `http://localhost:3000` |
| `VITE_STRIPE_PUBLISHABLE_KEY` | Stripe publishable key | `pk_test_...` |

### Development

Start the development server with Hot Module Replacement (HMR):

```bash
npm run dev
```

The application will start on `http://localhost:5173`.

### Production Build

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

### Linting

```bash
npm run lint
```
