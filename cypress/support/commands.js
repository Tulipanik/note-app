import {
  ADD_NOTE_CONTENT_INPUT_SELECTOR,
  ADD_NOTE_SUBMIT_SELECTOR,
  ADD_NOTE_TITLE_INPUT_SELECTOR,
  MAIN_PAGE_ADD_GROUP_BUTTON_SELECTOR,
  MAIN_PAGE_ADD_NOTE_BUTTON_SELECTOR,
  NOTE_TITLE_SELECTOR,
  ZOOMED_NOTE_CONTENT_SELECTOR,
  ZOOMED_NOTE_TITLE_SELECTOR
} from "../support/notes-selectors";

Cypress.Commands.add("addGroup", (note) => {
    cy.get(MAIN_PAGE_ADD_GROUP_BUTTON_SELECTOR).click().type(note.userId).type('{enter}')
});

Cypress.Commands.add("addNote", (note) => {
  cy.get(MAIN_PAGE_ADD_NOTE_BUTTON_SELECTOR).click()
  cy.get(ADD_NOTE_TITLE_INPUT_SELECTOR).type(note.title)
  cy.get(ADD_NOTE_CONTENT_INPUT_SELECTOR).type(note.content)
  cy.get(ADD_NOTE_SUBMIT_SELECTOR).click()
});

Cypress.Commands.add("addNotes", (notes) => {
  notes.forEach(note => cy.addNote)
});

Cypress.Commands.add("assertAllViewedNotes", (notes) => {
  cy.get(NOTE_TITLE_SELECTOR).each(($el, index, $list) => {
    cy.get(NOTE_TITLE_SELECTOR).eq(index).click()
    cy.get(ZOOMED_NOTE_TITLE_SELECTOR).eq(index).should('be.visible').should('have.text', notes[index].title)
    cy.get(ZOOMED_NOTE_CONTENT_SELECTOR).eq(index).should('be.visible').should('have.text', notes[index].content)
  })
});
