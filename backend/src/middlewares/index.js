const jwt = require('jsonwebtoken');
const { getUserId } = require('../repositories');

const checkJWT = async (req, res, next) => {
  let token = req.cookies.token; 
  if (!token) {
    return res.status(401).json({ error: 'Missing token!' });
  }

  try {
    const decoded = jwt.verify(token, process.env.TOKEN_CODE);
    const user = await getUserId(decoded.id);
    if (user) {
      req.user = decoded; 
      next();
    } else {
      return res.status(401).json({ error: 'Unauthorized' });
    }
  } catch (error) {
    return res.status(400).json({ error: 'Invalid token' });
  }
};

const checkAccess = (expectedRole) => {
  return async (req, res, next) => {
    let token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ error: 'Missing token!' });
    }

    try {
      const decoded = jwt.verify(token, process.env.TOKEN_CODE);
      const user = await getUserId(decoded.id);
      if (user && user.role === expectedRole) {
        req.user = decoded; 
        next();
      } else {
        return res.status(403).json({ error: 'Access denied' });
      }
    } catch (error) {
      return res.status(400).json(error);
    }
  };
};

module.exports = {
  checkJWT,
  checkAccess,
};
