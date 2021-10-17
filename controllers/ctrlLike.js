
exports.likedislikeSauce = (req, res, next) => {

    console.log(req.body.like);


    switch (req.body.like) {
    
    case 1:
       
        Sauce.updateOne({
            _id: req.params.id
        }, {
        
            $push:{
                usersLiked: req.body.userId
            },
            
            $inc:{
                likes: +1
            },
        })
      
        .then(() => res.status(200).json({message : 'Like added !'}))
        .catch(error => res.status(400).json({ error }));
    break;    
    
    case -1:
     
        Sauce.updateOne({
           
            _id: req.params.id
        }, {
    
            $push:{
                usersDisliked: req.body.userId
            },
         
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

    