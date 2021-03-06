//Constante qui appel express.
const express = require('express');
//Constante qui appel body-parser.
const bodyParser = require('body-parser');
//Constante qui appel cors.
const cors = require('cors')
//Constante qui appel path.
const path = require('path');
//Constante qui appel node-esapi.
const esapi = require('node-esapi');
//Constante qui appel toobusy-js.
const tooBusy = require('toobusy-js');
//Constante qui appel express-brute.
const expressBrute = require('express-brute');
//Constante qui appel express-rate-limit.
const rateLimit = require('express-rate-limit');
//Constante qui appel helmet.
const helmet = require('helmet');
//Constante qui appel helmet-csp.
const csp = require('helmet-csp');
//Constante qui appel nocache
const nocache = require('nocache');
const app = express();

require('dotenv').config();

const postRoutes = require('./route/post');
const userRoutes = require('./route/user');
let corsOption = {
    origin: "http://localhost:8080"
}

const port = process.env.DB_PORT;

//Header utiliser par l'application.
app.use(((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
}));

app.use(cors(corsOption));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/posts', postRoutes);
app.use('/users', userRoutes);
app.use('/images', express.static(path.join(__dirname, 'images')));

//Utilisation du module helmet pour passer en https.
app.use(helmet.hsts());
//Détermine si une page peut être chargée via un frame ou un iframe.
app.use(helmet.frameguard({action: 'SAMEORIGIN'}));
//Indique au navigateur de ne pas modifier les types MIME de l'en-tête "Content-Type".
app.use(helmet.noSniff());
//Utilisation d'helmet-csp pour prévenir des attaque XSS et du Clickjacking.
app.use(csp({
    directives: {
        defaultSrc: ['self'], //Valeur par default.
        scriptSrc: ['self'], //Prévention attaque XSS.
        frameAncestors: ['none'], //Prévention attaque Clickjacking.
        imgSrc: ['self'],
        styleSrc: ['none']
    }
}));

//Empêche les navigateurs de mettre en cache les réponses données.
app.use(nocache())
//Empêche Internet Explorer d'exécuter les fichiers télécharger dans le contexte du site.
app.use(helmet.ieNoOpen());
//Evite la fuite d'information des technologies utilisée côté serveur.
app.use(helmet.hidePoweredBy({setTo: 'PHP 4.2.0'}));

//Vérification du nombre d'essai de connexion.
let limiter = rateLimit('/users', 'GET', 5, 500);
app.use(limiter);

let store = new expressBrute.MemoryStore();
let bruteForce = new expressBrute(store);

app.post('/users', bruteForce.prevent,
    function (req, res, next) {
        res.send(' Success !')
    });

esapi.encoder().encodeForHTML();
esapi.encoder().encodeForJavaScript();

app.use(function (req, res, next) {
    if (tooBusy()) {
        res.send(503, 'Je suis occupé en ce moment, désolé.')
    } else {
        next();
    }
})

tooBusy.maxLag(10);

tooBusy.interval(250);

let currentMaxLag = tooBusy.maxLag();
let currentInterval = tooBusy.interval();

tooBusy.onLag(function (currentLag) {
    console.log( " Retard de boucle d'événement détecté! Latence: " + currentLag + " ms ");
});

app.listen(port, function () {
    console.log(`listen on port ${port}`);
});