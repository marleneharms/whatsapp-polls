const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
  const token = req.headers['x-auth-token'];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, 'process.env.TOKEN_SECRET', (err, user) => {
    console.info(err);
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

function generateAccessToken(user) {
  const data = {
    username: user.username,
    email: user.email,
  };
  return jwt.sign(data, 'process.env.TOKEN_SECRET', {
    expiresIn: '1h',
  });
}

module.exports = {
  authenticateToken,
  generateAccessToken,
};
