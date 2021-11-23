const fs = require('fs');

const Sauce = require('../models/sauce');

// *** GET -> /api/sauces
exports.getAllSauces = (req, res, next) => {
    Sauce.find()
    .then(sauces => res.status(200).json(sauces))
    .catch(error => res.status(400).json({ error: error }))
}

// *** GET -> /api/sauces/:id
exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
    .then(sauce => res.status(200).json(sauce))
    .catch(error => res.status(404).json({ error: error }))
}


// *** POST -> /api/sauces
exports.createSauce  = (req, res, next) => {
    const newSauce = JSON.parse(req.body.sauce);
    delete newSauce._id;
    
    const sauce = new Sauce({
        ...newSauce,
        likes: 0,
        dislikes: 0,
        usersLiked: [],
        usersDisliked: [],
        imageUrl: "https://cdn.carrefour.eu/300_04995704_9002490211028_00.jpeg" // TEMP
    });
    sauce
    .save()
    .then(() => res.status(201).json({ message: "New sauce" }))
    .catch((error) => res.status(400).json({ error }));
};

// *** PUT -> /api/sauces/:id
exports.modifySauce = (req, res, next) => {}

// *** DELETE -> /api/sauces/:id
exports.deleteSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id }).then((sauce) => {
        Sauce.deleteOne({ _id: req.params.id }) 
        .then(() => res.status(200).json({ message: "Deleted a sauce" }))
    });
};