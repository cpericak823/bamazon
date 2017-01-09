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
            message: "What how much/many would you like to buy?"
        }, {
            type: "confirm",
            message: "Are you sure:",
            name: "confirm",
            default: true
        }])
        //using a promise to wait for the user to return input, then query the database to show the data specific to that item
        .then(function(quantityCheck) {
            databaseQuery();

            //if the user input quantity is less than or equal to the stock_quantity of them item, log purchase and update the database with the new quantity
            if (quantityCheck.quantity <= res[i].stock_quantity) {
                console.log("Congratulations! You just purchased: " + quantityCheck.quantity + " " + res[i].item_name + " for: $" + (res[i].price * quantityCheck.quantity));
                updateQuantity();
            } else if (quantityCheck.quantity > res[i].stock_quantity) {
                console.log("We're sorry, there is not enough of that item. What would you like to do?");
                inquirer.prompt([{
                    name: "action",
                    type: "list",
                    message: "Would you like to buy less of this item, buy a different item, or leave the store?",
                    choices: ["buy less", "buy a different item", "leave store"]
                }]).then(function(nextSteps) {

                });
            }
        });
}

//query the database and check if there are enough quantities of the database
function databaseQuery() {

    var quantityUpdate = connection.query("SELECT item_id,item_name,stock_quantity,price FROM products WHERE ?");
    connection.query(quantityUpdate, { item_id: quantityCheck.item }, function(err, res) {
        for (var i = 0; i < res.length; i++) {
            console.log("ID: " + res[i].item_id + "Item: " + res[i].item_name + " || Quantity: " + res[i].stock_quantity + " || Price: $" + res[i].price);
        }
    });
}

//update the database with the number of quantity left
function updateQuantity() {
    connection.query("UPDATE products SET ? WHERE ?", [{
        stock_quantity: (res[i].stock_quantity - quantityCheck.quantity)
    }, {
        item_name: quantityCheck.item
    }], function(err, res) {
        //console log the number bought and the total price
        console.log("Thanks for your purchase!");

    });
}
//if no:
//console log there isn't enough of that item left
//prompt what would you like to do: buy less, buy another item, or leave store
//if buy less, prompt the quantity to buy, rerun buyItem(){};
//else if buy another item, rerun userPrompt(){};
//else leave store, console log (Thank You, Come again!);
