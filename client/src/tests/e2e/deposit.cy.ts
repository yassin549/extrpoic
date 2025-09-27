describe('Deposit Flow', () => {
  it('should allow a user to create a deposit invoice', () => {
    // Mock the API response for creating an invoice
    cy.intercept('POST', '/api/payments/invoice', {
      statusCode: 201,
      body: {
        invoice_id: 'test-invoice-123',
        invoice_url: 'https://nowpayments.io/invoice/test-invoice-123',
      },
    }).as('createInvoice');

    cy.visit('/');

    // Open the wallet modal
    cy.get('button').contains('Wallet').click();

    // Open the deposit modal
    cy.get('button').contains('Deposit').click();

    // Create the invoice
    cy.get('button').contains('Create Invoice').click();

    // Wait for the API call to complete
    cy.wait('@createInvoice');

    // Verify that the invoice URL is displayed
    cy.contains('https://nowpayments.io/invoice/test-invoice-123');
  });
});
