const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = new Schema(
  {
    recipe: {
      type: Schema.Types.ObjectId,
      ref: "Recipe",
      required: true,
    },
    recipeTitle: {
      type: String, // New field for recipe title
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      // required: true, // should be true in future once set up
      // default: function () {
      //     // Assuming req.user contains the decoded user information
      //     return req.user._id;
    },
    title: {
      type: String,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    content: {
      type: String,
      required: true,
    },
    images: {
      type: [String], // Array of image URLs or paths
      default: [], // Default to an empty array
    },
    status: {
      type: String,
      enum: ["active", "deleted"],
      default: "active",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Review", reviewSchema);
