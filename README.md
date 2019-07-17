# HW11-Bamazon
HW10-Bamazon
Video Overview
Bamazon Video Overview

Overview
To run each part of the application:

node .\bamazonCustomer.js
node .\bamazonManager.js
Technologies used:

JavaScript
Node
Inquirer
MySql
This is a JavaScript Node command line interface to a storefront sort of like Amazon. The first part of the application is Customer View. It allows a customer to look at products and place orders for them. If the quantity in stock isn't sufficient then the user gets and error message informing them.

The second part of the application is the Manager view. It allows the manager to see all of the information about the products including the remaining stock as well as the total sales for the product. The manager also has a view into any items that are low in inventory (quantity in stock is less than 5). They can also add quantity to the inventory as well as add new products to the product list.

The third part of the application is the Supervisor view. Supervisors are allowed to view and create departments. Each department has an overhead cost associated with it. The final view displays product sales by department with the total profit calculated.

Architecture
The appliction is divided into three different files: bamazonCustomer.js, bamazonManager.js, bamazonSupervisor.js. Each one encapsulates the functionality for a given user role. The basic design uses the inquirer module to handle the user input, mysql to handle the database queries and console.table to pretty print the results.

The database queries are all pretty simple selects inserts and updates. The add quantity update does increment the existing column's value. The fanciest statement is the view sales by department. It uses GROUP BY, SUM, and a calcuated column not in the database to display the net profit.