const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const authHeader = req.get('Authorization');
  if (!authHeader) {
    req.isAuth = false;
    return next();
  }

  const token = authHeader.split(' ')[1];
  if (!token || token === '') {
    req.isAuth = false;
    return next();
  }

  // verify token
  try {
    decodedToken = jwt.verify(token, process.env.AUTH_SECRET);
  } catch (err) {
    req.isAuth = false;
    return next();
  }

  // token is valid and verified
  req.isAuth = true;
  req.userId = decodedToken.userId;
  next();
}
