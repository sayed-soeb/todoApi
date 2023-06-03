const jwt = require('jsonwebtoken');
const User = require('../models/User');
const jwtSecret = 'secret'; // Replace with your preferred secret key

// Middleware for JWT authentication
exports.authenticateToken =async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  

  if (!token) {
    return res.sendStatus(401);
  }

  if (token) {
    try {
      // Verify the token
      const decodedToken = jwt.verify(token, jwtSecret);

      // Retrieve the user from the database based on the decoded token
      const user = await User.findById(decodedToken.userId);

      if (user) {
        // Attach the user's email to the request object
        req.user = {
          userId: user._id,
          email: user.email,
        };
        next();
      } else {
        return res.sendStatus(401);
      }
    } catch (error) {
      // Handle token verification error
      console.error('Token verification error:', error);
      return res.sendStatus(401);
    }
  } else {
    return res.sendStatus(401);
  }
};
