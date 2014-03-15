/**
 * Schema environment.
 */

'use strict';

/**
 * Module dependencies.
 */

var Environment = require('./environment');

/**
 * Schema
 */

var env = new Environment();

var order = [
  'ScopeObject',
  'ImplicitObject',
  'AuthorizationCodeObject',
  'GrantTypesObject',

  'AuthorizationBasicAuth',
  'AuthorizationApiKey',
  'AuthorizationOauth2',
  'AuthorizationsObject',

  'InfoObject',
  'ResourceObject',
  'ResourceListing',
];

order.forEach(function(name) {
  env.addSchema(name, require('./spec/' + name + '.json'));
});

/**
 * Expose spec schema.
 */

module.exports = env;
