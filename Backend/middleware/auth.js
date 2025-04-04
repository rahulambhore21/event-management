const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ message: 'Access denied' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);
    req.user = { id: decoded.id, ...decoded }; // Ensure _id is included
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
};