Feature: DeleteNote
	As a User,
	I want to delete note,
	So I can remove pointless notes.

@DeleteNote
Scenario: Delete note
	Given I have one note in database
	And I choose note
	When I press delete button
	Then This note will disappear change

@DeleteNote
Scenario: Cancel Deleting note
	Given I have one note in database
	And I choose note
	When I press exit button
	Then This note will stay