// https://atinux.developpez.com/tutoriels/javascript/mongodb-nodejs-mongoose/
// https://www.npmjs.com/package/mongoose-unique-validator

const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const userSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
})

userSchema.plugin(uniqueValidator)

module.exports = mongoose.model('User', userSchema)