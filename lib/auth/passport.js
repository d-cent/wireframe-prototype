/*
 * Module dependencies
 */
var mongoose = require('mongoose');
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var TwitterStrategy = require('passport-twitter').Strategy;

/**
 * Expose Passport login
 * strategies
 *
 * @param {Express} app `Express` instance
 * @api public
 */

module.exports = function LoginStrategies (app) {

  /**
   * User model
   */

  var User = mongoose.model('User');

  /**
   * Passport Serialization of logged
   * User to Session from request
   */

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  /**
   * Passport Deserialization of logged
   * User by Session into request
   */

  passport.deserializeUser(function(userId, done) {
    User
    .findById(userId)
    .exec(function(err, user) {
      done(null, user);
    });
  });
}