import {
  ADD_NOTE_CONTENT_INPUT_SELECTOR,
  ADD_NOTE_SUBMIT_SELECTOR,
  ADD_NOTE_TITLE_INPUT_SELECTOR,
  DELETE_NOTE_SUBMIT_SELECTOR,
  MAIN_PAGE_ADD_GROUP_BUTTON_SELECTOR,
  MAIN_PAGE_ADD_NOTE_BUTTON_SELECTOR, NOTE_CONTENT_SELECTOR,
  NOTE_TITLE_SELECTOR, SEARCH_NOTE_FIND_BUTTON_SELECTOR, SEARCH_NOTE_ID_INPUT_SELECTOR,
  ZOOMED_NOTE_CONTENT_SELECTOR,
  ZOOMED_NOTE_EXIT_SELECTOR,
  ZOOMED_NOTE_TITLE_SELECTOR
} from "../support/notes-selectors";
import notes1 from "../fixtures/series-notes-mocks.json";

Cypress.Commands.overwrite('visit', (originalFn, url, options) => {
  originalFn({url, failOnStatusCode: false, ...options});
  cy.wait(50)
});

Cypress.Commands.add("addGroup", (note) => {
    cy.get(MAIN_PAGE_ADD_GROUP_BUTTON_SELECTOR).click().type(note.userId).type('{enter}')
  cy.wait(20)
});

Cypress.Commands.add("addNote", (note) => {
  cy.get(MAIN_PAGE_ADD_NOTE_BUTTON_SELECTOR).click()
  cy.get(ADD_NOTE_TITLE_INPUT_SELECTOR).type(note.title)
  cy.get(ADD_NOTE_CONTENT_INPUT_SELECTOR).type(note.content)
  cy.get(ADD_NOTE_SUBMIT_SELECTOR).click()
  cy.wait(20)
});

Cypress.Commands.add("addNotes", (notes) => {
  notes.forEach(note => cy.addNote(note))
});

Cypress.Commands.add("assertAllViewedNotes", (notes) => {
  cy.get(NOTE_TITLE_SELECTOR).each(($el, index, $list) => {
    cy.get(NOTE_TITLE_SELECTOR).eq(index).click()
    cy.get(ZOOMED_NOTE_TITLE_SELECTOR).should('be.visible').find('input').invoke('val').should('equal', notes[index].title)
    cy.get(ZOOMED_NOTE_CONTENT_SELECTOR).should('be.visible')
    cy.get(ZOOMED_NOTE_EXIT_SELECTOR).click()
    cy.wait(100)
  })
});

Cypress.Commands.add("deleteAllNotes", (notes) => {
  cy.wait(200)
  cy.get(NOTE_TITLE_SELECTOR).each(($el, index, $list) => {
    cy.get(NOTE_TITLE_SELECTOR).eq(0).click()
    cy.get(DELETE_NOTE_SUBMIT_SELECTOR).click()
    cy.wait(100)
  })
});

Cypress.Commands.add("findNoteAndAssert", (note, id) => {
  cy.get(SEARCH_NOTE_ID_INPUT_SELECTOR).should('be.visible').click().type('{selectAll}').type('{backspace}').type(id)
  cy.get(SEARCH_NOTE_FIND_BUTTON_SELECTOR).should('be.visible').click()

  cy.get(NOTE_TITLE_SELECTOR).should('be.visible').should('have.text', note.title)
  cy.get(NOTE_CONTENT_SELECTOR).should('be.visible').should('have.text', note.content)
  cy.wait(20)
})
