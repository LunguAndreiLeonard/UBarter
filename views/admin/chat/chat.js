const layout = require('../layout');



module.exports = ({ req, errors }) => {
    return layout({
        content: `
        <form id="login-form">
        <input type="text" id="username" placeholder="Enter your username">
        <button type="submit">Log in</button>
    </form>
    <form id="chat-form" style="display: none;">
        <input type="text" id="recipient" placeholder="Enter the recipient's username">
        <input type="text" id="message" placeholder="Enter your message">
        <button type="submit">Send</button>
    </form>
    <ul id="messages"></ul>
    <ul id="users"></ul>
    <script src="/socket.io/socket.io.js"></script>
    <script src="/public/js/script.js"></script>
    `
    });
}