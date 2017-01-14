//require npm packages modules
var mysql = require("mysql");
var inquirer = require("inquirer");
var prettyjson = require("prettyjson");

//set the colors for the json object
var jsonColor = {
    keysColor: 'gray',
    stringColor: "white",
    numberColor: "white"
};


//connect to mysql and once connected display the database
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,

    user: "root",

    password: "tank82391!",
    database: "bamazon_db"
});

//call the connectdb function then return the database
connectdb().then(function() {
    return showDatabase();

    //Once that happens, return the userprompt function
}).then(function() {
    return userPrompt();

    //catch any errors
}).catch(function(error) {
    console.log(error);
});


//function to connect to database returning new promise and logging either the success or failure
function connectdb() {
    return new Promise(function(success, failure) {
        connection.connect(function(err) {
            if (err) failure(err);
            console.log("connected as id " + connection.threadId);
            success();

        });
    });
}

//show database function
function showDatabase() {
    return new Promise(function(success, failure) {
        connection.query("SELECT * FROM products", function(err, res) {
            if (err) {
                failure(err);
            } else {
                console.log(prettyjson.render(res, jsonColor));

                success();
            }
        });
    });
}
//userprompt function to ask which item and quantity to buy
function userPrompt() {
    return inquirer.prompt([{
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
        updateQuantity(quantityCheck.item, quantityCheck.quantity);

        //catch any errors and log them
    }).catch(function(e) {
        console.log(e);

    });
}

//query the database and check if there are enough quantities of the database
function databaseQuery(id, quantity) {

    var quantityUpdate = "SELECT item_id,product_name,stock_quantity,price FROM products WHERE ?";

    return new Promise(function(success, failure) {
        connection.query(quantityUpdate, { item_id: id }, function(err, res) {

            //log the response for that item_id
            console.log(res);

            //if the user quantity is less than or equal to the stock quantity, run the updateQuantity function
            if (quantity <= res[0].stock_quantity) {
                updateQuantity(id, (res[0].stock_quantity - parseInt(quantity)));

                //console log the number bought and the total price to the nearest tenth
                console.log("Congratulations! You just purchased: " + quantity + " " + res[0].product_name + " for: $" + ((res[0].price * parseInt(quantity)).toFixed(2)));
                return;

                //if the user quantity is more than the stock quantity, call the notEnoughQuantity function
            } else if (quantity > res[0].stock_quantity) {
                notEnoughQuantity();
            }
        });
    });
}

//update the database with the number of quantity left using a promise
function updateQuantity(item_id, newQuantity) {
    return new Promise(function(success, failure) {
        connection.query("UPDATE products SET ? WHERE ?", [{
            stock_quantity: newQuantity
        }, {
            item_id: item_id
        }], function(err, res) {
            if (err) {
                console.log(err);
            }

        });
    });
}

//a function designed to handle if there isn't enough quantity
function notEnoughQuantity() {
    console.log("Insufficient quantity! We're sorry, there is not enough of that item. What would you like to do?");
    return inquirer.prompt([{
            name: "action",
            type: "list",
            message: "Would you like buy a different item or leave the store?",
            choices: ["buy a different item", "leave store"]
        }])
        //wait for the user response, and depending on which choice the user picks, provide additional options
        .then(function(nextSteps) {

            //if the user wants to buy less, prompt them a new quantity
            if (nextSteps.action === "buy a different item") {
                userPrompt();

                //otherwise, log the message and exit the applicaton
            } else {
                console.log("Thank you for shopping at Bamazon. Visit us again soon!");
                return;
            }
        });
}
