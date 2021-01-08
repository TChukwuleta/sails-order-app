/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

const OrdersController = require("../api/controllers/OrdersController");
const UserController = require("../api/controllers/UserController");

 
 
module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` your home page.            *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/
 
  '/': { view: 'pages/index' },
  '/home': { view: 'pages/index' },
  '/login': { view: 'home' },
  'post /login': UserController.login,
  '/register': { view: 'pages/register' },
  'post /register': UserController.create,
  '/logout': UserController.logout,
  '/orders/list': OrdersController.list,
  '/orders/add': { view: 'pages/add' },
  'post /added': OrdersController.create,
  '/orders/delete/:id': OrdersController.delete,
  '/orders/edit/:id': OrdersController.edit,
  '/orders/update/:id': OrdersController.update


  /***************************************************************************
  *                                                                          *
  * More custom routes here...                                               *
  * (See https://sailsjs.com/config/routes for examples.)                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the routes in this file, it   *
  * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
  * not match any of those, it is matched against static assets.             *
  *                                                                          *
  ***************************************************************************/


};
