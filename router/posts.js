// importo express
const express = require('express');
// // importo multer
// const multer = require("multer")
// istanza router
const router= express.Router();
// importo il controller
const homecontroller = require('../controller/home');

// definizione rotte 
// index
router.get('/', homecontroller.index);

// show
router.get('/:slug', homecontroller.show);
// create
router.get('/create', homecontroller.create);
// store
router.post('/',homecontroller.store);
// destroy
router.delete("/:slug", homecontroller.destroy)

// download image
router.get('/:slug/download', homecontroller.downloadImage);



// esporto
module.exports= router;