/**
 * User.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */
'use strict'
const bcrypt = require('bcrypt')

module.exports = {

  attributes: {

    email: {
      type: 'string',
      required: true,
      isEmail: true,
      unique: true
    },
    username: {
      type: 'string',
      required: true,
      unique: true
    },
    password: {
      type: 'string',
      required: true
    },
    confirmPassword: {
      type: 'string',
      required: true
    }

    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝


    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝


    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝

  },

  customToJSON: function(){
    return _.omit(this, ['password'])
  },

  //We Encrypt password before creating a User
  beforeCreate: function(values, next) {
    bcrypt.genSalt(10, (err, salt) => {
      if(err) {
        sails.log.error(err)
        return next()
      }
      bcrypt.hash(values.password, salt, (err, hash) => {
        if(err) {
          sails.log.error(err)
          return next()
        }
        values.encryptedPassword = hash
        return next()
      })
    })
  },

  comparePassword: function(password, encryptedPassword) {

    return new Promise(function(resolve, reject) {
        bcrypt.compare(password, encryptedPassword, (err, match) => {
            if (err) {
                sails.log.error(err);
                return reject("Something went wrong!");
            }
            if (match) return resolve();
            else return reject("Mismatch passwords");
        });
    });
}

};

