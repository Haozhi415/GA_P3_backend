var jwt = require('jsonwebtoken');

module.exports = {
    createJWT,
    getExpiry,
    verifyJWT
}

function createJWT(payload) {
    return jwt.sign(
        // data payload
        { payload },
        process.env.SECRET,
        { expiresIn: "24h" }
    );
}

function getExpiry(token) {
    const payloadBase64 = token.split('.')[1];
    const decodedJson = Buffer.from(payloadBase64, 'base64').toString();
    const decoded = JSON.parse(decodedJson)
    const exp = decoded.exp;
    return exp
}