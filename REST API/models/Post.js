const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Model = mongoose.model;
const { String, Number, Boolean, ObjectId } = Schema.Types;

const postsSchema = new Schema({

    description: {
        type: String,
        required: true,
    },
    
    date: {
        type: String
    },

    author: {
        type: ObjectId,
        ref: "User"
    }

});

module.exports = new Model('Posts', postsSchema);