const express = require('express');
const router = express.Router();
const db = require('../config/db');
const pageModel = require('../models/page');
const menuModel = require('../models/menu');
/* GET/POST home page. */
router.all('/', async function (req, res, next) {
  routePage(req, res, next);
});
/* GET/POST specific page. */
router.all('/:pageKey', async function (req, res, next) {
  routePage(req, res, next);
});


//GET add page
router.post('/add', async function (req, res, next) {
  if (req.auth.loggedIn) {
    //(pageKey, pageDate, UserID)
    let added = await pageModel.addPage(req.body, req.auth.userID);

    res.render('page/edit', {
      mainMenu: menuData,
      sideMenu: false,
      auth: req.auth
    });

  } else {
    next();
  }
  //routePage(req, res, next);
});

//POST edit page
router.post('/edit/:pageKey', async function (req, res, next) {
  if (req.auth.loggedIn) {
    console.log(req.body, req.auth.userID)
    //(pageKey, pageDate, UserID)
    let update = pageModel.editPage(req.params.pageKey, req.body, req.auth.userID);


    const pageData = await pageModel.getPage(req.params.pageKey);
    const menuData = await menuModel.getMenu("main");
    res.render('page/edit',
      {
        title: pageData.title,
        page: pageData,
        mainMenu: menuData,
        sideMenu: false,
        auth: req.auth
      });

  } else {
    next();
  }
  //routePage(req, res, next);
});




/* GET page edit form. */
router.get('/edit/:pageKey', async function (req, res, next) {
  if (req.auth.loggedIn) {
    const pageData = await pageModel.getPage(req.params.pageKey);
    const menuData = await menuModel.getMenu("main");
    res.render('page/edit',
      {
        title: pageData.title,
        page: pageData,
        mainMenu: menuData,
        sideMenu: false,
        auth: req.auth
      });

  } else {
    next();
  }
  //routePage(req, res, next);
});
//let data = rows[0];

async function routePage(req, res, next) {
  if (req.params.pageKey === undefined) {
    req.params.pageKey = "home";
  }
  const pageData = await pageModel.getPage(req.params.pageKey);
  console.log(pageData);
  if (pageData === undefined) {
    next();
  }
  const menuData = await menuModel.getMenu("main");
  const sideData = await menuModel.getMenu("side");
  //console.log(menuData);
  res.render('page/view', { title: pageData.title, page: pageData, mainMenu: menuData, sideMenu: sideData, auth: req.auth });
} // res.render('page/edit'

module.exports = router;
