const express = require('express');
const productsRepo = require('../repositories/products-inline');
const productsIndexTemplate = require('../views/products/recentAdded');

const router = express.Router();

router.get('/', async (req, res) => {
    const products = await productsRepo.getAll();
    res.send(productsIndexTemplate({ products }));
});

module.exports = router;