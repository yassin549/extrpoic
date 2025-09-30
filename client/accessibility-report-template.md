# Accessibility Audit Report (WCAG 2.1 AA)

**Date:** `YYYY-MM-DD`
**Auditor:** `Your Name`

## 1. Audit Scope

- **Pages Audited:** `e.g., Landing, AviatorGame, Settings`
- **Tools Used:** `e.g., Axe DevTools, WAVE, VoiceOver (macOS), NVDA (Windows)`

## 2. Summary of Findings

| Category                 | Status (Pass/Fail) |
|--------------------------|--------------------|
| Color Contrast           |                    |
| Keyboard Navigation      |                    |
| ARIA Attribute Usage     |                    |
| Screen Reader Experience |                    |
| Reduced Motion           |                    |

## 3. Detailed Findings & Remediation Steps

### Color Contrast

| Element | Failing Contrast Ratio | Recommendation | Owner |
|---------|------------------------|----------------|-------|
| `e.g., .text-mid-gray on #0B0E14` | `e.g., 3.5:1` | `e.g., Increase text color lightness` | `@username` |

### Keyboard Navigation

| Issue | Location | Recommendation | Owner |
|-------|----------|----------------|-------|
| `e.g., Focus is not trapped in modal` | `e.g., WalletModal` | `e.g., Implement focus-trap library` | `@username` |
| `e.g., Focus order is illogical` | `e.g., Settings Page` | `e.g., Reorder DOM elements` | `@username` |

### ARIA Attributes

| Issue | Location | Recommendation | Owner |
|-------|----------|----------------|-------|
| `e.g., Button is missing aria-label` | `e.g., IconButton` | `e.g., Add mandatory aria-label prop` | `@username` |
| `e.g., Live region not announcing updates` | `e.g., GameCanvas multiplier` | `e.g., Add sr-only div with aria-live` | `@username` |

### Screen Reader Walkthrough

**Scenario:** `e.g., Placing a bet`

**Findings:**
- `e.g., The screen reader does not announce when the betting window closes.`
- `e.g., The current multiplier value is not read out during flight.`

**Recommendation:**
- `e.g., Use an aria-live region to announce game state changes.`
