/**
 * Jest tests for utility functions
 */

const { add, subtract, capitalize } = require('../src/utils');

describe('Utility Functions', () => {
  
  describe('add', () => {
    test('should add two positive numbers correctly', () => {
      expect(add(5, 3)).toBe(8);
    });

    test('should handle negative numbers', () => {
      expect(add(-5, 3)).toBe(-2);
      expect(add(5, -3)).toBe(2);
    });

    test('should handle zero', () => {
      expect(add(0, 0)).toBe(0);
      expect(add(10, 0)).toBe(10);
    });
  });

  describe('subtract', () => {
    test('should subtract two numbers correctly', () => {
      expect(subtract(10, 4)).toBe(6);
    });

    test('should handle negative results', () => {
      expect(subtract(3, 5)).toBe(-2);
    });

    test('should handle zero', () => {
      expect(subtract(10, 0)).toBe(10);
      expect(subtract(0, 10)).toBe(-10);
    });
  });

  describe('capitalize', () => {
    test('should capitalize first letter of a string', () => {
      expect(capitalize('hello')).toBe('Hello');
      expect(capitalize('world')).toBe('World');
    });

    test('should handle strings with multiple words', () => {
      expect(capitalize('hello world')).toBe('Hello world');
    });

    test('should handle already capitalized strings', () => {
      expect(capitalize('HELLO')).toBe('Hello');
    });

    test('should handle empty strings', () => {
      expect(capitalize('')).toBe('');
    });

    test('should handle invalid inputs', () => {
      expect(capitalize(null)).toBe('');
      expect(capitalize(undefined)).toBe('');
    });
  });

});
