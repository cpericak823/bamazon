# Bamazon
**Description:** a backend application similar to Amazon that uses Node.Js and MySql.

**Use:** Take user input to query the Products database and allow the user to purchse items based on ID as long as they request an amount less than or equal to the stock quantity in the database. If the user request more of an item than is available, the user will be prompted to buy a different item or leave the store. If they choose to buy a different item, the application will restart.

## See it in action:

### When You Buy Enough Quantity

![Enough Quantity](http://i.imgur.com/jXUk9Tu.jpg)

1. Run the file using node *file_name.js*
2. Node will display the mysql database as a table
3. The user is prompted to type a number related to the an item_id in the database
4. Once the user responds, they are then prompted to type a number of quantity
5. The user is then asked to confirm their selection
5. If the user quantity input is less than or equal the stock quantity in the database, Node will log that the user purchased the number of items and the total cost

### When You Buy More Quantity Than Is Available, and Choose to Buy A Different Item

![NotEnoughQuantity_BuyMore](http://i.imgur.com/PEuA5eQ.jpg)

1. Run the file usine node *file_name.js*
2. Node will display the mysql database as a table
3. The user is prompted to type a number related to the an item_id in the database
4. Once the user responds, they are then prompted to type a number of quantity
5. If the user quantity input is more than the stock quantity in the database, Node will log that there is not enough quantity for that item and reprompt the user if they want to buy a different item or leave the store
6. If the user selects buy a different item, the user is reprompted for the item id, quantity, and to confirm
7. If the user quantity input is less than or equal the stock quantity in the database, Node will log that the user purchased the number of items and the total cost

### When You Buy More Quantity Than Is Available, and Choose to Buy A Different Item

![NotEnoughQuantity_LeaveStore](http://i.imgur.com/ixqGbyG.jpg)

1. Run the file usine node *file_name.js*
2. Node will display the mysql database as a table
3. The user is prompted to type a number related to the an item_id in the database
4. Once the user responds, they are then prompted to type a number of quantity
5. If the user quantity input is more than the stock quantity in the database, Node will log that there is not enough quantity for that item and reprompt the user if they want to buy a different item or leave the store
6. If the user selects leave store, Node will log that the user has left the store


