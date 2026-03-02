// ============================================
// LESSON 6: Inventory + Order Queue + Dispatch Stack
// ============================================

// Data structures
const inventory = [];
const orderQueue = [];
const dispatchStack = [];

// ============================================
// PART 1: INVENTORY MANAGEMENT
// ============================================

// 1) Add Product to inventory
// Step-by-step instructions:
// 1. Loop through the inventory array to check if a product with the given id already exists.
// 2. If a product with the same id is found, print a message like "Product with ID {id} already exists." and return.
// 3. If no product with that id exists, create a new product object with properties: id, name, category, price, quantity.
// 4. Add the new product object to the inventory array.
// 5. Optionally, print a success message like "Product added successfully."
function addProduct(id, name, category, price, quantity) {
    // TODO: implement
    if(inventory.some(productID => productID.id === id)){
        console.log("Product with ID " + id + " already exists.");
    }else{
        inventory.push({id, name, category, price, quantity});
        console.log("Product added successfully.");
    }
}

// 2) Update Product fields
// Step-by-step instructions:
// 1. Loop through the inventory array to find the product with the matching id.
// 2. If no product with that id is found, print a message like "Product with ID {id} not found." and return.
// 3. If the product is found, loop through the keys of the updates object (e.g., price, category, quantity).
// 4. For each key in updates, set the corresponding property on the product object.
// 5. Optionally, print a success message like "Product updated successfully."
function updateProduct(id, updates) {
    // updates object may contain: { price, category, quantity }
    // TODO: implement
    for(let i = 0; i < inventory.length; i++){
        if (inventory[i].id === id){
            for(let key in updates){
                inventory[i][key] = updates[key];
            }
            console.log("product updated successfully.");
        }else{
            console.log("product with ID " + id + " not found.");
        }
    }
}

// 3) Delete Product from inventory
// Step-by-step instructions:
// 1. Loop through the inventory array to find the index of the product with the matching id.
// 2. If no product with that id is found, print a message like "Product with ID {id} not found." and return.
// 3. If the product is found, use the splice method to remove it from the inventory array at the found index.
// 4. Optionally, print a success message like "Product deleted successfully."
function deleteProduct(id) {
    // TODO: implement
    for(let i = 0; i < inventory.length; i++){
        if(inventory[id].id === id){
            inventory.splice(i, 1);
            console.log("Product deleted successfully.");
        }else{
            console.log("Product with ID " + id + " not found.");
        }
    }
}

// 4) Search Products
// Search by name (exact match) - return single product or null
// Step-by-step instructions:
// 1. Loop through the inventory array.
// 2. For each product, check if product.name is exactly equal to the provided name.
// 3. If a match is found, return the product object.
// 4. If no match is found after looping through all products, return null.
function searchByName(name) {
    // TODO: implement
    for (let i = 0; i < inventory.length; i++){
        if(inventory[i].name === name){
            return inventory[i];
        }else{
            return null;
        }
    }
}

// Search by category (exact match) - return array of products
// Step-by-step instructions:
// 1. Initialize an empty array called results to store matching products.
// 2. Loop through the inventory array.
// 3. For each product, check if product.category is exactly equal to the provided category.
// 4. If it matches, push the product object into the results array.
// 5. After looping, return the results array (which may be empty if no matches).
function searchByCategory(category) {
    // TODO: implement
    const results = [];
    for(let i = 0; i < inventory.length; i++){
        if(inventory[i].category === category){
            results.push(inventory[i]);
        }else{
            return results;
        }
    }
}

// 5) Sort Inventory
// Do NOT use built-in sort(), write your own sorting algorithm
// Swap entire product objects

// Sort by price ascending
// Step-by-step instructions:
// 1. Get the length of the inventory array.
// 2. Use a nested loop for bubble sort: outer loop from 0 to length-1, inner loop from 0 to length-i-1.
// 3. In the inner loop, compare inventory[j].price with inventory[j+1].price.
// 4. If inventory[j].price > inventory[j+1].price, swap the two product objects.
// 5. Continue until the array is sorted in ascending order by price.
function sortByPrice() {
    // TODO: implement (bubble sort or similar)
    const length = inventory.length;
    for(let i = 0; i < length - 1; i++){
        for(let j = 0; j < length - i - 1; j++){
            if(inventory[j].price > inventory[j+1].price){
                // swap
                const temp = inventory[j];
                inventory[j] = inventory[j+1];
                inventory[j+1] = temp;
            }else{
                continue;
            }
        }
    }
}

// Sort by name A→Z
// Step-by-step instructions:
// 1. Get the length of the inventory array.
// 2. Use a nested loop for bubble sort: outer loop from 0 to length-1, inner loop from 0 to length-i-1.
// 3. In the inner loop, compare inventory[j].name with inventory[j+1].name using string comparison.
// 4. If inventory[j].name > inventory[j+1].name (lexicographically), swap the two product objects.
// 5. Continue until the array is sorted in ascending alphabetical order by name.
function sortByName() {
    // TODO: implement
    const length = inventory.length;
    for(let i = 0; i < length - 1; i++){
        for(let j = 0; j < length - i - 1; j++){
            if(inventory[j].name >  inventory[j+1].name){
                const temp = inventory[j];
                inventory[j] = inventory[j+1];
                inventory[j+1] = temp;
            }else{
                continue;
            }
        }
    }
}

