// https://www.npmjs.com/package/bcrypt
// https://en.wikipedia.org/wiki/List_of_HTTP_status_codes
// https://www.npmjs.com/package/jsonwebtoken

// https://www.npmjs.com/package/email-validator --------------------------- <!>
// https://www.npmjs.com/package/password-validator


const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const validator = require("email-validator");

const User = require('../models/User');

// *** POST -> /api/auth/signup
exports.signup = (req, res) => {
    bcrypt.hash(req.body.password, 10)
    .then(hash => {
        const user = new User({
            email: req.body.email,
            password: hash
        })
        user.save()
        .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
        .catch(error => res.status(400).json({ error }))
    })
    .catch(error => res.status(500).json({ error }))
}


// *** POST -> /api/auth/login
exports.login = (req, res) => {
    User.findOne({ email: req.body.email })
    .then(user => {
        if (!user) {
            return res.status(401).json({ error: 'Utilisateur non trouvé !' })
        }
        bcrypt.compare(req.body.password, user.password)
        .then(valid => {
            if (!valid) {
                return res.status(401).json({ error: 'Mot de passe incorrect !' })
            }
            res.status(200).json({
                userId: user._id,
                token: jwt.sign(
                    { userId: user._id },
                    `${process.env.RND_TKN}`,
                    { expiresIn: '24h' }
                    )
                })
            })
            .catch(error => res.status(500).json({ error }))
        })
        .catch(error => res.status(500).json({ error }))
    }