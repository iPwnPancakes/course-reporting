Feature: Create Student

    Scenario: Teacher should be able to create a Student given valid information
        Given I am a Teacher
        When I go to register a new Student named "Greg"
        Then I should see "Greg" in the Student List
