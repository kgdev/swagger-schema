/**
 * Various Swagger and JSON Schema constants.
 */

'use strict';

var primitives = [
  'array',
  'boolean',
  'integer',
  'string',
];

var notModel = [
  'null',
  'number',
  'object',
  'void',
].concat(primitives);

var allowMultiple = [
  'query',
  'header',
  'path',
];

/**
 * Expose utils.
 */

exports.allowMultiple = allowMultiple;
exports.notModel = notModel;
exports.primitives = primitives;
