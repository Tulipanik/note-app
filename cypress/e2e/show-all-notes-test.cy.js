import {
    BASE_API_URL,
    BASE_URL, NOTE_ALL_SELECTOR, NOTE_CONTENT_SELECTOR, NOTE_SEARCH_SELECTOR, NOTE_TITLE_SELECTOR,
    SEARCH_NOTE_FIND_BUTTON_SELECTOR,
    SEARCH_NOTE_ID_INPUT_SELECTOR
} from '../support/notes-selectors'
import axios from "axios";

const notes1 = require('../fixtures/series-notes-mocks.json')
const group1 = notes1[0].userId

const notes2 = require('../fixtures/films-notes-mocks.json')
const group2 = notes2[0].userId

before(() => {
  cy.visit(BASE_URL)
  cy.wait(100)
  cy.addGroup(notes1[0])
  cy.addGroup(notes2[0])
  cy.visit(BASE_URL + '/notes?group=' + group1)
  cy.addNotes(notes1)
  cy.visit(BASE_URL + '/notes?group=' + group2)
  cy.addNotes(notes2)
  cy.wait(100)
})

after(() => {
  axios.delete(BASE_API_URL + '/notes')
})

describe('search note tests', () => {
    beforeEach(() => {
        cy.visit(BASE_URL)
        cy.wait(100)
    })

    afterEach(() => {
    })

    it('[scenario 1] visit all notes page', () => {
        cy.get(NOTE_ALL_SELECTOR).should('be.visible').click()
        cy.get(NOTE_TITLE_SELECTOR).should('be.visible')
        cy.get(NOTE_CONTENT_SELECTOR).should('be.visible')
    })

  it('[scenario 2] show all notes', () => {
    cy.visit(BASE_URL + '/notes')
      cy.get(NOTE_TITLE_SELECTOR).should('be.visible').should('have.length', notes1.length + notes2.length)
      cy.get(NOTE_CONTENT_SELECTOR).should('be.visible').should('have.length', notes1.length + notes2.length)
  })

    it('[scenario 2] show all notes when there is nothing in db', () => {
        axios.delete(BASE_API_URL + '/notes')
        cy.wait(100)
        cy.visit(BASE_URL + '/notes')
        cy.get(NOTE_TITLE_SELECTOR).should('not.exist')
        cy.get(NOTE_CONTENT_SELECTOR).should('not.exist')
    })
})