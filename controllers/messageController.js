const messageModel = require('../models/messageModel');
const path = require('path');

// GET handler for the message page ("/")
exports.getMessagePage = (req, res) => {
    res.sendFile(path.join(__dirname, '../views', 'message.html'));
};

// POST handler for sending messages
exports.sendMessage = (req, res) => {
    const { username, message } = req.body;

    // Call the model to save the message to file and memory
    messageModel.saveMessage(username, message, (err) => {
        if (err) {
            return res.status(500).send('Error saving message');
        }
        res.send('Message received and stored!');
    });
};

// GET handler for reading and showing messages
exports.showMessages = (req, res) => {
    // Retrieve messages from memory (which were loaded from the file)
    const messages = messageModel.getMessages();
    res.json(messages);  // Send the list of messages as JSON
};
