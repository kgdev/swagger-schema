'use strict';

/**
 * Module dependencies.
 */

var resourceListing = require('../fixtures/index');
var pet = require('../fixtures/pet');
var store = require('../fixtures/store');
var user = require('../fixtures/user');
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

  describe('ApiDeclaration', function() {
    it('should validate', function() {
      schema.validateThrow('ApiDeclaration', pet);
      schema.validateThrow('ApiDeclaration', store);
      schema.validateThrow('ApiDeclaration', user);
    });
  });
});
