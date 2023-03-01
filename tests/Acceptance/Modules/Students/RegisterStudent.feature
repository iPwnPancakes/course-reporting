Feature: Register Student

    Scenario Outline: Teacher should be able to register a Student given valid information
        Given I am a Teacher
        When I go to register a new Student named <name> with email <email>
        Then I should see <name> in the registered Students list

        Examples:
            | name   | email       |
            | Greg   | abc@abc.com |
            | Daniel | abc@abc.com |

    Scenario Outline: Teacher needs to specify a valid name
        Given I am a Teacher
        When I go to register a new Student named <name> with email <email>
        Then I should NOT see <name> in the Student List

        Examples:
            | name   | email       |
            |        | abc@abc.com |
            | Dani3l | abc@abc.com |

    Scenario Outline: Teacher gives invalid email
        Given I am a Teacher
        When I go to register a new Student named <name> with email <email>
        Then I should NOT see <name> in the Student List

        Examples:
            | name  | email |
            | Frank | asdf  |
            | Jeff  | jeff@ |
