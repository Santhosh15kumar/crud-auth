const jwt = require('jsonwebtoken')
const authenticateToken = (req, res, next) => {
    const jwtToken = req.cookies
    console.log("jwtToken",jwtToken);
    if (jwtToken === undefined) {
        return res.status(401).json({ message: "Invalid jwt Token" });
    } else {
        jwt.verify(jwtToken.jwt, "MY_SECRET_TOKEN", async (error, payload) => {
            if (error) {
                return res.status(401).json({ message: "Invalid jwt Token" });
            } else {
                next();
            }
        });
    }
};

module.exports = {
    authenticateToken
}

