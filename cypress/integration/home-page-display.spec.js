const store = require('../fixtures/store.json');
const selector = require('../fixtures/selector.json');

describe("Should show correct display of the home page", () => {

    beforeEach(() => {
        cy.visit("/"); // полная ссылка в cypress.json
    });

    it("Should be able to open the main page", () => { // проверка отображения страницы
        cy.contains(store.logoHeader); // получаем текст из элемента
    })

    it("Should show correct number of days", () => {
        cy.get(selector.week).should("have.length", 7); // проверка что таких селекторов 7 шт (7 дней в неделе)
    })

    it("Should show correct number of films", () => {
        cy.get(selector.chooseFilm).should("have.length", 2); // проверка что таких селекторов 2 шт (2 фильма в приложении)
    })
})