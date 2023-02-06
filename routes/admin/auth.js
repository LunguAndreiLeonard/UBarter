const express = require('express');

const { handleErrors } = require('./middleware');
const usersRepo = require('../../repositories/users');
const signupTemplate = require('../../views/admin/auth/signup')
const signinTemplate = require('../../views/admin/auth/signin')
const { requireEmail, requirePassword, requirePasswordConfirmation, requireValidEmail, requireMatchPassword } = require('./validators')
const chatappTemplate = require('../../views/admin/chat/chat')
const router = express.Router();

router.get('/signup', (req, res) => {
    // form for register
    res.send(signupTemplate({ req }));
});

router.get('/chatapp', (req, res) => {
    res.send(chatappTemplate({ req }));
})

router.post('/signup',
    [
        requireEmail,
        requirePassword,
        requirePasswordConfirmation
    ],
    handleErrors(signupTemplate),
    async (req, res) => {

        //get access to email and password
        const { email, password } = req.body;

        //Create a user in our user repo to represent this person
        const user = await usersRepo.create({ email, password });

        //Store the id of that user inside the users cookie
        //session is added by cookie session 
        req.session.userId = user.id;

        res.redirect('/admin/products')
    });

router.get('/signout', (req, res) => {
    req.session = null;
    res.redirect('/signin')
});

router.get('/signin', (req, res) => {
    res.send(signinTemplate({}));
});

router.post('/signin', [
    requireValidEmail,
    requireMatchPassword
],
    handleErrors(signinTemplate),
    async (req, res) => {


        const { email } = req.body;

        const user = await usersRepo.getOneBy({ email });

        req.session.userId = user.id;

        res.redirect('/admin/products')
    });


module.exports = router;

