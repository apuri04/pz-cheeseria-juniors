/// <reference types="cypress" />

context("Cart Actions", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("Add items to cart", () => {
    cy.get("[data-cy=add-to-cart-2]")
      .last()
      .click();
    cy.get("[data-cy=add-to-cart-3]")
      .last()
      .click();
    cy.get("[data-cy=add-to-cart-4]")
      .last()
      .click();
    cy.get("[data-cy=badge-count]").should("have.text", "3");
  });
});
