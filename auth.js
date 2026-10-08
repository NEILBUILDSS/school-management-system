const crypto = require('crypto');
const User = require('../models/User');

function ensureCsrfToken(req) {
  if (!req.session.csrfToken) {
    req.session.csrfToken = crypto.randomBytes(24).toString('hex');
  }
  return req.session.csrfToken;
}

async function requireAuth(req, res, next) {
  try {
    if (!req.session || !req.session.userId) {
      return res.status(401).json({ message: 'Please sign in to continue.' });
    }
    const user = await User.findById(req.session.userId).lean();
    if (!user || user.status !== 'Active') {
      if (req.session) req.session.destroy(() => {});
      return res.status(401).json({ message: 'Your session is no longer active.' });
    }
    req.user = user;
    ensureCsrfToken(req);
    next();
  } catch (err) {
    next(err);
  }
}

function requireRole(...roles) {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'You do not have permission to access this resource.' });
    }
    next();
  };
}

function csrfProtect(req, res, next) {
  const expected = ensureCsrfToken(req);
  const actual = req.get('x-csrf-token');
  if (!actual || actual !== expected) {
    return res.status(403).json({ message: 'Security token is missing or expired. Refresh the page and try again.' });
  }
  next();
}

module.exports = { requireAuth, requireRole, csrfProtect, ensureCsrfToken };
