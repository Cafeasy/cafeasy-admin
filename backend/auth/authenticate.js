const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
    try {
        // const token = req.headers.authorization.split(' ')[1];
        const token = req.cookies['jwt'];
        const decode = jwt.verify(token, process.env.JWT_SECRET)

        req.user = decode
        next()
    } catch(errorr) {
        res.json({
            message: 'Otentikasi gagal'
        })
    }
}

module.exports = authenticate;