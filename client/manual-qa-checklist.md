# Manual QA Checklist

## Responsive Design

- [ ] **320px (iPhone SE):** Open the site in a 320px wide viewport. Verify no horizontal overflow occurs. All text should be readable and all buttons tappable.
- [ ] **768px (iPad Mini):** Open the site in a 768px wide viewport. Verify the layout adapts correctly. Game canvas should be clearly visible.
- [ ] **1200px (Desktop):** Open the site on a standard desktop resolution. Verify all elements are well-spaced and the layout is balanced.

## Keyboard Navigation

- [ ] **Full Tab-through:** Starting from the browser's address bar, press the `Tab` key repeatedly. Ensure every interactive element (links, buttons, inputs) receives focus in a logical order.
- [ ] **Focus Visibility:** Confirm that every focused element has a clearly visible focus ring (the default blue outline).
- [ ] **Place Bet via Keyboard:** Navigate to the BetBox input, enter an amount, tab to the "Place Bet" button, and press `Enter` or `Space`. Confirm the bet is placed.
- [ ] **Cash Out via Keyboard:** While a round is flying with an active bet, tab to the "Cash Out" button and press `Enter` or `Space`. Confirm the cash out occurs.
- [ ] **Modal Navigation:** Open a modal (e.g., Wallet). Confirm that `Tab` cycles only through the elements within the modal (focus trap). Press `Escape` to close the modal.

## Feature-Specific Checks

- [ ] **Reduced Motion:** Go to Settings and enable the "Reduced Motion" toggle. Navigate back to the game. Confirm that the plane no longer animates across the screen and that crash/win effects are replaced with simple fades or color flashes.
- [ ] **Sound Off:** Go to Settings and disable sound. Confirm that no game sounds are audible.
- [ ] **Provably Fair:** After a round completes, find the round ID and hash. Verify that a link or button exists to view the provably-fair verification details.
- [ ] **Chat Input:** Send a message in the chat. Verify it appears correctly. Try to send an empty message and confirm it does not work.
- [ ] **Deposit Flow:** Open the Wallet, go to the Deposit tab. Confirm the QR code is visible and the copy button works, showing a success toast.
