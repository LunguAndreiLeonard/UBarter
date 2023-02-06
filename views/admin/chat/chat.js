const layout = require('../layout');


module.exports = ({ req, errors }) => {
    return layout({
        content: `
        <div id="local-video"></div>
<div id="remote-video"></div>
<textarea id="message"></textarea>
<button id="send-message">Send</button>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/socket.io/2.3.0/socket.io.js"></script>
    <script>

    `
    });
}