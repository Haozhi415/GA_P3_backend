const mongoose = require("mongoose");
// optional shortcut to the mongoose.Schema class
const Schema = mongoose.Schema;




const recipeSchema = new Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        // required: true
    },

    title: {
        type: String,
        required: true,
        default: null
    },

    tags: [String],

    ingredients: [String],

    preptime: {
        type: String,
        default: null
    },

    instructions: {
        type: [String],
        default: null
    },

    picture_url: {
        type: String,
        default: null
    },

    reviews: [{
        type: Schema.Types.ObjectId,
        ref: 'Review'
    }],

    difficulty: {
        type: String,
        enum: ['BEGINNER', 'INTERMEDIATE', 'ADVANCED', 'EXPERT'],
        default: null
    },

},
    {
        timestamps: true
    }
);

// Compile the schema into a model and export it
module.exports = mongoose.model("Recipe", recipeSchema);