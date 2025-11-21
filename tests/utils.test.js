/**
 * Jest tests for utility functions
 * Simple tests for beginners
 */

const { add, subtract, capitalize } = require('../src/utils');

describe('Utility Functions', () => {
  
  // Test for add function
  describe('add', () => {
    test('should add two numbers correctly', () => {
      expect(add(5, 3)).toBe(8);
      expect(add(10, 5)).toBe(15);
    });
  });

  // Test for subtract function
  describe('subtract', () => {
    test('should subtract two numbers correctly', () => {
      expect(subtract(10, 4)).toBe(6);
      expect(subtract(20, 10)).toBe(10);
    });
  });

  // Test for capitalize function
  describe('capitalize', () => {
    test('should capitalize first letter of a string', () => {
      expect(capitalize('hello')).toBe('Hello');
      expect(capitalize('world')).toBe('World');
    });
  });

});
