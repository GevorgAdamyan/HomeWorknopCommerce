Feature: Making an order

  Scenario Outline: Searching an item, adding it to the cart and completing the order

    Given the user is on the home page
    When the user inserts <item> in searchbar and click on Search button
    And the user clicks on Add to Cart button from the item's page
    And the user navigates to Cart page, agrees with Terms and Conditions and click on Checkout button
    And the user fills the Billing Adress and clicks on Continue button
    And the user selects the Shipping method and clicks on Continue button
    And the user selects the Payment method and clicks on Continue button
    And the user confirms the order and clicks on Continue button
    Then the user see the the success message

    Examples:
        | item               | 
        | "Nokia"            |
        | "Lenovo Thinkpad " |
        | "Digital Storm"    |
        | "Samsung"          |
