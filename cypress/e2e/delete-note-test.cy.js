const notes1 = require('../fixtures/series-notes-mocks.json')
const group1 = notes1[0].userId

const notes2 = require('../fixtures/films-notes-mocks.json')
const {
    NOTE_TITLE_SELECTOR,
    BASE_URL,
    ZOOMED_NOTE_TITLE_SELECTOR,
    ZOOMED_NOTE_CONTENT_SELECTOR,
    MODIFY_NOTE_SUBMIT_SELECTOR,
    NOTE_CONTENT_SELECTOR, DELETE_NOTE_SUBMIT_SELECTOR, BASE_API_URL
} = require("../support/notes-selectors");
const axios = require("axios");
const group2 = notes2[0].userId

describe('delete note tests', () => {
    beforeEach(() => {
        cy.visit(BASE_URL)
        cy.wait(100)
    })

    afterEach(() => {
        axios.delete(BASE_API_URL + '/notes')
        cy.wait(100)
    })

    it('[scenario 1] deleting note', () => {
        cy.addGroup(notes2[0])
        cy.addNote(notes2[0])
        cy.wait(100)
        cy.visit(BASE_URL + '/notes?group=' + group2)
        cy.wait(100)
        cy.get(NOTE_TITLE_SELECTOR).eq(0).click()
        cy.get(DELETE_NOTE_SUBMIT_SELECTOR).click()
        cy.wait(100)
        cy.get(NOTE_TITLE_SELECTOR).should('not.exist')
        cy.get(NOTE_CONTENT_SELECTOR).should('not.exist')
    })

    it('[scenario 2] deleting note not existing in db', () => {
        cy.get(NOTE_TITLE_SELECTOR).should('not.exist')
    })

    it('[scenario 3] deleting many notes', () => {
        cy.addGroup(notes1[0])
        cy.addNotes(notes1)
        cy.wait(100)
        cy.visit(BASE_URL + '/notes?group=' + group1)
        cy.wait(300)
        cy.deleteAllNotes(notes1)
        cy.wait(100)
        cy.get(NOTE_TITLE_SELECTOR).should('not.exist')
    })

    it('[scenario 4] deleting notes from different groups', () => {
        cy.addGroup(notes1[0])
        cy.addNotes(notes1)
        cy.wait(100)

        cy.addGroup(notes2[0])
        cy.addNotes(notes2)
        cy.wait(100)

        cy.visit(BASE_URL + '/notes?group=' + group1)
        cy.wait(100)
        cy.deleteAllNotes(notes1)
        cy.wait(100)
        cy.get(NOTE_TITLE_SELECTOR).should('not.exist')

        cy.visit(BASE_URL + '/notes?group=' + group2)
        cy.wait(100)
        cy.deleteAllNotes(notes2)
        cy.wait(100)
        cy.get(NOTE_TITLE_SELECTOR).should('not.exist')
    })

})