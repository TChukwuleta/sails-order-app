const jwt = require('jsonwebtoken')
const tokenSecret = 'itismysecret'

module.exports = {
    //Generate a token
    issue(payload) {
        return jwt.sign(
            payload,
            tokenSecret,
            {
                expiresIn: 24 * 60 * 60 * 1000
            }
        )
    },

    //Verify token on a request
    verify(token, callback) {
        return jwt.verify(
            token,
            tokenSecret,
            {},
            callback
        )
    }
}