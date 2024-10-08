const fs = require('fs');
const path = require('path');

// Path to the file where messages will be stored
const filePath = path.join(__dirname, '../data/messages.json');

// Read the messages from the file and parse them when the server starts
let messages = [];
fs.readFile(filePath, 'utf8', (err, data) => {
    if (err && err.code === 'ENOENT') {
        console.log("File not found, starting with an empty message list.");
    } else if (err) {
        console.error("Error reading the file:", err);
    } else {
        messages = data.trim().split('\n').map(line => JSON.parse(line));
        console.log("Messages loaded from file:", messages);
    }
});

// Function to save a new message to the file and in memory
exports.saveMessage = (username, message, callback) => {
    const newMessage = { username, message };

    // Add the new message to the memory array
    messages.push(newMessage);

    // Append the new message to the file
    fs.appendFile(filePath, JSON.stringify(newMessage) + '\n', (err) => {
        if (err) {
            return callback(err);
        }
        callback(null);
    });
};

// Function to get all messages
exports.getMessages = () => {
    return messages;
};
