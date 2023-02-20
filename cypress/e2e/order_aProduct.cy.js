//Create by Daisy
//Module name: order_a_product.cy.js
Cypress.on("uncaught:exception", (err, runnable) => {
  // vscode unhandled exception on live appeared on 2022-02-22
  if (err.message.includes("Failt to execute Haravan")) {
    return false;
  }
});
import { login, Product } from "../support/lib";

// Module use for testing order a product in Hardmode by Cypress
context("Headless", () => {
  // cy.clearLocalStorage();

  //order sản phẩm from SHOP
  it("Order T-shit from SHOP tab", () => {
    login();
    cy.contains("SHOP").click();

    expect(cy.contains("Tất cả sản phẩm"));

    cy.get("div")
      .should("have.class", "filter-here")
      .then(() => {
        cy.get("div")
          .first()
          .then(() => {});
      });
    //Random int number generator between min and max
    //A random whole number between min and (max - min + 1):
    function getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min);
    }
    // Click random a product
    cy.get(
      "div[class='content-product-list product-list filter clearfix d-flex-wrap']"
    ).within((listing) => {
      const randomNumber = getRandomInt(0, listing.length - 1); //generate a rendom number between 0 and length-1.
      cy.get("div[class='col-md-3 col-sm-6 col-xs-6 pro-loop col-4']")
        .eq(randomNumber)
        .within(() => {
          cy.get("div")
            .first()
            // .eq(randomNumber)
            .within(() => {
              cy.get("div")
                .eq(1)
                .within(() => {
                  cy.get("h2").within(() => {
                    cy.get("a").then(() => {
                      cy.get("a").then(($select) => {
                        //choose an option randomly
                        cy.get("a").click();
                      });
                    });
                  });
                });
            });
        });
    });

    //Select colort
    cy.get("#variant-swatch-0 > div.select-swap").within((listing_color) => {
      const randomColor = getRandomInt(0, listing_color.length - 1);
      cy.get("div")
        .eq(randomColor)
        .within(() => {
          cy.get("input").click({ force: true });
        });
    });
    //Select size
    let randomSize = 0;
    let size_Produce_temp = 0;
    cy.get("#variant-swatch-1 > div.select-swap").within((listing_size) => {
      randomSize = getRandomInt(0, listing_size.length - 1);
      cy.get("div").not('div[class="soldout"]').eq(randomSize).click();
      cy.get("div")
        .eq(randomSize)
        .should("have.attr", "data-value")
        .then((value1) => {
          size_Produce_temp = value1;
        });
    });
    cy.get("#add-to-cart")
      .should("have.attr", "data-id")
      .then((id) => {
        cy.get("#variant-swatch-0 > div:nth-child(2) > span")
          .invoke("text")
          .then((color_text) => {
            cy.writeFile("cypress/fixtures/information_Product.json", {
              product: [id, size_Produce_temp, color_text],
            });
          });
      });
  });
});
