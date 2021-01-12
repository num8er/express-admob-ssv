const { URL } = require('url');
const verify = require('./methods/verify');

/**
 * ExpressJS Middleware
 *
 * @param [onInvalid] {Function} Handler function if verification went wrong (optional)
 *
 * @return {function(*=, *=, *): Promise<*>}
 */
function middleware (onInvalid) {
  return async (req, res, next) => {
    const url = new URL(req.protocol + '://' + req.get('host') + req.originalUrl);
    const result = await verify(url);

    if (!result) {
      if (onInvalid) {
        return onInvalid(req, res, next);
      }
      return res.status(400).end();
    }

    next();
  };
}

module.exports = middleware;
