//require mysql and inquirer modules
var mysql = require("mysql");
var inquirer = require("inquirer");

//connect to mysql and once connected display the database
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,

    user: "root",

    password: "tank82391!",
    database: "bamazon_db"
});
connection.connect(function(err) {
    if (err) throw err;
    showDatabase();
    userPrompt();
});
//show database function
function showDatabase() {
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) {
            throw err;
        } else {
            console.log(res);
        }
    });
}
//userprompt function to ask which item and quantity to buy
function userPrompt() {
    inquirer.prompt([{
        name: "item",
        type: "input",
        message: "What is the item ID you would like to buy?"
    }, {
        name: "quantity",
        type: "input",
        message: "How much/many would you like to buy?"
    }, {
        type: "confirm",
        message: "Are you sure:",
        name: "confirm",
        default: true
    }])

    //using a promise to wait for the user to return input, then query the database to show the data specific to that item
    .then(function(quantityCheck) {

        databaseQuery(quantityCheck.item, quantityCheck.quantity);

        //call the updateQuantity function to check the quantity available
        updateQuantity(quantityCheck.quantity);

    }).catch(function(e) {
        console.log(e);
        console.log(e.stack);
    });
}

//query the database and check if there are enough quantities of the database
function databaseQuery(item_id, quantity) {

    var quantityUpdate = "SELECT item_id,product_name,stock_quantity,price FROM products WHERE ?";
    connection.query(quantityUpdate, { item_id: item_id }, function(err, res) {

        //log the response for that item_id
        console.log(res);

        //if the user quantity is less than or equal to the stock quantity, run the updateQuantity function
        if (quantity <= res[0].stock_quantity) {
            updateQuantity(item_id, (res[0].stock_quantity - parseInt(quantity)));

            //if the user quantity is more than the stock quantity, call the notEnoughQuantity function
        } else if (quantity > res[0].stock_quantity) {
            notEnoughQuantity();
        }
    });
}

//update the database with the number of quantity left
function updateQuantity(item_id, newQuantity) {
    connection.query("UPDATE products SET ? WHERE ?", [{
        stock_quantity: newQuantity
    }, {
        item_id: item_id
    }], function(err, res) {
        if (err) {
            console.log(err);
        }
        //console log the number bought and the total price
        console.log("Congratulations! You just purchased: " + quantity + " " + res[0].product_name + " for: $" + (res[0].price * parseInt(quantity)));
    });
}

//create a new function to handle if there isn't enough quantity
function notEnoughQuantity() {
    console.log("Insufficient quantity! We're sorry, there is not enough of that item. What would you like to do?");
    inquirer.prompt([{
            name: "action",
            type: "list",
            message: "Would you like to buy less of this item, buy a different item, or leave the store?",
            choices: ["buy less", "buy a different item", "leave store"]
        }])
        //wait for the user response, and depending on which choice the user picks, provide additional options
        .then(function(nextSteps) {

            //if the user wants to buy less, prompt them a new quantity
            if (nextSteps.action === "buy less") {
                inquirer.prompt([{
                    name: "quantity",
                    type: "input",
                    message: "What how much/many would you like to buy?"
                }])

                //wait for the user input, and then update the table
                .then(function(newPurchase) {
                    updateQuantity();
                });

                //if the user wants to buy a different item, reprompt them
            } else if (nextSteps.action === "buy a different item") {
                userPrompt();

                //otherwise, log the message and exit the applicaton
            } else {
                console.log("Thank you for shopping at Bamazon. Visit us again soon!");
                return false;
            }
        });
}
