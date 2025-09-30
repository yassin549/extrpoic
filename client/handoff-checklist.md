# Frontend Handoff Checklist

This document outlines the key deliverables and instructions for the backend team to integrate the frontend codebase.

## Core Deliverables

- [x] **`src/tokens/`**: `design-tokens.json` and `typography.json` containing all style variables.
- [x] **`src/components/`**: Full React component library with Storybook stories and unit tests.
- [x] **`src/lib/aviator-engine.stub.js`**: The deterministic game simulator used for UI development.
- [x] **`assets/`**: All SVG icons, logos, and other static assets.
- [x] **`tests/`**: Unit and E2E tests for components and critical user flows.
- [x] **`performance-report-template.md`**: Template for running and documenting performance audits.
- [x] **`accessibility-report-template.md`**: Template for running and documenting accessibility audits.
- [x] **`README.md`**: Contains build/run instructions, environment variable definitions, and API contracts.
- [x/`provably_fair.md`**: Explanation and verification script for the provably fair system.
- [ ] **`legal-notice.md`**: Placeholder for legal disclaimers (to be filled by legal team).
- [ ] **`handoff.zip`**: Awaiting final packaging script.

## Integration Instructions

1.  **Environment Variables:** Copy `.env.example` to `.env` and fill in the required backend API endpoints and keys.
2.  **Run the Project:**
    ```bash
    npm install
    npm run dev
    ```
3.  **Replace the Simulator:** See `migration.md` for detailed instructions on replacing the `aviator-engine.stub.js` with a real-time WebSocket connection.
4.  **Review API Contracts:** The `README.md` contains the expected request/response shapes for APIs like `/users/:id/responsible`.

## Next Steps

- [ ] Run a full Lighthouse performance audit and fill out `performance-report.md`.
- [ ] Run a full accessibility audit and fill out `accessibility-report.md`.
- [ ] Complete the `legal-notice.md` with appropriate disclaimers.
- [ ] Finalize and run the `handoff.zip` packaging script.
