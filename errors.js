function notFound(req, res) {
  if (req.path.startsWith('/api/')) {
    return res.status(404).json({ message: 'Resource not found.' });
  }
  return res.status(404).send('Page not found.');
}

function errorHandler(err, req, res, next) {
  console.error(err);
  if (res.headersSent) return next(err);
  if (err.code === 11000) {
    const key = Object.keys(err.keyPattern || err.keyValue || {})[0] || 'record';
    return res.status(409).json({ message: `${key} must be unique.` });
  }
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map(e => e.message).join(' ');
    return res.status(400).json({ message: message || 'Validation failed.' });
  }
  if (err.name === 'CastError') {
    return res.status(400).json({ message: 'Invalid record identifier.' });
  }
  return res.status(err.status || 500).json({ message: err.message || 'Unexpected server error.' });
}

module.exports = { notFound, errorHandler };
