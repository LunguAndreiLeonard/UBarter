const layout = require('../layout');

module.exports = ({ items }) => {

  const renderedItems = items
    .map(item => {
      return `
        <div class="cart-item message">
          <h3 class="title">${item.product.title}</h3>

          <h3 class = "subtitle left-align"> ${item.product.description}</h3>
          <div class="cart-right">
          <div>
          <button class="button is-warning">
          <span class="icon is-small">
                    <i class="fa fa-comment"></i>
                  </span>
                </button>
          </div>
            <div class="remove">
              <form method="POST" action="/cart/products/delete">
              <input hidden value="${item.id}" name="itemId" />
                <button class="button is-danger">                  
                  <span class="icon is-small">
                    <i class="fas fa-times"></i>
                  </span>
                </button>
              </form>
            </div>
          </div>
        </div>
      `;
    })
    .join('');

  return layout({
    content: `
      <div id="cart" class="container">
        <div class="columns">
          <div class="column space"></div>
          <div class="column is-four-fifths">
            <h3 class="subtitle"><b>Favorite items:</b></h3>
            <div>
              ${renderedItems}
            </div>

          <div class="column"></div>
        </div>
      </div>
    `
  });
};
