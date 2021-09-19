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
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
      dislikes: 0,
      likes: 0,
      usersLiked: [],
      usersDisliked: []
    })
    sauce.save()
    .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
    .catch(error => res.status(400).json({ error }));
  }

// Update one 
// exports.updateASauce = (req, res, next) => {
//   const sauceObject = { ...req.body };
//   Sauce.updateOne({ _id: req.params.id}, { ...sauceObject, _id: req.params.id })        
//       .then(() => res.status(200).json({message : 'Sauce modified !'}))
//       .catch(error => res.status(400).json({ error }));  
// };

// Modify 
exports.modifySauce = (req, res, next) => {
    
  if (req.file) {
      Sauce.findOne({ _id: req.params.id })
      .then((sauce) => {
          const filename = sauce.imageUrl.split('/images/')[1];
          fs.unlinkSync(`images/${filename}`);  
      })
  }

  const sauceObject = req.file ? {
      ...JSON.parse(req.body.sauce),
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  } : { ...req.body };

  Sauce.updateOne({ _id: req.params.id}, { ...sauceObject, _id: req.params.id })        
      .then(() => res.status(200).json({message : 'Sauce modified !'}))
      .catch(error => res.status(400).json({ error }));  
      
};


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


// like or dislike sauce 
  exports.likeSauce = (req, res, next) => {

    console.log(req.body.like);
    console.log('user' + req.body.userId)
    console.log('sauce' + req.params.id)
     
    switch (req.body.like) {
    
  
    case 1:
        
        Sauce.updateOne({_id: req.params.id}, {
            
            $push:{usersLiked: req.body.userId },
        
            $inc:{likes: +1},
        })

        .then(() => res.status(200).json({message : 'Like added !'}))
        .catch(error => res.status(400).json({ error }));
    break;    
  
    case -1:

        Sauce.updateOne({
           
            _id: req.params.id
        }, {

            $push:{usersDisliked: req.body.userId },

            $inc:{
                dislikes: +1
            },
        })
    
        .then(() => res.status(200).json({message : 'Diskike added !'}))
        .catch(error => res.status(400).json({ error }));
    break;

    case 0:
        
      Sauce.findOne({
          _id: req.params.id
      })

      .then((sauce) => {
          
          if (sauce.usersLiked.includes(req.body.userId)) {
              
              Sauce.updateOne({
                  _id: req.params.id
              }, {
                
                  $pull:{
                      usersLiked: req.body.userId
                  },
                
                  $inc:{
                      likes: -1
                  },                   
              })
              .then(() => res.status(200).json({message : 'Like deleted !'}))
              .catch(error => res.status(400).json({ error }));
          }

  
          if (sauce.usersDisliked.includes(req.body.userId)) {
              
              Sauce.updateOne({
                  _id: req.params.id
              }, {
                  $pull:{
                      usersDisliked: req.body.userId
                  },
                  $inc:{
                      dislikes: -1
                  },                   
              })
              .then(() => res.status(200).json({message : 'Dislike deleted !'}))
              .catch(error => res.status(400).json({ error }));
          }
      })
      .catch(error => res.status(400).json({ error }));

  break;


    default: console.error("Error");
    }

};