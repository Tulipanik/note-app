Feature: DisplayNote
	As a User,
	I want to display note,
	So I get information in it.

@DisplayNote
Scenario: There is note forms
	Given I enter find by id
	When I check forms
	Then It will appear

@DisplayNote
Scenario: Note is in database
	Given There is a note in database
	And I enter find by id
	When I write id and click find
	Then I will see 1 note

@DisplayNote
Scenario: Search many notes
	Given There is notes in database
	And I enter find by id
	When I write id and click find
	Then I will see 1 note
	And When I write another id and click find
	And I will find another note

@DisplayNote
Scenario: Note is not in database
	Given There is not a note in database
	And I enter find by id
	When I write id and click find
	Then I will see 0 note
