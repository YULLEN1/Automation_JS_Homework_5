Feature: Book a seat in the movie app
    Scenario: Should book one seat
        Given user is on "/index.php" page
        When user chooses date
        When user chooses time
        When user chooses 1 row 2 seat
        When user presses button "Забронировать"
        Then user sees a text "Приятного просмотра!"

