// // Connect to the Socket.io server
// const socket = io();

// // Get references to the login form, chat form, message list, and user list
// const loginForm = document.getElementById('login-form');
// const chatForm = document.getElementById('chat-form');
// const messagesList = document.getElementById('messages');
// const usersList = document.getElementById('users');

// // Handle the login form submission
// loginForm.addEventListener('submit', (e) => {
//     e.preventDefault();
//     // Get the username
//     const username = document.getElementById('username').value;
//     // Emit a login event to the server
//     socket.emit('login', username);
//     // Show the chat form
//     loginForm.style.display = 'none';
//     chatForm.style.display = 'flex';
// });

// // Handle the chat form submission
// chatForm.addEventListener('submit', (e) => {
//     e.preventDefault();
//     // Get the recipient and message
//     const recipient = document.getElementById('recipient').value;
//     const message = document.getElementById('message').value;
//     // Emit a send message event to the server
//     socket.emit('send message', { recipient, message });
//     // Clear the message input
//     document.getElementById('message').value = '';
// });


// // Listen for new message events from the server
// socket.on('new message', (data) => {
//     // Create a new list item for the message
//     const messageItem = document.createElement('li');
//     messageItem.innerHTML = `<b>${data.sender}:</b> ${data.message}`;
//     // Add the message to the list
//     messagesList.appendChild(messageItem);
// });

// // Listen for new message events from the server
// socket.on('new message', (data) => {
//     // Create a new list item for the message
//     const messageItem = document.createElement('li');
//     messageItem.innerHTML = `<b>${data.sender}:</b> ${data.message}`;
//     // Add the message to the list
//     messagesList.appendChild(messageItem);
// });

// // Listen for update users events from the server
// socket.on('update users', (users) => {
//     // Clear the list of users
//     usersList.innerHTML = '';
//     // Add each user to the list
//     users.forEach((user) => {
//         const userItem = document.createElement('li');
//         userItem.innerHTML = user;
//         usersList.appendChild(userItem);
//     });
// });