// Sort by category A→Z
// Step-by-step instructions:
// 1. Get the length of the inventory array.
// 2. Use a nested loop for bubble sort: outer loop from 0 to length-1, inner loop from 0 to length-i-1.
// 3. In the inner loop, compare inventory[j].category with inventory[j+1].category using string comparison.
// 4. If inventory[j].category > inventory[j+1].category (lexicographically), swap the two product objects.
// 5. Continue until the array is sorted in ascending alphabetical order by category.
function sortByCategory() {
    // TODO: implement
    const length = inventory.length;
    for(let i = 0; i < length - 1; i++){
        for(let j = 0; j < length - i - 1; j++){
            if(inventory[j].category > inventory[j+1].category){
                const temp = inventory[j];
                inventory[j] = inventory[j+1];
                inventory[j+1] = temp;
            }else{
                continue;
            }
        }
    }
}

// ============================================
// PART 2: ORDER QUEUE (FIFO)
// ============================================

// 6) Place Order (Enqueue)
// Validate quantity > 0
// Add to END of orderQueue
// Step-by-step instructions:
// 1. Check if the quantity is greater than 0. If not, print an error message like "Invalid quantity: must be greater than 0." and return.
// 2. Create a new order object with properties: orderId, productId, quantity.
// 3. Add (push) the order object to the end of the orderQueue array.
// 4. Optionally, print a success message like "Order placed successfully."
function placeOrder(orderId, productId, quantity) {
    if(quantity <= 0){
        console.log("invalid quantity: must be greater than 0.");
    }else{
        orderQueue.push({orderId, productId, quantity});
        console.log("Order placed successfully.");
    }
    // TODO: implement
}

// 7) Process Next Order (Dequeue → Dispatch)
// Remove from FRONT of queue
// Check if product exists and has enough stock
// If valid: reduce inventory quantity, move to dispatchStack
// If invalid: handle accordingly (print message, decide what to do with order)
// Step-by-step instructions:
// 1. Check if the orderQueue is empty. If yes, print "No orders to process." and return.
// 2. Dequeue the order from the front of orderQueue using shift().
// 3. Find the product in inventory by matching productId.
// 4. If product not found, print "Product not found for order {orderId}." and decide (e.g., discard or put back).
// 5. If product found, check if order.quantity <= product.quantity.
// 6. If sufficient stock, reduce product.quantity by order.quantity, and push the order to dispatchStack.
// 7. If insufficient stock, print "Insufficient stock for order {orderId}." and decide (e.g., put back to queue or discard).
function processNextOrder() {
    if(orderQueue.length === 0){
        console.log("No orders to process.");
        return;
    }
    const order = orderQueue.shift();
    const product = inventory.find(item => item.id === order.productId);
    if(!product){
        console.log("Product not found for order " + order.orderId + ".");
    }else if(order.quantity <= product.quantity){
        product.quantity -= order.quantity;
        dispatchStack.push(order);
    }else{
        console.log("Insufficient stock for order " + order.orderId + ".");
    }
    // TODO: implement
}

// ============================================
// PART 3: DISPATCH STACK (LIFO)
// ============================================

// 8) Undo Last Dispatch (Stack → Queue)
// Remove from TOP of stack (LIFO)
// Restore product quantity
// Put order back at BACK of orderQueue
// Step-by-step instructions:
// 1. Check if the dispatchStack is empty. If yes, print "No dispatches to undo." and return.
// 2. Pop the last dispatched order from the top of dispatchStack.
// 3. Find the product in inventory by matching the order's productId.
// 4. If product found, restore the quantity by adding back order.quantity to product.quantity.
// 5. Push the order back to the end of orderQueue.
// 6. Optionally, print a success message like "Last dispatch undone."
function undoLastDispatch() {
    if(dispatchStack.length === 0){
        console.log("No dispatches to undo.");
        return;
    }
    const order = dispatchStack.pop();
    const product = inventory.find(item => item.id === order.productId);
    if(product){
        product.quantity += order.quantity;
        orderQueue.push(order);
        console.log("Last dispatch undone.");
    }
    // TODO: implement
}

// ============================================
// TEST CALLS (Provided for verification)
// ============================================

// Uncomment and use these to test your implementations

addProduct(1, "Laptop", "Electronics", 999.99, 5);
addProduct(2, "Mouse", "Electronics", 25.50, 20);
addProduct(3, "Desk", "Furniture", 299.99, 3);

console.log("Inventory after adding:", inventory);

updateProduct(1, { quantity: 3 });
console.log("After updating product 1:", inventory[0]);

placeOrder(101, 1, 2);
placeOrder(102, 2, 5);
console.log("Order queue:", orderQueue);

processNextOrder();
console.log("Inventory after processing:", inventory);
console.log("Dispatch stack:", dispatchStack);

undoLastDispatch();
console.log("After undo - order queue:", orderQueue);
console.log("After undo - inventory:", inventory);

