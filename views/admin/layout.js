module.exports = ({ content }) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>UBarter</title>
      <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.min.css" rel="stylesheet">
      <link href="/css/style.css" rel="stylesheet">
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.7.5/css/bulma.min.css"></link>
    </head>

    <body class="admin">
    <nav>
        <img id="logo-barter" src="../images/logoBarter.png">
        <ul>
            <li><a href="/">Home</a></li>
            </ul>
            </nav>
      <div class="container">
        ${content}
      </div>
    </body>
  </html>
`;
}