const { error } = require('console');
const { User, Thought } = require('../models');
module.exports = {
    getAllThoughts(req,res){
        Thought.find()
        .sort({ createdAt: -1 })
        .then(thoughtData => res.json(thoughtData))
        .catch(error => {
            console.log(error);
            res.status(500).json(error);
        });
    },
    getOneThought(req, res){
        Thought.findOne({_id: req.params.thoughtId})
        .select('-__v')
        .then((thoughtData) => 
        !thoughtData
        ? res.status(404).json({message: 'No thought with that id'})
        : res.json(thoughtData)
        )
        .catch((error) => res.status(500).json(error));
    },
    addThought(req, res){
        Thought.create(req.body)
        .then((thoughtData)=> res.json(thoughtData))
        .catch((error)=> { console.log(error);
        return res.status(500).json(error);
        })
    },
    updateThought(req, res){
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId},
            {$set: req.body},
            { runValidators: true, new: true}
        )
        .then((thoughtData) => 
        !thoughtData
        ? res.status(404).json({message: 'no thought with this id'})
        : res.json(thoughtData)
        )
        .catch((error) => res.status(500).json(error));
    },
    deleteThought(req, res){
        Thought.findOneAndDelete({_id: req.params.thoughtId})
        .then((thoughtData)=> 
        !thoughtData
        ? res.status(404).json({message: 'no thought with this id'})
        : res.json({message: 'thought has been delete'})
        )
        .catch((error) => res.status(500).json(error));
    }
}