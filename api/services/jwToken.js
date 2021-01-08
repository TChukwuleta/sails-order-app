const jwt = require('jsonwebtoken')
const tokenSecret = 'itismysecret'

module.exports = {
    //Generate a token
    issue(payload) {
        return jwt.sign(
            payload,
            tokenSecret,
            {
                expiresIn: '30 days'
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