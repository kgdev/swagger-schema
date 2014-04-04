'use strict';

/**
 * Module dependencies.
 */

var Environment = require('../environment');

/**
 * Tests
 */

describe('Environment', function() {
  beforeEach(function() {
    this.env = new Environment();
    this.env.setup();
  });

  describe('coerceSchema', function() {
    it('should convert single item to an array', function() {
      var schema = {
        type: 'object',
        properties: { one: { type: 'array' } },
      };
      var data = { one: 1 };

      this.env.validateThrow(schema, data, { coerce: true });

      data.one.should.eql([1]);
    });

    it('should convert negative number', function() {
      var schema = {
        type: 'object',
        properties: { one: { type: 'number' } },
      };
      var number = -23.5;
      var data = { one: '' + number };

      this.env.validateThrow(schema, data, { coerce: true });

      data.one.should.equal(number);
    });
  });
});
