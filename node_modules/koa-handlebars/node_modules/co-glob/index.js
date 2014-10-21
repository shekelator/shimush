/**
 * Module dependencies.
 */

var glob = require('glob');

module.exports = function coGlob(pattern, options) {
  return function thunk(done) {
    glob(pattern, options, done);
  };
}
