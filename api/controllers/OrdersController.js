/**
 * OrdersController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
  
const Orders = require("../models/Orders");

module.exports = {
  
    list: function(req, res) {
        sails.models.orders.find({}).exec(function(err, data){
            if(err) {
                res.send(500, { error: 'Database Error'})
            }
            else {
                res.view('pages/list', { orders: data})
            }
        })
    },
    
    create: function(req, res) {
        const title = req.body.title
        const description = req.body.description

        sails.models.orders.create({
            title: title,
            description: description
        }).exec(function(err) {
            if(err) {
                res.send(500, {error: 'Error'})
            }
            res.redirect('/orders/list')
        })
    },
    //Another Banger
    
    delete: function(req, res) {
        sails.models.orders.destroy({ _id: req.params.id }).exec(function(err) {
            if(err) {
                res.send(500, {error: 'Error'})
            }
            res.redirect('/orders/list')
        })
        return false
    },

    edit: function(req, res) {
        sails.models.orders.findOne({ _id: req.params.id }).exec(function(err, data){
            if(err){
                res.send(500, { error: 'Error' })
            }
            res.view('pages/edit', { order: data })
        })
    },

    update: function(req, res) {
        const title = req.body.title
        const description = req.body.description

        sails.models.orders.update({_id: req.params.id}, {
            title: title,
            description: description
        }).exec(function(err) {
            if(err) {
                res.send(500, {error: 'Naaa'})
            }
            res.redirect('/orders/list')
        })   
        return false
    }
};
