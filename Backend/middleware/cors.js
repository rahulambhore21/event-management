/**
 * Custom CORS middleware to ensure proper headers are set
 * for cross-origin requests
 */
module.exports = function(req, res, next) {
  // Allow requests from any origin
  res.header('Access-Control-Allow-Origin', '*');
  
  // Allow specific methods
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, PATCH');
  
  // Allow specific headers
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization, X-Auth-Token'
  );
  
  // Allow credentials (cookies, authorization headers)
  res.header('Access-Control-Allow-Credentials', 'true');
  
  // Maximum age for preflight requests
  res.header('Access-Control-Max-Age', '86400');
  
  // Handle preflight OPTIONS requests
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  next();
};
