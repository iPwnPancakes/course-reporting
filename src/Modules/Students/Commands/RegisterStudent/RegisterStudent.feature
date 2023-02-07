Feature: Register Student

    Scenario Outline: Teacher should be able to register a Student given valid information
        Given I am a Teacher
        When I go to register a new Student named <name>
        Then I should see <name> in the Student List

        Examples:
            | name   |
            | Greg   |
            | Daniel |

    Scenario Outline: Teacher needs to specify a valid name
        Given I am a Teacher
        When I go to register a new Student named <name>
        Then I should NOT see <name> in the Student List

        Examples:
            | name   |
            |        |
            | Dani3l |
