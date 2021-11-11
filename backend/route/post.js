const express = require('express');
const router = express.Router();
const userToken = require('../Security/token');
const multer = require('../middleware/multer');
const postCtrl = require('../controllers/post');

try {
    router.get('/', postCtrl.allPost);
    router.post('/', multer, postCtrl.createPost);
    router.put('/:id', userToken, multer ,postCtrl.updatePost);
    router.delete('/:id', userToken, postCtrl.deletePost);
    router.delete('/admin/:id', userToken, postCtrl.deletePostAdmin);

    router.get('/:id/comments', postCtrl.comment);
    router.post('/:id/comments', postCtrl.createCom);
    router.put('/comments/:id', userToken, postCtrl.updateCom);
    router.delete('/comments/:id', userToken, postCtrl.deleteCom);
    router.delete('/admin/comments/:id', userToken, postCtrl.deleteComAdmin);

} catch (error) {
    console.log(error);
}

module.exports = router;