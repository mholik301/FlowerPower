var express = require('express');
var router = express.Router();

//a na ovaj nacin instanciram objekt pomocu kojeg razgovaram sa bazom
//const repo = require('../db/store.repo');



//implementacija routera 
//prvi argument je relativni upit za kojeg se ovaj router aktivira
//drugi argument je CONTROLER za tu rutu (ovaj 'function')
//u ovom primjeru CONTROLLER je ad hoc, ali nama nitko ne brani tu funkciju napraviti u folderu
//controlera i ovdje ju importati i samo pozvati, ako nam je tako cisci kod
//u sebi prilagodi podatke (ovdje toga nema) i preda ih na iscrtavanje u VIEW

//render funkcija iscrtava VIEW
//u ovom primjeru:
//prvi argument je string naziv view-a
//drugi argument je MODEL koji se preda tom view-u
//u ovom primjeru MODEL je ad hoc, primjera radi, ali inace se i oni rade zasebno, kao klase 
//, npr. vidi models/author i routes/author
router.get('/', function (req, res, next) {
    res.render('home', {
        title: 'Home',
        linkActive: 'home'
    });
});

module.exports = router;