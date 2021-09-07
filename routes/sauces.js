const { application } = require('express')
const express = require('express')
const router = express.Router()
const Sauce = require('../models/sauce')

const sauceCtrl = require('../controllers/sauce')


// Get all
router.get('/', sauceCtrl. )

// Add one
router.post('/', getSauce, sauceCtrl. )

// Delete one
router.delete('/', getSauce, sauceCtrl. )

async function getSauce(req, res, next) {
    let sauce
    try {
      sauce = await Sauce.findById(req.params.id)
      if (sauce == null) {
        return res.status(404).json({ message: 'sauce' })
      }
    } catch (err) {
      return res.status(500).json({ message: err.message })
    }
  
    res.sauce = sauce
    next()
  }
  
