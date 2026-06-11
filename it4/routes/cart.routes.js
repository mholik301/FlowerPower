const express = require('express');
const router = express.Router();

const cart = require('../models/CartModel')
const user = require('../models/UserModel')

const {
    createCart,
    removeItemFromCart,
    addItemToCart,
    addItemToQueue
} = require('../models/CartModel');


//ZADATAK prikaz košarice uz pomoć cart.ejs
router.get('/', function (req, res, next) {

    //dobavi podatke o cartu iz sessiona
    let cart = req.session.cart

    //brisanje nakon chechouta
    if (cart !== undefined && cart.hasOwnProperty('invalid')) cart = undefined;

    if (cart === undefined) {
        cart = createCart()
        req.session.cart = cart
    }

    //MODIFIKACIJA
    let queue = req.session.queue

    if (queue === undefined) {
        let queue = []
        req.session.queue = queue
    }

    //dobavi podatke o useru iz sessiona
    let user = req.session.user

    res.render('cart', {
        title: 'Cart',
        user: user,
        cart: cart,
        queue: queue,
        linkActive: 'user'
    });


});

//ZADATAK: dodavanje jednog artikla u košaricu
router.get('/add/:id', async function (req, res, next) {

    //dobivanje id artikla iz headera zahtjeva
    let id = parseInt(req.params.id)

    let cart = req.session.cart

    if (cart === undefined) {
        cart = createCart()
        req.session.cart = cart
    }

    //dodajemo 1 predmet
    quantity = 1

    await addItemToCart(cart, id, quantity)

    //MODIFIKACIJA
    let queue = req.session.queue

    if (queue === undefined) {
        let queue = []
        req.session.queue = queue
    }

    await addItemToQueue(req.session.queue, id)


    //'refresh' cart page
    res.render('cart', {
        title: 'Cart',
        user: user,
        cart: cart,
        queue: queue,
        linkActive: 'user'
    });

    //alternativni 'refresh'
    /*
    res.end();
    res.send('Added item to cart');
    res.sendStatus(200);
    */

});

//ZADATAK: brisanje jednog artikla iz košarice
router.get('/remove/:id', function (req, res, next) {

    (async () => {
        //dobivanje id artikla iz headera zahtjeva
        let id = parseInt(req.params.id)

        let cart = req.session.cart

        if (cart === undefined) {
            cart = createCart()
            req.session.cart = cart
        }

        //dodajemo 1 predmet
        quantity = 1

        //brisanje jednog artikla
        await removeItemFromCart(cart, id, quantity)

        //MODIFIKACIJA
        let queue = req.session.queue

        if (queue === undefined) {
            let queue = []
            req.session.queue = queue
        }

        res.render('cart', {
            title: 'Cart',
            user: user,
            cart: cart,
            queue: queue,
            linkActive: 'user'
        });

    })()

});

module.exports = router;