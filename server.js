const express = require('express');
const path = require('path');
const app = express();

// Import message controller
const messageController = require('./controllers/messageController');
const { loadProductsFromFile, saveProductsToFile } = require('./utils/productUtils');
// Import contact routes
const contactRoutes = require('./routes/contactRoutes');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Use the contact routes
app.use('/', contactRoutes);
let products = loadProductsFromFile();
// Serve the login page
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'login.html'));
});

// Serve the send message page (GET /)
app.get('/', messageController.getMessagePage);

// Handle sending messages (POST /send-message)
app.post('/send-message', messageController.sendMessage);

// Handle reading messages (GET /messages)
app.get('/messages', messageController.showMessages);

// Handle 404 errors
app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});

// Start the server
const PORT = 4400;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
