//Constante qui appel express
const express = require('express');
//Constante qui appel le router d'express
const router = express.Router();
//Constante qui appel la sécurité
const userToken = require('../Security/token');
//Constante qui appel les controllers utilisateurs
const userCtrl = require("../controllers/user");

//Route utiliser pour les utilisateur
try {
    router.post('/create', userCtrl.signup);
    router.post('/login', userCtrl.login);
    router.get('/', userToken, userCtrl.showUserById);
    router.put('/', userToken, userCtrl.updateUser);
    router.delete('/', userToken, userCtrl.deleteUser);
} catch (error) {
    console.log(error);
}

module.exports = router;