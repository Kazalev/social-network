const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Model = mongoose.model;
const { String, Number, Boolean, ObjectId } = Schema.Types;

const postsSchema = new Schema({

    post: {
        type: String,
        required: true,
    },

    likes: {
        type: Number,
        required: true,
        default: 0
    },

    author: {
        type: ObjectId,
        ref: "User"
    }
}, { timestamps: { createdAt: 'created_at' } });

module.exports = new Model('Posts', postsSchema);