const { application } = require('express')
const express = require('express')
const router = express.Router()
const multer = require('../middleware/multer-config')
const sauceCtrl = require('../controllers/sauce')
// require multer


// Get all
router.get('/', sauceCtrl.getAllSauces)

// Get one
router.get('/:id', sauceCtrl.getSauce, sauceCtrl.getOneSauce)

// Create one
router.post('/', multer, sauceCtrl.CreateASauce)

// Update one
router.put('/:id',  multer, sauceCtrl.getSauce, sauceCtrl.modifySauce)

// Delete one
router.delete('/:id', sauceCtrl.getSauce, sauceCtrl.DeleteASauce)

// Like or 
router.put('/:id/like', sauceCtrl.getSauce, sauceCtrl.likeSauce )

module.exports = router;