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

/**
 * Expose utils.
 */

exports.primitives = primitives;
exports.notModel = notModel;
