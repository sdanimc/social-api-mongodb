const { error } = require('console');
const { User, Thought } = require('../models');
module.exports = {
    getAllUsers(req,res){
        User.find()
        .select('-__v')
        .then(userData => res.json(userData))
        .catch(error => {
            console.log(error);
            res.status(400).json(error);
        });
    },
    getOneUser(req, res){
        User.findOne({_id: req.params.userId})
        .select('-__v')
        .then((userData) => 
        !userData
        ? res.status(404).json({message: 'No user with that id'})
        : res.json(userData)
        )
        .catch((error) => res.status(500).json(error));
    },
    addUser(req, res){
        User.create(req.body)
        .then((userData)=> res.json(userData))
        .catch((error)=> { console.log(error);
        return res.status(500).json(error);
        })
    },
    updateUser(req, res){
        User.findOneAndUpdate(
            { _id: req.params.userId},
            {$set: req.body},
            { runValidators: true, new: true}
        )
        .then((userData) => 
        !userData
        ? res.status(404).json({message: 'no user with this id'})
        : res.json(userData)
        )
        .catch((error) => res.status(500).json(error));
    },
    deleteUser(req, res){
        User.findOneAndDelete({_id: req.params.userId})
        .then((userData)=> 
        !userData
        ? res.status(404).json({message: 'no user with this id'})
        : res.json({message: 'User has been delete'})
        )
        .catch((error) => res.status(500).json(error));
    }
}