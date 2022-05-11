const bcrypt = require('bcrypt');
require('dotenv').config()


const hash = bcrypt.hashSync("password" + process.env.BCRYPT_PASSWORD, parseInt(String(process.env.SALT_ROUNDS)) )
console.log(hash)