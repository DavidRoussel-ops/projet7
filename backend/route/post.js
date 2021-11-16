//Constante qui appel express
const express = require('express');
//Constante qui appel le router d'express
const router = express.Router();
//Constante qui appel la sécurité
const userToken = require('../Security/token');
//Constante qui appel multer
const multer = require('../middleware/multer');
//Constante qui appel les controllers posts
const postCtrl = require('../controllers/post');

//Route utiliser pour les posts et commentaires
try {
    router.get('/', postCtrl.allPost);
    router.post('/', multer, postCtrl.createPost);
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