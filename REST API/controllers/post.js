const models = require('../models');

module.exports = {
    get: {
        getAllPosts: (req, res, next) => {
            models.Post.find().sort('-created_at').populate('author')
                .then((posts) => res.send(posts))
                .catch(next);
        },

        getPostById: (req, res, next) => {
            models.Post.find({ author: req.params.id }).sort('-created_at').populate('author')
                .then((posts) => res.send(posts))
                .catch(next);
        }
    },

    post: (req, res, next) => {
        const { post } = req.body;
        const { _id } = req.user;

        models.Post.create({ post, author: _id })
            .then((createdPost) => {
                return Promise.all([
                    models.User.updateOne({ _id }, { $push: { posts: createdPost } }),
                    models.Post.findOne({ _id: createdPost._id })
                ]);
            })
            .then(([modifiedObj, postObj]) => {
                res.send(postObj);
            })
            .catch(next);
    },

    put: (req, res, next) => {
        const id = req.params.id;
        const { post } = req.body;
        models.Post.updateOne({ _id: id }, { post })
            .then((updatedPost) => res.send(updatedPost))
            .catch(next)
    }
    ,

    delete: (req, res, next) => {
        const id = req.params.id;
        models.Post.deleteOne({ _id: id })
            .then((removedPost) => res.send(removedPost))
            .catch(next)
    }
};