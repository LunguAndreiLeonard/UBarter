const { check } = require('express-validator');
const usersRepo = require('../../repositories/users');

module.exports = {
    requireTitle: check('title')
        .trim()
        .isLength({ min: 5, max: 20 })
        .withMessage('Must be a valid name'),
    requireDescription: check('description')
        .trim()
        .isLength({ min: 10, max: 100 })
        .withMessage('Must be between 10 and 100 characters'),
    requireEmail: check('email')
        .trim()
        .normalizeEmail()
        .isEmail()
        .withMessage('Must be a valid email')
        .custom(async email => {
            const existingUser = await usersRepo.getOneBy({ email });
            if (existingUser) {
                throw new Error('Email already used!')
            }

        }),
    requirePassword: check('password')
        .trim()
        .isLength({ min: 3, max: 20 })
        .withMessage('Must be between 3 and 20 characters'),
    requirePasswordConfirmation: check('passwordConfirmation')
        .trim()
        .isLength({ min: 3, max: 20 })
        .withMessage('Must match the password')
        .custom((passwordConfirmation, { req }) => {
            if (passwordConfirmation !== req.body.password) {
                throw new Error('Passwords must match');
            }
            return true;
        }),
    requireValidEmail: check('email')
        .trim()
        .normalizeEmail()
        .isEmail()
        .custom(async (email) => {
            const user = await usersRepo.getOneBy({ email });
            if (!user) {
                throw new Error('Email not found!');
            }
        }),
    requireMatchPassword: check('password')
        .trim()
        .custom(async (password, { req }) => {
            const user = await usersRepo.getOneBy({ email: req.body.email });
            if (!user) {
                throw new Error('Invalid password');
            }
            const validPassword = await usersRepo.comparePasswords(
                user.password,
                password
            );
            if (!validPassword) {
                throw new Error('Invalid password');
            }
        })

}