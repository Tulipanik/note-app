import axios from "axios";
import {BASE_API_URL, BASE_URL, NOTE_CONTENT_SELECTOR, NOTE_TITLE_SELECTOR} from '../support/notes-selectors'

const notes1 = require('../fixtures/series-notes-mocks.json')
const group1 = notes1[0].userId

const notes2 = require('../fixtures/films-notes-mocks.json')
const group2 = notes2[0].userId

describe('delete note tests', () => {
  beforeEach(() => {
    cy.visit(BASE_URL)
    // cy.addGroup(notes1[0])
  })

  afterEach(() => {
    axios.delete(BASE_API_URL + '/notes')
    cy.wait(10)
  })

  it('[scenario 1] showing all note with full db', () => {
    notes1.forEach(note => {
      cy.request('POST', BASE_API_URL + '/notes', note).wait(3)
    })
    cy.visit(BASE_URL + '/notes?group=' + group1)
    cy.assertAllViewedNotes(notes1)
    })

  it('[scenario 2] showing all note with no data in db', () => {
    cy.visit(BASE_URL + '/notes?group=' + group1)
    cy.get(NOTE_TITLE_SELECTOR).should('not.exist')
    cy.get(NOTE_CONTENT_SELECTOR).should('not.exist')
  })

  it('[scenario 3] showing all note with different groups', () => {
    notes1.forEach(note => {
      cy.request('POST', BASE_API_URL + '/notes', note).wait(3)
    })
    cy.visit(BASE_URL + '/notes?group=' + group1)
    cy.assertAllViewedNotes(notes1)

    notes2.forEach(note => {
      cy.request('POST', BASE_API_URL + '/notes', note).wait(3)
    })
    cy.visit(BASE_URL + '/notes?group=' + group2)
    cy.assertAllViewedNotes(notes2)
  })

})