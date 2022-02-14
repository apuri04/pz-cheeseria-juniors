/// <reference types="cypress" />

context("Cart Actions", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("purchase cheese", () => {
    cy.get("[data-cy=add-to-cart-2]")
      .last()
      .click();
    cy.get("[data-cy=add-to-cart-3]")
      .last()
      .click();
    cy.get("[data-cy=badge-count]").should("have.text", "2");
    cy.get("[data-cy=badge-count]").click();
    //verify drawer is open

    // verify there are 2 items on the cart

    // click purchase button
  });
});
