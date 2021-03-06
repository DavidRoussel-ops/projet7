//Contante qui appel jsonwebtoken
const jwt = require('jsonwebtoken');
//Contante qui appel la clef de securité
const jwtSecurity = require('../Security/tokenSecurity');
//Contante qui appel les models post
const PostModels = require('../models/postModels');
require('dotenv').config();

let postModels = new PostModels();

//Fonction pour voir tous les posts
exports.allPost = (req, res) => {
    postModels.allPost()
        .then((response) => {
            res.status(200).json(JSON.stringify(response));
        });
};

//Fonction créer un post
exports.createPost = (req, res) => {
    let userId = req.body.userId;
    let com = req.body.com;
    let img = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
    let sqlInserts = [userId, com, img];
    postModels.createPost(sqlInserts)
        .then((response) => {
            res.status(201).json(JSON.stringify(response));
        })
};

//Fonction suppression de post
exports.deletePost = (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, jwtSecurity);
    const userId = decodedToken.userId;
    const postId = req.params.id;
    let sqlInserts1 = [postId];
    let sqlInserts2 = [postId, userId];
    postModels.delPost(sqlInserts1, sqlInserts2)
        .then((response) => {
            res.status(200).json(JSON.stringify(response));
        })
        .catch((error) => {
            console.log(error);
            res.status(400).json(JSON.stringify(error));
        })
};

//Fonction suppression de post administrateur
exports.deletePostAdmin = (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, jwtSecurity);
    const admin = decodedToken.admin;
    if (admin === 1) {
        let postId = req.params.id;
        let sqlInserts = [postId];
        postModels.delPostAdmin(sqlInserts)
            .then((response) => {
                res.status(200).json(JSON.stringify(response));
            })
    } else {
        res.status(400).json({error: 'Requête non authorisée'})
    }
};

//Fonction voir tous les commentaires
exports.comment = (req, res) => {
    let postId = req.params.id;
    let sqlInserts = [postId];
    postModels.comment(sqlInserts)
        .then((response) => {
            res.status(200).json(JSON.stringify(response));
        });
};

//Fonction créer un commentaire
exports.createCom = (req, res) => {
    let userId = req.body.userId;
    const postId = req.params.id;
    let com = req.body.content;
    let sqlInserts = [userId, postId, com];
    postModels.createCom(sqlInserts)
        .then((response) => {
            res.status(201).json(JSON.stringify(response))
        })
};

//Fonction modifié un commentaire
exports.updateCom = (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, jwtSecurity);
    const userId = decodedToken.userId;
    let com = req.body.content;
    let comId = req.params.id;
    let sqlInserts1 = [comId];
    let sqlInserts2 = [com, comId, userId];
    postModels.modifyCom(sqlInserts1, sqlInserts2)
        .then((response) => {
            res.status(201).json(JSON.stringify(response));
        })
        .catch((error) => {
            console.log(error);
            res.status(400).json(JSON.stringify(error));
        })
};

//Fonction suppression commentaire
exports.deleteCom = (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, jwtSecurity);
    const userId = decodedToken.userId;
    const comId = req.params.id;
    let sqlInserts1 = [comId];
    let sqlInserts2 = [comId, userId];
    postModels.delCom(sqlInserts1, sqlInserts2)
        .then((response) => {
            res.status(200).json(JSON.stringify(response));
        })
        .catch((error) => {
            console.log(error);
            res.status(400).json(JSON.stringify(error));
        })
};

//Fonction suppression commentaire administrateur
exports.deleteComAdmin = (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, jwtSecurity);
    const admin = decodedToken.admin;
    if (admin === 1) {
        let commentId = req.params.id;
        let sqlInserts = [commentId];
        postModels.delComAdmin(sqlInserts)
            .then((response) => {
                res.status(200).json(JSON.stringify(response));
            })
    } else {
        res.status(400).json({error: 'Requête non authorisée'})
    }
};