import axios from "axios";
import {
  BASE_API_URL,
  BASE_URL,
  MODIFY_NOTE_SUBMIT_SELECTOR,
  NOTE_CONTENT_SELECTOR,
  NOTE_TITLE_SELECTOR,
  ZOOMED_NOTE_CONTENT_SELECTOR,
  ZOOMED_NOTE_TITLE_SELECTOR
} from '../support/notes-selectors'

const notes1 = require('../fixtures/series-notes-mocks.json')
const group1 = notes1[0].userId

const notes2 = require('../fixtures/films-notes-mocks.json')
const group2 = notes2[0].userId

describe('modify note tests', () => {
  beforeEach(() => {
    cy.visit(BASE_URL)
    notes1.forEach(note => {
      cy.request('POST', BASE_API_URL + '/notes', note).wait(3)
    })
    cy.visit(BASE_URL + '/notes?group=' + group1)
  })

  afterEach(() => {
    axios.delete(BASE_API_URL + '/notes')
    cy.wait(10)
  })

  it('[scenario 1] modifying 1 note', () => {
    const newTitle = 'new title'
    const newContent = 'new content'
    cy.get(NOTE_TITLE_SELECTOR).eq(0).click()
    cy.get(ZOOMED_NOTE_TITLE_SELECTOR).type(newTitle)
    cy.get(ZOOMED_NOTE_CONTENT_SELECTOR).type(newContent)
    cy.get(MODIFY_NOTE_SUBMIT_SELECTOR).click()
    cy.get(NOTE_TITLE_SELECTOR).eq(0).should('be.visible').should('have.text', newTitle)
    cy.get(NOTE_CONTENT_SELECTOR).eq(0).should('be.visible').should('have.text', newContent)
  })

  it('[scenario 2] modifying note not existing in db', () => {
    cy.get(NOTE_TITLE_SELECTOR).eq(notes1.length).should('not.exist')
  })

  it('[scenario 3] modifying note with faulty data', () => {
    const newTitle = ''
    const newContent = 'new content'
    cy.get(NOTE_TITLE_SELECTOR).eq(0).click()
    cy.get(ZOOMED_NOTE_TITLE_SELECTOR).type(newTitle)
    cy.get(ZOOMED_NOTE_CONTENT_SELECTOR).type(newContent)
    cy.get(MODIFY_NOTE_SUBMIT_SELECTOR).click()
    cy.get(ZOOMED_NOTE_TITLE_SELECTOR).should('be.visible').should('have.text', newTitle)
    cy.get(ZOOMED_NOTE_CONTENT_SELECTOR).should('be.visible').should('have.text', newContent)
  })

})