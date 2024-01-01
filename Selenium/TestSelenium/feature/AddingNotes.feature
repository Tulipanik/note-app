Feature: AddingNotes
	As a User,
	I want to add notes,
	So I can save it.

@AddingNotes
Scenario: Add one note
	Given I fullfill note forms
	When I press add
	Then New notes will popup

@AddingNotes
Scenario: Add note without name
	Given I fullfill note forms without name
	When I press add
	Then Error popup display

@AddingNotes
Scenario: Add note without groupId
	Given I fullfill note forms without groupId
	When I press add
	Then Error popup display

@AddingNotes
Scenario: Add one note in existing group
	Given I have note in this group
	And I fullfill note forms
	When I press add
	Then New notes will popup
	And There will be 2 note

@AddingNotes
Scenario: Add one note in no existing group
	Given I not have note in this group
	And I fullfill note forms
	When I press add
	Then New notes will popup
	And There will be 1 note
