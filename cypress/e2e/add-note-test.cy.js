import axios from "axios";
import {
  ADD_NOTE_CONTENT_INPUT_SELECTOR,
  ADD_NOTE_SUBMIT_SELECTOR,
  BASE_API_URL,
  BASE_URL,
  MAIN_PAGE_ADD_GROUP_BUTTON_SELECTOR,
  MAIN_PAGE_ADD_NOTE_BUTTON_SELECTOR,
  NOTE_CONTENT_SELECTOR,
  NOTE_TITLE_SELECTOR
} from '../support/notes-selectors'

const noteMocks1 = require('../fixtures/films-notes-mocks.json')
const noteMocks2 = require('../fixtures/films-notes-mocks.json')

describe('add note tests', () => {
  beforeEach(() => {
    cy.visit(BASE_URL)
  })

  afterEach(() => {
    axios.delete(BASE_API_URL + '/notes')
    cy.wait(10)
  })

  it('[scenario 1] adding new note', () => {
    cy.addGroup(noteMocks1[0])
    cy.addNote(noteMocks1[0])
    cy.get(NOTE_TITLE_SELECTOR).should('be.visible').should('have.text', noteMocks1[0].title)
    cy.get(NOTE_CONTENT_SELECTOR).should('be.visible').should('have.text', noteMocks1[0].content)
  })

  it('[scenario 2] adding new note with new group id', () => {
    cy.addGroup(noteMocks1[0])
    cy.addNote(noteMocks1[0])

    cy.addGroup(noteMocks2[0])
    cy.addNote(noteMocks2[0])
    cy.get(NOTE_TITLE_SELECTOR).should('be.visible').should('have.text', noteMocks2[0].title)
    cy.get(NOTE_CONTENT_SELECTOR).should('be.visible').should('have.text', noteMocks2[0].content)
  })

  it('[scenario 3] adding new note with existing group id', () => {
    cy.addGroup(noteMocks1[0])
    cy.addNote(noteMocks1[0])
    cy.addNote(noteMocks1[0])
    cy.get(NOTE_TITLE_SELECTOR).should('be.visible').first().should('have.text', noteMocks1[0].title)
    cy.get(NOTE_CONTENT_SELECTOR).should('be.visible').first().should('have.text', noteMocks1[0].content)
  })

  it('[scenario 4] adding new note with faulty data', () => {
    cy.get(MAIN_PAGE_ADD_GROUP_BUTTON_SELECTOR).click().type(noteMocks1[0].userId).type('{enter}')
    cy.get(MAIN_PAGE_ADD_NOTE_BUTTON_SELECTOR).click()
    cy.get(ADD_NOTE_CONTENT_INPUT_SELECTOR).type(noteMocks1[0].content)
    cy.get(ADD_NOTE_SUBMIT_SELECTOR).click()
    cy.get(NOTE_TITLE_SELECTOR).should('not.exist')
    cy.get(NOTE_CONTENT_SELECTOR).should('not.exist')
  })
})