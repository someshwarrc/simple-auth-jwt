//auth middleware for verifying jwt
const jwt   =  require('jsonwebtoken');

module.exports  =   (req, res, next) => {
    let token   =   req.header('auth-token')

    if(!token) return res.status(401).send('Access Denied'); //No token

    try{ 
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user    =   verified;
        next();
    } catch(err) {
        return res.status(400).send('Invalid Token')
    }
}