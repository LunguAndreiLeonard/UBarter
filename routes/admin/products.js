const express = require('express');
const multer = require('multer');

const { handleErrors, requireAuth } = require('./middleware');
const productsRepo = require('../../repositories/products');
const productsNewTemplate = require('../../views/admin/products/new');
const productsEditTemplate = require('../../views/admin/products/edit');
const productsIndexTemplate = require('../../views/admin/products/index');
const { requireTitle, requireDescription } = require('./validators');

const router = express.Router();

//image storage
var upload = multer({ storage: multer.memoryStorage() });

router.get('/admin/products', requireAuth, async (req, res) => {
    const userId = req.session.userId;
    const products = await productsRepo.getAllByUserId(userId);
    res.send(productsIndexTemplate({ products }));
});

router.get('/admin/products/new', requireAuth, (req, res) => {

    res.send(productsNewTemplate({}));
});

router.post('/admin/products/new',
    requireAuth,
    //handling the upload
    upload.single('image'),
    [requireTitle, requireDescription],
    //verify for errors first
    handleErrors(productsNewTemplate),
    async (req, res) => {

        const image = req.file.buffer.toString('base64');
        const { title, description } = req.body;
        const userId = req.session.userId;

        await productsRepo.create({ title, description, image, userId });

        res.redirect('/admin/products');
    });

router.get('/admin/products/:id/edit', requireAuth,
    async (req, res) => {
        const product = await productsRepo.getOne(req.params.id);

        if (!product) {
            return res.send('Product not found');
        }
        res.send(productsEditTemplate({ product }));
    });

router.post('/admin/products/:id/edit',
    requireAuth,
    upload.single('image'),
    [requireTitle, requireDescription],
    handleErrors(productsEditTemplate,
        async (req) => {
            const product = await productsRepo.getOne(req.params.id);
            return { product };
        }),
    async (req, res) => {
        const changes = req.body;

        if (req.file) {
            changes.image = req.file.buffer.toString('base64');
        }
        try {
            await productsRepo.update(req.params.id, changes)
        } catch (err) {
            return res.send('Could not find item');
        }

        res.redirect('/admin/products');
    })

router.post('/admin/products/:id/delete', requireAuth, async (req, res) => {
    await productsRepo.delete(req.params.id);

    res.redirect('/admin/products');
})
module.exports = router;