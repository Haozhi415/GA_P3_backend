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
      type: String,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    userFirstName: {
      type: String,
    },
    userLastName: {
      type: String,
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
