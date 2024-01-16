const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/* SAMPLE USER OBJECT FOR POSTMAN TESTING
{
    "name": "Mr Postman",
    "email": "mrpostman@gmail.com",
    "password": "password"
}
*/

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    recipes: [{
        type: Schema.Types.ObjectId,
        ref: 'Recipe'
    }],
    bio: {
        type: String
    },
    reviews: [{
        type: Schema.Types.ObjectId,
        ref: 'Review'
    }],
    favourites: [{
        type: Schema.Types.ObjectId,
        ref: 'Recipe'
    }]
}, 
    {
    timestamps: true
    }
);

module.exports = mongoose.model("User", userSchema);