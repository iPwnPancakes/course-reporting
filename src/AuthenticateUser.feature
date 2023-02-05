Feature: Authenticate User

    Scenario Outline: People can authenticate themselves
        Given I have not authenticated myself yet
        And a Teacher by the name of <user> exists
        When I go to authenticate myself as <user>
        Then I should be authenticated as <user>

        Examples:
            | user   |
            | Daniel |
            | Bob    |
