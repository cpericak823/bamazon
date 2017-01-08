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
        if (err) throw err;
        console.log(res);
    });
}


//userprompt function to ask which item and quantity to buy
function userPrompt() {
    inquirer.prompt([{
        name: "item",
        type: "input",
        message: "What is the item you would like to buy?"
    }, {
        name: "quantity",
        type: "input",
        message: "What how much/many would you like to buy?"
    }, {
        type: "confirm",
        message: "Are you sure:",
        name: "confirm",
        default: true
    }]).then(function(quantityCheck) {
        //query the database and check if there are enough quantities of the database
        //if yes:
        //function buyItem (){
        //update the database with the number of quantity left connection.query(function(){});
        //console log the number bought and the total price


        //if no:
        //console log there isn't enough of that item left
        //prompt what would you like to do: buy less, buy another item, or leave store
        //if buy less, prompt the quantity to buy, rerun buyItem(){};
        //else if buy another item, rerun userPrompt(){};
        //else leave store, console log (Thank You, Come again!);

    });
};
