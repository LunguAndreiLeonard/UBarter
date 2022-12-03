const layout = require('../layout');

module.exports = ({ products }) => {
    const renderedProducts = products
        .map(product => {
            return `
        <div class="column is-one-quarter">
            <div class="card product-card">
            <figure>
                <img src="data:image/png;base64, ${product.image}"/>
            </figure>
            <div class="card-content">
                <h3 class="subtitle">${product.title}</h3>
                <h4 class="subtitle">${product.description}</h3>
                <h5>$${product.price}</h5>
            </div>
            <footer class="card-footer">
                <form action="/cart/products" method="POST">
                <input hidden value ="${product.id}" name="productId" />
                <button class="button has-icon is-inverted">
                    <i class="fa fa-shopping-cart"></i> Want to trade!
                </button>
                </form>
            </footer>
            </div>
        </div>
        `;
        })
        .join('\n');

    const inLineProducts = products
        .map(product => {
            return `
            <div class="inline-media">
            <figure>
                <img id="figure-inline" src="data:image/png;base64, ${product.image}"/>
            </figure>
            <div class="prod-title-inline">
                <p>${product.title}</p>
            </div>
            </div>
        `;
        })
        .join('\n');

    return layout({
        content: `
        <section class="section-spaces">
        <h1>Recent products added</h1>
        <div id="recent-prod">
        <div id="inline-prod">
        ${inLineProducts}
        </div>
        </div>
</section

        <section>
        <div class="container">
            <div class="columns">
            <div class="column "></div>
            <div class="column is-four-fifths">
                <div>
                <h2 class="title text-center">All products</h2>
                <div class="columns products">
                    ${renderedProducts}
                </div>
                </div>
            </div>
            <div class="column "></div>
            </div>
        </div>
        </section>
    `
    });
};
