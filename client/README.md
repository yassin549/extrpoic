# Aviator Casino - Frontend

This client is a React + TypeScript single-page app for the Aviator game. It integrates with the backend game WebSocket for real-time rounds and NOWPayments for crypto deposits. Demo accounts are simulated and do not interact with payments. Withdrawals are requested in-app but processed manually by the operator. Follow security best practices: do not store secrets in the client.

## Tech Stack

- **Framework**: React + TypeScript (Vite)
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Icons**: lucide-react
- **Animations**: framer-motion
- **Data Fetching**: TanStack Query (react-query)
- **State Management**: Zustand
- **Charts**: recharts
- **E2E Testing**: Cypress

## Getting Started

### Prerequisites

- Node.js (v18+)
- npm

### Installation

1. Clone the repository.
2. Navigate to the `client` directory:
   ```bash
   cd client
   ```
3. Install the dependencies:
   ```bash
   npm install
   ```

### Environment Variables

Create a `.env` file in the `client` directory and add the following variables. These are primarily for connecting to the backend services.

```
VITE_API_BASE_URL=http://localhost:3000/api
VITE_WS_URL=ws://localhost:8080
```

### Running the Development Server

To start the frontend development server, run:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`.

## Design System

- **Colors**:
  - `background`: `#06060A`
  - `primary`: `#4C6FFF` (electric blue)
  - `accent`: `#8A3FFC` (purple)
  - `success`: `#22C55E`
- **Typography**: Inter
- **Spacing**: 8px base unit
- **Corners**: `rounded-2xl` for cards and modals
