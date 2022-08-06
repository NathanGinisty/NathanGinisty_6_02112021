const rateLimit = require("express-rate-limit")

const limiter = rateLimit({
    windowMs: 2 * 60 * 1000,
    max: 4,
    message: "Too many tries, account blocked for 2 minutes."
})

module.exports = { limiter }