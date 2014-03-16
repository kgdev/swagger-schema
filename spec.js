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
  'ApiVersion',
  'SwaggerVersion',
  'Mimes',

  'ScopeObject',
  'TokenRequestEndpointObject',
  'TokenEndpointObject',
  'LoginEndpointObject',
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

  'AuthorizationList',
  'ParameterObject',
  'ResponseMessageObject',
  'ModelObject',
  'ModelsObject',
  'OperationObject',
  'ApiObject',
  'ApiDeclaration',
];

order.forEach(function(name) {
  env.addSchema(name, require('./spec/' + name + '.json'));
});

/**
 * Expose spec schema.
 */

module.exports = env;
