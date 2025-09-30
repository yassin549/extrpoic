# Aviator Game - Frontend

This is the complete frontend codebase for the Aviator-style casino game, built with React, Vite, TypeScript, and Tailwind CSS. It includes a full component library, state management, and a deterministic simulator for UI development.

## 1. Getting Started

### Prerequisites

- Node.js (v18+)
- npm

### Installation & Running

1.  **Install Dependencies:**
    ```bash
    npm install
    ```

2.  **Configure Environment:**
    Copy the `.env.example` file to a new file named `.env` and fill in the required environment variables.

3.  **Run Development Server:**
    ```bash
    npm run dev
    ```
    The application will be available at `http://localhost:5173`.

## 2. Key Scripts

-   `npm run dev`: Starts the Vite development server.
-   `npm run build`: Builds the production-ready static assets in the `dist/` folder.
-   `npm run preview`: Serves the production build locally.
-   `npm run storybook`: Starts the Storybook component explorer.
-   `npm test`: Runs all unit tests with Vitest.

## 3. Project Structure

The codebase is organized as follows:

```
/src
  /assets         # SVG icons, logos, etc.
  /components     # Reusable React components (Button, Modal, etc.)
  /hooks          # Custom React hooks (e.g., useMotion)
  /lib            # Core logic (analytics, engine, provably-fair)
  /pages          # Top-level page components (Lobby, AviatorGame, etc.)
  /responsible-gaming # Components for responsible gaming features
  /tokens         # JSON design tokens for colors, typography
  /stories        # Storybook files for each component
  /tests          # E2E and integration tests
```

## 4. Deployment & Operations

-   **Hosting:** The static frontend (`dist/` folder) is optimized for deployment on a CDN like Vercel, Netlify, or AWS S3 + CloudFront.
-   **Real-time Backend:** The UI is designed to connect to a WebSocket server for real-time game state updates. See `migration.md` for instructions on replacing the simulator.
-   **Monitoring:** It is recommended to instrument the frontend with a service like Sentry for error tracking and a product analytics tool for monitoring user behavior.

## 5. Localization (i18n)

-   **Setup:** The project is prepared for internationalization. All UI copy should be extracted into JSON files within an `i18n/` directory.
-   **Structure:**
    ```
    /i18n
      en.json
      fr.json
      ar.json
    ```
-   **Implementation:** Use a library like `i18next` with `react-i18next` to load the appropriate locale based on user preference (from Settings) and wrap all text strings.
-   **RTL Support:** For Right-to-Left languages like Arabic, ensure the layout is flipped. Tailwind CSS has built-in support for RTL using logical properties (e.g., `ms-4` for `margin-start` instead of `ml-4`).
