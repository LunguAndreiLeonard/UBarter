const layout = require('../layout');

module.exports = ({ products }) => {
    const renderedProductsInLine = products
        .map(product => {
            return `
        <div class="column is-one-quarter">
            <div class="card product-card">
            <figure>
                <img src="data:image/png;base64, ${product.image}"/>
            </figure>
            <div class="card-content">
                <h3 class="subtitle">${product.title}</h3>
            </div>
            <footer class="card-footer">
                <form action="/cart/products" method="POST">
                <input hidden value ="${product.id}" name="productId" />
                </form>
            </footer>
            </div>
        </div>
        `;
        })
        .join('\n');

    return layout({
        contentAdded: `
        <section>
        <div class="container">
            <div class="columns">
            <div class="column "></div>
            <div class="column is-four-fifths">
                <div>
                <h2 class="title text-center">All products</h2>
                <div class="columns products">
                    ${renderedProductsInLine}  
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
