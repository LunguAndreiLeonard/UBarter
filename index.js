const express = require('express');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const authRouter = require('./routes/admin/auth');
const adminProductsRouter = require('./routes/admin/products');
const productsRouter = require('./routes/products');
const app = express();
const cartsRouter = require('./routes/carts')
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const users = {};



app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieSession({
    keys: ['gadhsdr424']
}));
app.use(authRouter);
app.use(productsRouter);
app.use(adminProductsRouter);
app.use(cartsRouter);



//socket.io connection
io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('login', (username) => {
        // Save the username for this socket
        socket.username = username;
        // Add the user to the list of online users
        users[username] = socket.id;
        // Emit an event to update the list of online users for all clients
        io.emit('update users', Object.keys(users));
    });

    socket.on('send message', (data) => {
        // Find the recipient's socket
        const recipientSocket = io.sockets.sockets[users[data.recipient]];
        // Emit the message to the recipient
        recipientSocket.emit('new message', {
            sender: socket.username,
            message: data.message
        });
    });

    socket.on('disconnect', () => {
        console.log('A user disconnected');
        // Remove the user from the list of online users
        delete users[socket.username];
        // Emit an event to update the list of online users for all clients
        io.emit('update users', Object.keys(users));
    });
});

//

//the port where Express do its thing
app.listen(3001, () => {
    console.log('Listening at port 3001');
});

