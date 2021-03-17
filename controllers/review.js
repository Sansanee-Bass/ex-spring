const express = require('express');
const router = express.Router();
const db = require('../config/db');
const menuModel = require('../models/menu');
const reviewModel = require('../models/review');
const blog = require('../models/review');


router.get('/add', async function (req, res, next) {
    if (req.auth.loggedIn) {
        const menuData = await menuModel.getMenu("main");
        res.render("review/add",
            {
                title: "Add review",
                mainMenu: menuData,
                auth: req.auth,
            });
    } else {
        next();
    }
});

router.post('/add', async function (req, res, next) {
    if (req.auth.loggedIn) {
        const menuData = await menuModel.getMenu("main");
        const inserted = await reviewModel.addEntry(req.auth.userID, req.body);
        res.redirect("../review");

        ;
    } else {
        next();
    }
});
async function reviewPage(req, res, next) {
    if (req.params.start === undefined) {
        req.params.start = 0;
    }
    const menuData = await menuModel.getMenu("main");
    const reviewData = await reviewModel.getEntries(req.params.start, 3);
    let entries = [];
    for (let i = 0; i <= Math.floor(reviewData.rowCount / 5); i++) {
        entries[i] = { start: i, page: i + 1 };
    }
    reviewData.entries = entries;
    //console.log(reviewData.entries);
    res.render("review/list",
        {
            title: "Review",
            mainMenu: menuData,
            reviewEntries: reviewData,
            auth: req.auth,
        });
}
router.all('/:start', async function (req, res, next) {
    reviewPage(req, res, next);
});
/* review listing  */
router.all('/', async function (req, res, next) {
    reviewPage(req, res, next);
});
module.exports = router;



/* review listing  */
// router.all('/', async function (req, res, next) {
//     const menuData = await menuModel.getMenu("main");
//     const reviewData = await reviewModel.getEntries();
//     res.render("review",
//         {
//             title: "Review",
//             mainMenu: menuData,
//             reviewEntries: reviewData,
//             auth: req.auth,
//         });
// });
// module.exports = router;
