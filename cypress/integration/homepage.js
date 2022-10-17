describe("Render home page", () => {
    beforeEach(() => {
        cy.visit("/");
    });
    it("renders correctly", () => {
        cy.visit("/");
        cy.get(".auth-wrapper").should("exist");
        cy.get("#userName").type("sivaleela.chamarthi@gmail.com");
        cy.wait(4000);
        cy.get("#password").type("password12");
        cy.wait(4000);
        cy.get("#loginSubmit").click();
    })
})