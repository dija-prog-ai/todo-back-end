const jwt = require('jsonwebtoken')


const logger = (req, res, next) => {
    const timestamp = new Date().toISOString();
    console.log(`${timestamp} - ${req.method} ${req.url}`);
    next(); 
};



const decodeToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return null;
  }
};


const isAuthenticated = (req, res, next) => {  
  const token = req.headers.authorization?.split(" ")[1];
  const decoded = decodeToken(token);
  if (!decoded) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  req.user = decoded;
  next();
};

module.exports = { logger, isAuthenticated };