const express = require('express');
const router = express.Router();

const cart = require('../models/CartModel')

const {
    createCart,
    removeItemFromCart,
    addItemToCart
} = require('../models/CartModel');

//ZADATAK:
// - obrisati sadržaj košarice
// - odjaviti registriranog korisnika iz sustava
// - napraviti redirect na osnovnu stranicu
router.get('/', function (req, res, next) {

    (async () => {
        //praznjenje carta
        req.session.cart = undefined

        //alternativno
        /* 
        for (let item of Object.values(cart.items))
            await removeItemFromCart(cart, item.id, item.quantity + 1)
        */

        //for (let item in cart.items) delete cart.items[item]
    })()

    //clear session-user mapping (odvajanje sessiona i usera)
    req.session.user == undefined

    //brisanje sessiona
    req.session.destroy((err) => {
        if (err) {
            //report possible error
            console.log(err)
        } else {
            //redirect to the main page
            res.redirect('./')
        }
    })
});

module.exports = router;