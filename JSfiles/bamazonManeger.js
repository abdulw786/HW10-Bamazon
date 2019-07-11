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
    optionsMenu();
});

function optionsMenu() {
    inquirer.prompt([
        {
            message: "What would you like to do today?",
            name: "Options",
            type: "list",
            choices: [
            "View Products for Sale",
             "View Low Inventory",
              "Add to Inventory",
              "Add New Product",
               "End"]
        }
    ]).then(answers => {
        if (answers.Options == "View Products for Sale") {
            viewProducts();
        } else if (answers.Options == "View Low Inventory") {
            viewLowInventory();
        } else if (answers.Options == "Add to Inventory") {
            addInventory();
        } else if (answers.Options == "Add New Product") {
            addProduct();
        } else {
            connection.end();
        }

    })
}


function viewProducts() {
    connection.query("SELECT id, name, price, quantity FROM products", function (err, res) {
        if (err) throw err;
        console.table(res);
        optionsMenu();
    });
}

function viewLowInventory() {
    connection.query("SELECT * FROM products WHERE quantity < 5", function (err, res) {
        if (err) throw err;
        console.table(res);
        optionsMenu();
    });
}

function addInventory() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        inquirer.prompt([
            {
                message: "Which item would you like to add inventory?",
                name: "add_Inventory",
                type: "list",
                choices: res.map(item => item.id)
            },
            {
                message: "How much would you like to add?",
                name: "inventory_Amount"
            }
        ]).then(answers => {
            let inventoryItem = res.find(item => item.id == answers.add_Inventory);
            let newStock = inventoryItem.stock_quantity + parseInt(answers.inventory_Amount);
            connection.query("UPDATE products SET ? WHERE ?", [{ stock_quantity: newStock }, { id: inventoryItem.id }], (err, res) => {
                console.log("Successfully Added!");
                console.log(`There is now ${newStock} of that product`);
                optionsMenu();
            });
        });
    });
} 

function addProduct() {
    inquirer.prompt([
        {
            message: "Please enter a product name",
            name: "name"
        },
        {
            message: "Please enter the department name it belongs to",
            name: "department"
        }, 
        {
            message: "Please enter the price",
            name: "price"
        }, 
        {
            message: "Please enter inventory amount",
            name: "amount"
        }
    ]).then(answers => {
        connection.query("INSERT INTO products SET ?", 
        {
            name: answers.name, 
            department: answers.department,
            price: answers.price,
            stock_quantity: answers.amount
        }, function (err, res){
            console.log("Successfully added new product!");
            optionsMenu();
        }
    );
    })
}
