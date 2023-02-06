const express = require('express');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const authRouter = require('./routes/admin/auth');
const adminProductsRouter = require('./routes/admin/products');
const productsRouter = require('./routes/products');
const app = express();
const cartsRouter = require('./routes/carts')
const server = require('http').Server(app);
const io = require('socket.io')(server);




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
io.on('connection', socket => {
    console.log('User connected: ', socket.id);

    socket.on('disconnect', () => {
        console.log('User disconnected: ', socket.id);
    });

    socket.on('message', message => {
        console.log('Received message: ', message);
        io.emit('message', message);
    });
});




//the port where Express do its thing
app.listen(3001, () => {
    console.log('Listening at port 3001');
});

