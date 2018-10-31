## Bamazon Overview
Bamazon is a suite of three command line node apps for inventory management that work off of a MySQL database.
- - -

`bamazonCustomer.js` takes in orders from customers and depletes stock from the store's inventory.  

![alt text](/images/bamazonCustomer_purchase.PNG "bamazonCustomer.js purchase")

The app checks to make sure there's enough inventory in stock.  
![alt text](/images/bamazonCustomer_quantityUnavailable.PNG "bamazonCustomer.js quantity unavailable")

`bamazonManager.js` allows the user to view low inventory, increase inventory for existing products, and add new products.  

View low inventory:  
![alt text](/images/bamazonManager_lowInventory.PNG "bamazonManager.js view low inventory")

Add inventory:  
![alt text](/images/bamazonManager_addInventory.PNG "bamazonManager.js add inventory")

Add product:  
![alt text](/images/bamazonManager_addNewProduct.PNG "bamazonManager.js add product")

`bamazonSupervisor.js` lets the user view sales by department and create a new department.  

![alt text](/images/bamazonSupervisor_addDept.PNG "bamazonSupervisor.js add department and view sales by department")
