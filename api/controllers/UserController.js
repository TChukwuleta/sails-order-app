/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

module.exports = {
    create: function(req, res) {
        const data = req.body;

        if (_.isUndefined(data.username)) {
			return res.badRequest('A Username is required.')
        }  
        
        if (_.isUndefined(data.email)) {
			return res.badRequest('An email address is required.')
		}

		if (_.isUndefined(data.password)) {
			return res.badRequest('A password is required.')
        }
        
        if (_.isUndefined(data.confirmPassword)) {
			return res.badRequest('Re-enter password.')
		}

		if (req.param('password').length < 8) {
			return res.badRequest('Password must be at least 8 characters.')
		}

        if (data.password !== data.confirmPassword) {
            return res.badRequest("Password not the same");
        }

        sails.models.user.create({
                email: data.email,
                password: data.password,
                username: data.username,
                confirmPassword: data.confirmPassword
            }) 
            .then((user) => { 
                const tokenSecret = 'itismysecret'
                const token = jwt.sign(
                    { user: user },
                    tokenSecret,
                    { 
                        expiresIn: 24 * 60 * 60 * 1000
                    }
                )
                res.cookie('sailsjwt', token, {
                    signed: true,
                    maxAge: 24 * 60 * 60 * 1000 
                })
                return res.redirect('/home')
                //res.send({ token: jwToken.issue({ id: user.id }) });
            })
            .catch((err) => {  
                sails.log.error(err);
                return res.serverError("Something went wrong");
            });
    },

    login: async function(req, res) {
        const data = req.body;

        if (!data.email || !data.password){
            return res.badRequest('Missing field');
        }

        const user = await sails.models.user.findOne({
             email: data.email 
            })

            if (!user) {
                return res.notFound()
            }
            
            await bcrypt.compare(data.password, user.password, (err, match) => {
                if (err) {
                    sails.log.error(err);
                }
                const tokenSecret = 'itismysecret'
                const token = jwt.sign(
                    { user: user },
                    tokenSecret,
                    {
                        expiresIn: 24 * 60 * 60 * 1000
                    }
                )
                res.cookie('sailsjwt', token, {
                    signed: true,
                    maxAge: 24 * 60 * 60 * 1000
                })
                return res.redirect('/home')

            })
    },

    logout: function(req, res) {
        res.clearCookie('sailsjwt')
        req.user = null
        res.redirect('/')
    }
};