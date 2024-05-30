const jwt = require('jsonwebtoken')

const jwtSecret = process.env.JWT_SECRET;

// check login middleware
const authMiddleware = (req, res, next) => {
    const token = req.cookies.token;
  
    if(!token) {
      return res.status(401).json( { message: 'Unauthorized'} );
    }
  
    try {
      const decoded = jwt.verify(token, jwtSecret); 
        req.userId = decoded.userId;
        console.log(req.userId)
      next();
    } catch(error) {
      res.status(401).json( { message: 'Unauthorized'} );
    }
  }

module.exports = authMiddleware;