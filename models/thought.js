const { Schema, model } = require('mongoose');
const reactionSchema = require('./reaction')

const thoughtSchema = new Schema(
    {
        thoughtText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [
            reactionSchema
        ]
    },
    {
        toJSON:{
            virtuals: true
        },
        id: false
    }
);
reactionSchema.virtual('reactionCount').get(function(){ return this.reactions.length; })
const Thought = model('Thought', thoughtSchema);
module.exports = Thought;