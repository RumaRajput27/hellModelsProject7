const fs = require('fs');
const path = require('path');

// Define the path to the products file
const filePath = path.join(__dirname, 'data', 'products.json');

// Function to read the products data from the file
function loadProductsFromFile() {
    if (fs.existsSync(filePath)) {
        const fileContent = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(fileContent); // Parse the JSON content and return
    } else {
        return []; // Return an empty array if the file doesn't exist
    }
}

// Function to write products data to the file
function saveProductsToFile(products) {
    fs.writeFileSync(filePath, JSON.stringify(products, null, 2), 'utf8');
}

module.exports = { loadProductsFromFile, saveProductsToFile };
