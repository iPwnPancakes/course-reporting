Feature: Create Student

    Scenario Outline: Teacher should be able to create a Student given valid information
        Given I am a Teacher
        When I go to register a new Student named <name>
        Then I should see <name> in the Student List

        Examples:
            | name |
            | Greg |
