const mongoose = require('mongoose')

const userSauce = new mongoose.Schema({
    userId: {
        type: String
    },
    name: {
        type: String
    },
    manufacturer: {
        type: String
    },
    description: {
        type: String
    },
    mainPepper: {
        type: String
    },
    imageurl: {
        type: String
    },
    heat: {
        type: Number
    },
    likes: {
        type: Number
    },
    dislikes: {
        type: Number
    },
    // à corriger
    userLiked: {
        type: String
    },
    // à corriger
    usersDisliked: {
        type: String
    }

})

module.exports = mongoose.model('User', userSchema)