const express = require('express');
const productsRepo = require('../repositories/products');
const productsIndexTemplate = require('../views/products/index');
const productsInLineTemplate = require('../views/products/recentAdded');

const router = express.Router();

router.get('/', async (req, res) => {
    const products = await productsRepo.getAll();
    res.send(productsIndexTemplate({ products }));
    // res.send(productsInLineTemplate({ products }));
});

module.exports = router;