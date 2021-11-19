//Contante qui appel jsonwebtoken
const jwt = require('jsonwebtoken');
//Contante qui appel la clef de securité
const jwtSecurity = require('../Security/tokenSecurity')
//Constante qui appel bcrypt
const bcrypt = require('bcrypt');
//Constante qui appel les models utilisateur
const userModels = require('../models/userModels');
require('dotenv').config();

let models = new userModels();

//Fonction crétion utilisateur
exports.signup = (req, res) => {
    const mail = req.body.mail;
    const pass = req.body.pass;
    const lastName = req.body.lname;
    const firstName = req.body.fname;
    if (/[a-z]/ && /[A-Z]/ && /[1-9]/ && /[&$£%!§]/.test(pass) === true && pass.length >= 8) {
        bcrypt.hash(pass, 10)
            .then(hash => {
                let sqlInserts = [mail, hash, lastName, firstName];
                models.signup(sqlInserts)
                    .then((response) => {
                        res.status(201).json(JSON.stringify(response))
                    })
                    .catch((error) => {
                        console.log(error);
                        res.status(400).json({error})
                    })
            })
            .catch(error => res.status(500).json(error));
    } else {
        if (/[a-z]/ && /[A-Z]/ && /[1-9]/ && /[&$£%!§]/.test(pass) === false && pass.length <= 8) {
            console.log("Veuillez renseigner un mots de passe contenant aux moins une majuscule, une minuscule, un chiffre, un symbole '&$£%!§' et aux moins 8 caractères.")
        }
    }
};

//Fonction connexion utilisateur
exports.login = (req, res) => {
    const mail = req.body.mail;
    const pass = req.body.pass;
    let sqlInserts = [mail];
    models.login(sqlInserts, pass)
        .then((response) => {
            res.status(200).json(JSON.stringify(response))
        })
        .catch((error) => {
            res.status(400).json(error)
        })

}

//Fonction voir un utilisateur par son id
exports.showUserById = (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, jwtSecurity);
    const userId = decodedToken.userId;
    let sqlInserts = [userId];
    models.showUser(sqlInserts)
        .then((response) => {
            res.status(200).json(JSON.stringify(response))
        })
        .catch((error) => {
            console.log(error);
            res.status(400).json(error);
        })
};

//Fonction modification utilisateur
exports.updateUser = (req, res) => {
    const mail = req.body.mail;
    const lastName = req.body.lname;
    const firstName = req.body.fname;
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, jwtSecurity);
    const userId = decodedToken.userId;
    let sqlInserts = [mail, lastName, firstName, userId];
    models.modifyUser(sqlInserts)
        .then((response) => {
            res.status(200).json(JSON.stringify(response))
        })
        .catch((error) => {
            console.log(error)
            res.status(400).json(error)
        })
};

//Fonction suppression utilisateur
exports.deleteUser = (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, jwtSecurity);
    const userId = decodedToken.userId;
    let sqlInserts = [userId];
    models.delUser(sqlInserts)
        .then((response) => {
            res.status(200).json(JSON.stringify(response))
        })
        .catch((error) => {
            console.log(error);
            res.status(400).json(error)
        })
};