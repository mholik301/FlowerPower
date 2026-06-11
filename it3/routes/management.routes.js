var express = require('express');
var router = express.Router();

const {
    check,
    body,
    validationResult
} = require('express-validator');

//instanciranje objekta/drivera za razgovor sa bazom
const repo = require('../db/store.repo'); //DODATI ADD CAT




router.get('/', async function (req, res, next) {
    res.render('management', {
        title: 'Management',
        linkActive: 'management'
    });
});


router.get('/addcategory', async function (req, res, next) {
    //aditional model data

    res.render('addcategory', {
        title: 'Add category',
        linkActive: 'addcategory'
    });
});


router.post('/addcategory', [
        body('name').trim().isLength({
            min: 3,
            max: 18
        }),
        body('description').trim().isLength({
            min: 5,
            max: 35
        }),
        body('seasonal').not().isEmpty()
    ],

    async function (req, res, next) {

        const result = validationResult(req);

        if (!result.isEmpty()) {
            res.render('error', {
                title: "Add Category",
                linkActive: 'error',
                errors: result.array()
            });

        } else {
            //console.log(req.body);

            let newCategory = await repo.addCategory(
                    req.body.name,
                    req.body.description,
                    req.body.seasonal
                )
                .catch((err) => {
                    res.render('error', {
                        title: "Add Category",
                        linkActive: 'error',
                        errors: 'none',
                        errDB: JSON.stringify(err)
                        //DRUGA VRSTA - BAZA ODBILA RADI DUPLIKATA
                    });
                });

            res.redirect('/management');


        }

    });



module.exports = router;