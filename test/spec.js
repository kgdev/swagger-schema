'use strict';

/**
 * Module dependencies.
 */

var resourceListing = require('../fixtures/index');
var schema = require('../spec');

/**
 * Tests
 */

describe('spec', function() {
  describe('ResourceListing', function() {
    it('should validate', function() {
      schema.validateThrow('ResourceListing', resourceListing);
    });
  });
});
