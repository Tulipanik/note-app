import {
  BASE_API_URL,
  BASE_URL, NOTE_CONTENT_SELECTOR,
  NOTE_SEARCH_SELECTOR,
  NOTE_TITLE_SELECTOR,
  SEARCH_NOTE_FIND_BUTTON_SELECTOR,
  SEARCH_NOTE_ID_INPUT_SELECTOR,
  ZOOMED_NOTE_CONTENT_SELECTOR,
  ZOOMED_NOTE_EXIT_SELECTOR,
  ZOOMED_NOTE_ID_SELECTOR,
  ZOOMED_NOTE_TITLE_SELECTOR
} from '../support/notes-selectors'
import axios from "axios";

const notes1 = require('../fixtures/series-notes-mocks.json')
const group1 = notes1[0].userId

const notes2 = require('../fixtures/films-notes-mocks.json')
const group2 = notes2[0].userId

let ids1 = []
let ids2 = []

before(() => {
  cy.visit(BASE_URL)
  cy.wait(100)
  cy.addGroup(notes1[0])
  cy.addGroup(notes2[0])
  cy.visit(BASE_URL + '/notes?group=' + group1)
  cy.addNotes(notes1)
  cy.get(NOTE_TITLE_SELECTOR).each(($el, index, $list) => {
    cy.get(NOTE_TITLE_SELECTOR).eq(index).click()
    cy.get(ZOOMED_NOTE_ID_SELECTOR).then(($el) => {
        ids1.push($el.text())
    })
    cy.get(ZOOMED_NOTE_EXIT_SELECTOR).click()
  })
  cy.visit(BASE_URL + '/notes?group=' + group2)
  cy.addNotes(notes2)
  cy.get(NOTE_TITLE_SELECTOR).each(($el, index, $list) => {
    cy.get(NOTE_TITLE_SELECTOR).eq(index).click()
    cy.get(ZOOMED_NOTE_ID_SELECTOR).then(($el) => {
      ids2.push($el.text())
    })
    cy.get(ZOOMED_NOTE_EXIT_SELECTOR).click()
  })
  cy.wait(100)

  cy.log("Ids1: ", ids1)
  cy.log("Ids2: ", ids2)
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

    it('[scenario 1] visit find by id page', () => {
        cy.get(NOTE_SEARCH_SELECTOR).should('be.visible').click()
        cy.get(SEARCH_NOTE_ID_INPUT_SELECTOR).should('be.visible')
        cy.get(SEARCH_NOTE_FIND_BUTTON_SELECTOR).should('be.visible')
    })

  it('[scenario 2] find note', () => {
    cy.visit(BASE_URL + '/findById')
    cy.findNoteAndAssert(notes1[0], ids1[0])
  })

  it('[scenario 3] find many notes', () => {
    cy.visit(BASE_URL + '/findById')
    notes1.forEach((note, index) => {
      cy.findNoteAndAssert(note, ids1[index])
    })
    notes2.forEach((note, index) => {
      cy.findNoteAndAssert(note, ids2[index])
    })
  })

  it('[scenario 4] find note not existing in db', () => {
    cy.visit(BASE_URL + '/findById')
    cy.get(SEARCH_NOTE_ID_INPUT_SELECTOR).should('be.visible').click().type(Number(ids1[0]) - 1)
    cy.get(SEARCH_NOTE_FIND_BUTTON_SELECTOR).should('be.visible').click()
    cy.wait(100)
    cy.get(NOTE_TITLE_SELECTOR).should('not.exist')
    cy.get(NOTE_CONTENT_SELECTOR).should('not.exist')
  })
})