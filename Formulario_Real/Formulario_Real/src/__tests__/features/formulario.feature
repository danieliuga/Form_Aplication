Feature: A form create for simple data

    Background:
        Given the user open a simple form

    Scenario: Check Formulario
        Then I should see the formulario

    Scenario: Validate the user text at the moment you write it
        Given you write "dani" in "user"
        Then I should see "DANI" in "user"

    Scenario: Validate the name text at the moment you write it
        Given you write "joel" in "name"
        Then I should see "JOEL" in "name"

    Scenario: Validate the surname text at the moment you write it
        Given you write "iuga" in "surname"
        Then I should see "IUGA" in "surname"

    Scenario: Validate the dni text at the moment you write it
        Given you write "49270614z" in "dni"
        Then I should see "49270614Z" in "dni"

    Scenario: press the button 'clear' in user
        Given you press the "clearButton" button
        Then I should see nothing in "user"

    Scenario: press the button 'clear' in name
        Given you press the "clearButton" button
        Then I should see nothing in "name"

    Scenario: press the button 'clear' in surname
        Given you press the "clearButton" button
        Then I should see nothing in "surname"

    Scenario: press the button 'clear' in DNI
        Given you press the "clearButton" button
        Then I should see nothing in "dni"

    Scenario: Validate de dni in the form when you write it
        Given you write "12345678A" in "dni"
        When you press the "submitButton" button
        Then I should see "12345678A" in "dni"

    Scenario: select the 'country' option that is acord to your dni 
        Given you press the "countryButton" button
        Then I should see "Choose a country" in "countryButton"

    Scenario: Manage the error when you don't write anything in user
        Given you write nothing in "user"
        Then I should see "Required" error in input "user-error"

    Scenario: Manage the error when you don't write anything in name
        Given you write nothing in "name"
        Then I should see "Required" error in input "name-error"

    Scenario: Manage the error when you don't write anything in surname
        Given you write nothing in "surname"
        Then I should see "Required" error in input "surname-error"

    Scenario: Manage the error when you don't write anything in dni
        Given you write nothing in "dni"
        Then I should see "Required" error in input "dni-error"

    Scenario Outline: Validate de dni with his correspondent country
        When the user enters "country" on "countryButton"
        And the user enters "<dni>" on "dni"
        Then the "<dni>" should show no message error
        Examples:
            | country   | dni       |
            | España    | 49220078D |
            | Argentina | 12345678  |

    Scenario: manage 'user' error when has the same name as 'name'
        Given you write "DANI" in "user"
        When you write "DANI" in "name"
        Then I should see "User cannot contain name" error in the input "user-error"

    Scenario: manage 'dni' error whe his validation is failed
        Given you write "49270614Y" in "dni"
        Then I should see "DNI validation failed" error in the input "dni-error" 

    