Feature: Authenticate User

    Scenario: People can authenticate themselves
        Given I have not authenticated myself
        And "Daniel" is registered within the system with the password "abc123"
        When I go to authenticate myself as "Daniel" with password "abc123"
        Then I should be authenticated as "Daniel"
