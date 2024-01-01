Feature: SearchNoteByGroup
	As a User,
	I want to search note by group,
	So i can organised it.

@SearchNoteByGroup
Scenario: There is only one group
	Given I have 3 notes within same group
	When I enter find by group
	Then I will see 3 notes

@SearchNoteByGroup
Scenario: There is multiple group
	Given I have 3 notes with different groups
	When I enter find by group
	Then I will see 1 notes

@SearchNoteByGroup
Scenario: There is no notes within one group
	Given I have 0 notes within same group
	When I enter find by group
	Then I will see 0 notes
