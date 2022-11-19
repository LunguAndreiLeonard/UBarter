const fs = require('fs');
const crypto = require('crypto');
const util = require('util');
const Repository = require('./repository');

const scrypt = util.promisify(crypto.scrypt);

//class exported
//extends methods from repository.js
class UsersRepository extends Repository {
    async create(attrs) {
        //attrs === {email: '', password: ''}
        attrs.id = this.randomId();

        const salt = crypto.randomBytes(8).toString('hex');
        const hashed = await scrypt(attrs.password, salt, 64);


        const records = await this.getAll();
        //record = attrs + pass hashsalted
        const record = {
            ...attrs,
            password: `${hashed.toString('hex')}.${salt}`
        };
        records.push(record);

        await this.writeAll(records);

        return records;
    }

    async comparePasswords(saved, supplied) {
        //saved - password saved in our record hashsalted password
        //supplied - password given by user
        const [hashed, salt] = saved.split('.');
        const hashedSuppliedBuffer = await scrypt(supplied, salt, 64);

        return hashed === hashedSuppliedBuffer.toString('hex');
    }
}

module.exports = new UsersRepository('users.json');