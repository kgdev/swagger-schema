/**
 * Schema environment.
 */

'use strict';

/**
 * Module dependencies.
 */

var jjv = require('jjv');
var lodash = require('lodash');

/**
 * Initialize a new `Environment`.
 *
 * @param {Object} options
 * @api public
 */

function Environment(options) {
  if (!(this instanceof Environment)) {
    return new Environment(options);
  }

  // defaults
  options = lodash.defaults(options || {}, {
    setup: true,
  });

  this.env = jjv();
  this.env.defaultOptions.checkRequired = true;
  this.env.defaultOptions.useDefault = true;
  this.env.defaultOptions.useCoerce = false;

  if (options.setup) this.setup();
}

Environment.prototype.setup = function() {
  this.env.addTypeCoercion('array', function(v) {
    if (!Array.isArray(v)) {
      return typeof v === 'undefined' ? [] : [v];
    }
    return v;
  });

  this.env.addTypeCoercion('integer', function(v) {
    if (typeof v === 'string' && v.match(/^\-?\d+$/)) {
      return parseInt(v, 10);
    }
    return v;
  });

  this.env.addTypeCoercion('number', function(v) {
    if (typeof v === 'string' && v.match(/^\-?(\d+|\d*\.\d+|\d+\.\d*)$/)) {
      return parseFloat(v);
    }
    return v;
  });

  this.env.addTypeCoercion('boolean', function(v) {
    if (typeof v === 'string') {
      return ['', '0', 'false', 'no'].indexOf(v) < 0;
    }
    return v;
  });
};

Environment.prototype.setupValidation = function() {
  console.log('Environment.setupValidation is deprecated');
};

Environment.prototype.validate = function(schema, data, options) {
  options = options || {};

  if (options.hasOwnProperty('coerce')) {
    options.useCoerce = options.coerce;
    delete options.coerce;
  }

  return this.env.validate(schema, data, options);
};

Environment.prototype.validateThrow = function(schema, data, options) {
  if (typeof options === 'string') {
    options = { message: options };
  }
  options = options || {};

  var errors = this.validate(schema, data, options);

  if (errors) {
    var err = new Error(options.message || 'Validation failed');
    err.errors = errors;
    err.message += '\n' + JSON.stringify(errors, null, 4);
    err.message += '\nFor data:';
    err.message += '\n' + JSON.stringify(data, null, 4);
    throw err;
  }
};

Environment.prototype.addSchema = function(name, data) {
  this.env.addSchema(name, data);
};

/**
 * Expose Environment.
 */

module.exports = Environment;
