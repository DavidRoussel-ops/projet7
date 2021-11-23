const JWT = require('jsonwebtoken');

function doneJwt(user) {
    const id = user.id;
    const expiresIn = "24H";
    const payload = {
        sub: id,
        iat: Date.now(),
    };
    const signedToken = JWT.sign(payload, "GROUPOMANIE_TOKEN_SECURITY", {expiresIn: expiresIn});
    return {
        token: "Bearer" + signedToken,
        expires: expiresIn,
    };
}

function getUserId(req) {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = JWT.verify(token, "GROUPOMANIE_TOKEN_SECURITY");
    const userId = decodedToken.sub;
}

module.exports.doneJwt = doneJwt;
module.exports.getUserId = getUserId;