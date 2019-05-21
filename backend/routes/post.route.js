const express = require('express');
const postController = require('../controller/postController')
let commentController = require('../controller/commentController');

let router = express.Router();

router.post('/createpost', postController.createPost);
router.put('/updatepost', postController.updatePost);
router.get('/getposts', postController.getPosts);
router.delete('/deletepost', postController.deletePost);
router.get('/getcomments/:id', commentController.getComments);
router.post('/createcomment/:id', commentController.createComment);

module.exports = router;