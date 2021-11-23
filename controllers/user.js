// https://www.npmjs.com/package/bcrypt
// https://en.wikipedia.org/wiki/List_of_HTTP_status_codes
// https://www.npmjs.com/package/jsonwebtoken

const bcrypt = require('bcrypt');

const User = require('../models/User');

// *** POST -> /api/auth/signup
exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10).then(hash => {
        const user = new User({
            email: req.body.email,
            password: hash
        })
        user.save()
        .then(() => res.status(201)
        .json({ message: 'New user registered' }))
    })
}

// *** POST -> /api/auth/login
exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email }).then(user => {
        // Check email
        if (!user)
        {
            return res.status(401).json({ error: 'User is not registered' })
        }
        
        // Check password
        bcrypt.compare(req.body.password, user.password).then(valid => 
            {
                if (!valid)
                {
                    return res.status(401).json({ error: 'Password incorrect' })
                }
            })

            // Create a webtoken
            const newToken = jsonwebtoken.sign(
                { userId: user._id },
                process.env.TOKEN_KEY,
                { expiresIn: '24h' }
            );

            // Send it to session
            req.session.token = newToken;

            // Send it to front-end
            res.status(201).json({
                userId: user._id,
                token: newToken
            })
        })
    }
    