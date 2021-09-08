const Sauce = require('../models/sauce')
const fs = require('fs')

// Get all
exports.getAllSauces = (req, res, next) => {
    Sauce.find()
        .then(sauces => res.status(200).json(sauces))
        .catch(error => res.status(400).json({ error }));
};

// Get one
exports.getOneSauce = (req, res) => {
    res.json(res.sauce)
  }



// Create one
exports.CreateASauce = async (req, res) => {
    const sauceObject = JSON.parse(req.body.sauce)
    delete sauceObject._id;
    const sauce = new Sauce ({
      ...sauceObject, 
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    })
    sauce.save()
    .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
    .catch(error => res.status(400).json({ error }));
  }




// Update one 
exports.updateASauce =  async  (req, res) => {
    const sauceObject = JSON.parse(req.body.sauce)
    if (req.body.name != null) {
      res.sauce.name = req.body.name
    }
    if (req.body.manufacturer != null) {
      res.subscriber.manufacturer = req.body.manufacturer
    }
    if (req.body.description != null) {
        res.subscriber.description = req.body.description
      }
    if (req.body.imageurl != null) {
    res.subscriber.imageurl = req.body.imageurl
    }
    if (req.body.mainPepper != null) {
        res.subscriber.mainPepper = req.body.mainPepper
        }
    try {
      const updatedSauce = await res.sauce.save()
      res.json(updatedSauce)
    } catch (err) {
      res.status(400).json({ message: err.message })
    }
  }

// delete one
exports.DeleteASauce = async (req, res) => {
    try {
      await res.sauce.remove()
      res.json({ message: 'Deleted Sauce' })
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  }


// middleware get one sauce 
exports.getSauce = async (req, res, next) => {
    let sauce
    try {
      sauce = await Sauce.findById(req.params.id)
      if (sauce== null) {
        return res.status(404).json({ message: 'Cannot find subscriber' })
      }
    } catch (err) {
      return res.status(500).json({ message: err.message })
    }
  
    res.sauce = sauce
    next()
  }