Feature: UpdateNote
	As a User,
	I want to update note,
	So I can make changes.

@UpdateNote
Scenario: Modify note
	Given I have note in database
	And I choose this note
	When I make changes
	And I press update button
	Then This note will change

@UpdateNote
Scenario: Modify note with wrong thing
	Given I have note in database
	And I choose this note
	When I make illegal changes
	And I press update button
	Then This note will not change

@UpdateNote
Scenario: Cancel Modifying note
	Given I have note in database
	And I choose this note
	When I make changes
	And I press exit
	Then This note will not change