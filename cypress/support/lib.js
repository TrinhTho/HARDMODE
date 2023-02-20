// support log in Hardmode
const acc_login = "cypress/fixtures/account_Hardmode.json";

export function login() {
  context("Headless browser", () => {
    // it("Hardmode login", () => {
    cy.visit("https://hardmode.vn");
    cy.get(
      ".menu-item.menu-item-type-post_type.menu-item-object-page.account > a"
    ).click({ multiple: true, force: true });
    expect(cy.contains("Đăng nhập"));
    cy.readFile(acc_login).then((json) => {
      cy.get("#customer_email").type(json.email);
      cy.get("#customer_password").type(json.password);
    });
    cy.get(
      "#customer_login > div.clearfix.action_account_custommer > div.action_bottom.button.dark > input"
    ).click();
    expect(cy.contains("Tài khoản của bạn"));
    // });
  });
}

// //name, size, quantity
// export const Product = [
//   ["HMS TEE", ]
// ]
