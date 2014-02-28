'use strict';

/**
 * Module dependencies.
 */

var v4 = require('./draft-04-schema');
var declaration = require('./api-declaration-schema');

/**
 * Helpers.
 */

var resource = declaration.properties.apis.items[0].properties.
  operations.items[0];

/**
 * Expose API schema.
 */

module.exports = {
  title: 'Operation',
  type: 'object',
  properties: resource.properties,
  required: resource.required,
  definitions: v4.definitions,
};
