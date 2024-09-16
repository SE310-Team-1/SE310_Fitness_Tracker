function isAuthenticated(req, res, next) {
  console.log("session req.session is the value : "+req.session);  // Log session info for debugging
  if (req.session && req.session.user) {
      next();
  } else {
      return res.status(401).json({ message: 'Unauthorized' });
  }
}

export {isAuthenticated}