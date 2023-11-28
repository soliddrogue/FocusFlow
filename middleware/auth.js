// Middleware function to check if a user is logged in
exports.isLoggedIn = function (req, res, next) {
  // Check if there is a user object in the request, indicating that the user is logged in
  if (req.user) {
    // If a user is present, proceed to the next middleware or route handler
    next();
  } else {
    // If no user is present, return a 401 Unauthorized status and send an 'Access Denied' message
    return res.status(401).send('Access Denied');
  }
};