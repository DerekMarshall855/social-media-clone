const Post = require('../models/post_model');

/*
    Add follower function later - Add get all followed posts
*/

createPost = (req, res) => {
    const body = req.body;
    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a message to post'
        });
    }
    console.log(body);
    const post = new Post(body);

    if (!post) {
        return res.status(400).json({ success: false, error: err });
    }

    post
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: post._id,
                message: 'Post Created'
            });
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'Post not created'
            });
        });
}

deletePost = async (req, res) => {
    await Post.findOneAndDelete({ _id: req.params.id }, (err, post) => {
        if (err) {
            return res.status(400).json({ success: false, error: err });
        }
        if (!post) {
            return res
                   .status(404)
                   .json({ success: false, error: 'Post not found' });
        }

        return res.status(200).json({ success: true, data: post });
    }).catch(err => console.log(err));
}

editPost = async (req, res) => {
    const update = { message: req.body.message, comments: req.body.comments };
    await Post.findOneAndUpdate({ _id: req.params.id }, update, (err, post) => {
        if (err) {
            return res.status(400).json({ success: false, error: err });
        }
        if (!post) {
            return res
                   .status(404)
                   .json({ success: false, error: 'Post not found' });
        }
        console.log("Edit Successful");
        return res.status(200).json({ success: true, data: post });
    }).catch(err => console.log(err));
}

searchPostUser = async (req, res) => {
    await Post.find({ username: req.params.username }, (err, post) => {
        if (err) {
            return res.status(400).json({ success: false, error: err });
        }
        if (!post) {
            return res
                   .status(404)
                   .json({ success: false, error:'Post not found' });
        }
        return res.status(200).json({ success: true, data: post });
    }).catch(err => console.log(err));
}

//Issue, uploads twice
editCommentsByID = async (req, res) => {
    const update = req.body.comment;
    console.log(update);
    await Post.findOne({ _id: req.params.id }, (err, post) => {
        if (err) {
            return res.status(400).json({ success: false, error: err });
        }
        if (!post) {
            return res
                   .status(404)
                   .json({ success: false, error: 'Post not found' });
        }
        console.log("Search & Edit Successful");

        post.comments.push(update);
        post.save()
        .then(() => {
            return res.status(200).json({
                success: true,
                data: post
            });
        }).catch(() => {
            return res.status(400).json({ success: false, error: err });
        })
    }).catch(err => console.log(err));
}

searchPostID = async (req, res) => {
    await Post.findOne({ _id: req.params.id }, (err, post) => {
        if (err) {
            return res.status(400).json({ success: false, error: err });
        }
        if (!post) {
            return res
                   .status(404)
                   .json({ success: false, error:'Post not found' });
        }
        console.log("Search successful");
        return res.status(200).json({ success: true, data: post });
    }).catch(err => console.log(err));
}

/*
regular expression should be used here.
/brother/ all that contain brother
/^brother/ start with brother
/Brother/i all containing brother - i flag makes case insensitive
*/
searchPostContent = async (req, res) => {
    let temp = new RegExp(req.params.message, 'i');  // Create regular expression to search content of message, does not have to match exactly (case insensitive)
    await Post.find({ message: temp }, (err, post) => {
        if (err) {
            return res.status(400).json({ success: false, error: err });
        }
        if (!post || post.length == 0) {  // RegExp can return empty [] but does not register as null, check length incase
            return res
                   .status(404)
                   .json({ success: false, error:'Post not found' });
        }
        return res.status(200).json({ success: true, data: post });
    }).catch(err => console.log(err));
}

getAllPosts = async (req, res) => {
    await Post.find({}, (err, post) => {
        if (err) {
            return res.status(400).json({ success: false, error: err });
        }
        if (!post || post.length == 0) {
            return res
                   .status(404)
                   .json({ success: false, error:'Post not found' });
        }
        return res.status(200).json({ success: true, data: post });
    }).catch(err => console.log(err));
}

// Given a post id, return all its comments
getAllComments = async (req, res) => {
    await Post.findOne({ _id: req.params.id }, (err, post) => {
        if (err) {
            return res.status(400).json({ success: false, error: err });
        }
        if (!post) {
            return res
                   .status(404)
                   .json({ success: false, error:'Post not found' });
        }
        return res.status(200).json({ success: true, data: post.comments });  // Just return comments of a post
    }).catch(err => console.log(err));
}

module.exports = {
    createPost,
    deletePost,
    editPost,
    editCommentsByID,
    searchPostUser,
    searchPostID,
    searchPostContent,
    getAllPosts,
    getAllComments
}