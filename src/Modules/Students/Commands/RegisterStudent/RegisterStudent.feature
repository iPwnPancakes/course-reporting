Feature: Register Student

  Scenario Outline: Teacher should be able to register a Student given valid information
    Given the RegisterStudent handler
    When I register a Student named <name> with email <email>
    Then I should get back a Student named <name> with email <email>

    Examples:
      | name   | email       |
      | Greg   | abc@abc.com |
      | Daniel | abc@abc.com |

  Scenario Outline: Teacher needs to specify a valid name
    Given the RegisterStudent handler
    When I register a Student named <name> with email <email>
    Then I should get back an error

    Examples:
      | name   | email       |
      |        | abc@abc.com |
      | Dani3l | abc@abc.com |

  Scenario Outline: Teacher gives invalid email
    Given the RegisterStudent handler
    When I register a Student named <name> with email <email>
    Then I should get back an error

    Examples:
      | name  | email |
      | Frank | asdf  |
      | Jeff  | jeff@ |

  Scenario Outline: Teacher tries to register an already registered student
    Given the RegisterStudent handler
    And a Student with name <name> and email <email> is already registered
    When I register a Student named <name> with email <email>
    Then I should get back an error

    Examples:
      | name   | email         |
      | Leffen | asdf@asdf.com |
      | Armada | gg@gg.com     |

  Scenario: Send email when student is registered
    Given the RegisterStudent handler
    When I register a Student named Daniel with email farquaad@shrek.com
    Then an email should be sent
