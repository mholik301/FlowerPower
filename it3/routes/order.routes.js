var express = require('express');
var router = express.Router();

//instanciranje objekta/drivera za razgovor sa bazom
const repo = require('../db/store.repo');

router.get('/', async function (req, res, next) {
    categories = await repo.getCategories()
        .then((res) => {
            return res
        })
        .catch((err) => {
            console.log("Error while fetching categories in order.routes. err: \n" + err);
        })

    items = await repo.getItems()
        .then((res) => {
            return res
        })
        .catch((err) => {
            console.log("Error while fetching categories in order.routes. err: \n" + err);
        })

    for (let category of categories) {
        list = [];
        for (let item of items) {
            if (item.categoryid === category.id) {
                list.push(item);
            }
        }
        category.items = list;
    }

    res.render('order', {
        title: 'Order',
        linkActive: 'order',
        categories: categories,
        items: items
    });

});

module.exports = router;