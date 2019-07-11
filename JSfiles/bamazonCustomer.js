const mysql = require("mysql");
const inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "123Abdul7@6",
    database: "bamazon"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    displayItems();
});

function displayItems(){
    connection.query("SELECT id, name, price, quantity FROM products", function (err, res) {
        if (err) throw err;
        console.table(res);
        // connection.end();
        purchaseItem();
    });
}

function toContinue(){
    inquirer.prompt([
        {
            message: "Would you like to continue?",
            name: "Continue",
            type: "confirm",
        }
    ]).then(answers => {
        if (answers.Continue == true) {
            displayItems();
        } else {
            connection.end();
        }

    })

}

function purchaseItem(){
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        inquirer.prompt([
            {
                message: "Which item would you like purchase?",
                name: "purchase_item",
                type: "list",
                choices: res.map(item => item.id)
            },
            {
                message: "How much would you like to buy?",
                name: "purchase_amount"
            }
        ]).then(answers => {
            let purchasedItem = res.find(item => item.id == answers.purchase_item);
            if (purchasedItem.quantity < answers.purchase_amount) {
                console.log("Sorry we are out of stoyck please come back later.");
                toContinue();
            } else {
                let newStock = purchasedItem.quantity - parseInt(answers.purchase_amount);
                let cost = answers.purchase_amount * purchasedItem.price;
                connection.query("UPDATE products SET ? WHERE ?", [{ stock_quantity: newStock }, { id: purchasedItem.id }], (err, res) => {
                    console.log("Successfully Purchased!");
                    console.log(`Your cost was $${cost}`);
                    console.log(`There is ${newStock} left of that product`);
                    toContinue();
                })
            }
        })
    });
}