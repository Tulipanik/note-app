Feature: DisplayAll
	As a User,
	I want to display all notes,
	So I can see them

@DisplayAll
Scenario: Displaying all notes
	Given In database are 3 notes
	When I click display all
	Then 3 notes will display

@DisplayAll
Scenario: Displaying all notes with empty database
	Given In database are 0 notes
	When I click display all
	Then 0 notes will display

@DisplayAll
Scenario: Displaying all notes with different groupID
	Given In database are 3 notes, 2 with Stud groupID and 1 with Prof
	When I click display all
	Then 3 notes will display