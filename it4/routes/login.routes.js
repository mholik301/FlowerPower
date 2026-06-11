const express = require('express');
const router = express.Router();
const User = require('../models/UserModel')

const {
    fetchByUsername,
    checkPasswordS
} = require('../models/UserModel')


//ZADATAK: vrati login stranicu
router.get('/', function (req, res, next) {
    res.render('login', {
        title: 'User profile',
        user: req.session.user,
        err: undefined,
        linkActive: 'user'
    });
});

//ZADATAK: postupak prijave korisnika
router.post('/', async function (req, res, next) {

    //je li netko vec ulogiran?
    if (req.session.user !== undefined) {
        res.render('login', {
            title: 'User profile',
            err: "Please log out first.",
            user: req.session.user,
            err: undefined,
            linkActive: 'user'
        });
        return
    }

    //postoji li navedeni par email-pass?
    //FIX: fetch uvijek vrati usera pa treba provjeriti .email!==undefined, ali i ono bi radilo radi pass provjere
    //FIX2: chechPasswordS ne smije (niti ne treba) biti async jer onda vraca promise, a ne bool
    //FIX3: else render nije imao active link postavljen
    user = await fetchByUsername(req.body.user)
    if (user.email !== undefined && checkPasswordS(user.password, req.body.password)) {

        //if successful, set persistent cookie with username (timeout=1 week)
        let expiryDate = new Date(Number(new Date()) + 604800000);
        res.cookie('shopuserID', req.body.email, {
            expires: expiryDate,
            httpOnly: true
        });

        //asocijacija sessiona sa userom, pa session vise nije anonimni
        req.session.user = user

        //osigurati ocuvanje sadrzaja kosarice?
        //cart.persist() ?

        //session.save() se izvodi automatski na kraju http odgovora
        //tako da je session.cart pohranjen automatski

        //if successful, redirect to the main page
        res.redirect("/")

    } else {
        res.render('login', {
            title: 'User profile',
            user: req.session.user,
            err: "Incorrect username or password.",
            linkActive: 'user'
        });
    }


});


module.exports = router;