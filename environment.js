/**
 * Schema environment.
 */

'use strict';

/**
 * Module dependencies.
 */

var jjv = require('jjv');
var jjve = require('jjve');
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
  this._jjve = jjve(this.env);

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

  this.env.addFormat('uri', function() {
    // ignore jjv uri format check because it isn't liberal enough for swagger
    // valdiation
    return true;
  });
};

Environment.prototype.setupValidation = function() {
  console.log('Environment.setupValidation is deprecated');
};

Environment.prototype.validate = function(schema, data, options) {
  var self = this;

  options = options || {};

  if (options.hasOwnProperty('coerce')) {
    options.useCoerce = options.coerce;
    delete options.coerce;
  }

  var result = self.env.validate(schema, data, options);

  if (result) {
    result.errors = function() {
      return self._jjve(schema, data, result);
    };
  }

  return result;
};

Environment.prototype.validateThrow = function(schema, data, options) {
  if (typeof options === 'string') {
    options = { message: options };
  }
  options = options || {};

  var results = this.validate(schema, data, options);

  if (results) {
    var err = new Error(options.message || 'Validation failed');
    err.errors = results.errors();
    err.message += '\n' + JSON.stringify(err.errors, null, 4);
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
