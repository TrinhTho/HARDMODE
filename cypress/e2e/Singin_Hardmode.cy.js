const acc_login = "cypress/fixtures/account_Hardmode.json";
context("Headless browser", () => {
  it("Hardmode create new account", () => {
    cy.visit("https://hardmode.vn");
    cy.get(
      ".menu-item.menu-item-type-post_type.menu-item-object-page.account > a"
    ).click({ multiple: true, force: true });
    cy.contains("Đăng nhập");
    cy.contains("Đăng ký").click();
    cy.contains("Tạo tài khoản");
    cy.readFile(acc_login).then((json) => {
      cy.get("#last_name").clear();
      cy.get("#last_name").type(json.last_name);
      cy.get("#first_name").clear();
      cy.get("#first_name").type(json.first_name);
      cy.contains(json.gender1).click();
      cy.get("#birthday").clear();
      cy.get("#birthday").type(json.birthday);
      cy.get("#email").clear();
      cy.get("#email").type(json.email);
      cy.get("#password").clear();
      cy.get("#password").type(json.password);
    });
    cy.contains("Đăng ký").click();
    cy.contains("Tài khoản của bạn");

    //check account
    cy.contains("Thông tin tài khoản").click();
    cy.readFile(acc_login).then((json) => {
      cy.expect(
        cy
          .get('h2[class="name_account"')
          .should("contain", json.last_name + " " + json.first_name)
      );
      cy.expect(cy.get('p[class="email "]').should("contain", json.email));
    });
    cy.contains("Danh sách địa chỉ").click();
    cy.get(
      "#address_tables > div > div > div > p > span.action_link.action_edit > a > i"
    ).click();
    cy.readFile(acc_login).then((json) => {
      cy.get("#address_address1_1120533731").clear();
      cy.get("#address_address1_1120533731").type(json.address1);
      cy.get("#address_phone_1120533731").clear();
      cy.get("#address_phone_1120533731").type(json.address_phone);
    });
    cy.get("#address_default_address_1120533731").click();
    cy.contains("Cập nhật").click();
  });
});
