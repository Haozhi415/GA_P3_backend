const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    recipe: {
        type: Schema.Types.ObjectId,
        ref: 'Recipe',
        required: true
    },
    // user: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'User',
    //     required: true,
    //     default: function () {
    //         // Assuming req.user contains the decoded user information
    //         return req.user._id;
    //     }
    // },
    title: {
        type: String
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    content: {
        type: String,
        required: true
    },
    images: {
        type: [String],  // Array of image URLs or paths
        default: []      // Default to an empty array
    }
}, {
    timestamps: true
  });

module.exports = mongoose.model("Review", reviewSchema);