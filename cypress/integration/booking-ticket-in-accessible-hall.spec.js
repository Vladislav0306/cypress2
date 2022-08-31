const login = require('../fixtures/login.json');
const store = require('../fixtures/store.json');
const selector = require('../fixtures/selector.json');

describe("Should login admin page", () => {

    beforeEach(() => {
        cy.visit("/admin"); // полная ссылка в cypress.json
    });

    it("Should be able to open the login page", () => {
        cy.contains(store.adminForEqual).should("be.visible"); // получаем текст из элемента на странице входа
    })

    it("Should be able to login with correct email and password", () => { // логин с корректными данными
        cy.login(login.login1, login.password1);
        cy.contains(store.deskForEqual).should("be.visible");
    })


    it("Should find a hall that sells tickets", () => {
        cy.login(login.login1, login.password1);
        cy.contains(store.deskForEqual).should("be.visible");
        cy.get(selector.hallOpening).contains(store.nameHall); // получаем название зала с открытой продажей билетов
    })

})

describe("Should book a seat in the hall", () => {

    beforeEach(() => {
        cy.visit("/"); // полная ссылка в cypress.json
    });

    it("Should choose a date", () => {
        cy.get(selector.chooseTimeSession).click();
    })

    it("Should choose a time", () => {
        cy.get(selector.chooseTimeSession).click();
        cy.get(selector.chooseFilm).contains(store.timeSession).click();
        cy.contains(store.timeSessionForEqual).should("be.visible");
    })

    it("Should choose аnd book a seat", () => {
        cy.get(selector.chooseTimeSession).click();
        cy.get(selector.chooseFilm).contains(store.timeSession).click();
        cy.get(selector.chooseChair).click();
        cy.get(selector.pushButton).click(); // кликаем по кнопке Забронировать
        cy.url().should('include', '/client/payment.php')
        cy.get(selector.pushButton).click(); // кликаем по кнопке Получить код бронирования
        cy.contains(store.takeTicket).should("be.visible");
    })
})


