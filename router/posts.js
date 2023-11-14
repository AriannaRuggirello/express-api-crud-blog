// importo express
const express = require('express');
// // importo multer
// const multer = require("multer")
// istanza router
const router= express.Router();
// importo il controller
const homecontroller = require('../controller/home');

// index
// definizione rotte 
router.get('/', homecontroller.index);
// create
router.get('/create', homecontroller.create);
// store
router.post('/',homecontroller.store);
// show
router.get('/:slug', homecontroller.show);

// download image
router.get('/:slug/download', homecontroller.downloadImage);



// esporto
module.exports= router;