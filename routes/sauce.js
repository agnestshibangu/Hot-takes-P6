const { application } = require('express')
const express = require('express')
const router = express.Router()
const multer = require('../middleware/multer-config')
const auth = require('../middleware/auth')
const sauceCtrl = require('../controllers/sauce')
// require multer


// Get all
router.get('/', auth, sauceCtrl.getAllSauces)

// Get one
router.get('/:id', auth, sauceCtrl.getSauce, sauceCtrl.getOneSauce)

// Create one
router.post('/', auth, multer, sauceCtrl.CreateASauce)

// Update one
router.put('/:id', auth,  multer, sauceCtrl.getSauce, sauceCtrl.modifySauce)

// Delete one
router.delete('/:id', auth, sauceCtrl.getSauce, sauceCtrl.DeleteASauce)

// Like or 
router.post('/:id/like', auth, sauceCtrl.getSauce, sauceCtrl.likeSauce )


module.exports = router;