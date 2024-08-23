Feature: Book a seat in the movie app
    Scenario: Should book one seat
        Given user is on "/index.php" page
        When user chooses date
        When user chooses time
        When user chooses 6 row 5 seat
        When user presses a booking button
        Then user sees a text "Вы выбрали билеты:"

    Scenario: Should book two seats
        Given user is on "/index.php" page
        When user chooses date
        When user chooses time
        When user chooses 7 row 4 seat
        When user chooses 7 row 5 seat
        When user presses a booking button
        Then user sees a text "Вы выбрали билеты:"

    Scenario: Should try to book unavailable ticket, but unsuccessfully
        Given user is on "/index.php" page
        When user chooses date
        When user chooses time
        When user chooses 8 row 4 seat - unavailable seat
        Then button for booking is inactive "true"
