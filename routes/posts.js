var express = require('express');
var router = express.Router();
const PostsControllers = require('../controllers/post.js');

/**
 *  GET  全部
 */
router.get('/', PostsControllers.getAllPost);

/**
 *  GET  單筆
 */
router.get('/:id', PostsControllers.getOnePost);
/**
 *  POST
 */
router.post('/', PostsControllers.createPost);

/**
 *  PATCH
 */
router.patch('/:id', PostsControllers.updatePosts);

/**
 *  DELETE 單筆
 */
router.delete('/:id', PostsControllers.deleteOnePost);

/**
 *  DELETE 多筆
 */
router.delete('/', PostsControllers.deleteAllPost);

module.exports = router;
