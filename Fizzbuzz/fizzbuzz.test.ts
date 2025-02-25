import { test, describe, expect } from '@jest/globals';
import {fizzbuzz} from './fizzbuzz';

describe('fizzbuzz module', () => {
  test('should return Fizz when divisible by 3', () => {
    expect(fizzbuzz(3)).toBe('Fizz');
    expect(fizzbuzz(6)).toBe('Fizz');
  });

  test('should return Buzz when divisible by 5', () => {
    expect(fizzbuzz(5)).toBe('Buzz');
    expect(fizzbuzz(10)).toBe('Buzz');
  });

  test('should return FizzBuzz when divisible by 3 and 5', () => {
    expect(fizzbuzz(15)).toBe('FizzBuzz');
    expect(fizzbuzz(30)).toBe('FizzBuzz');
  });

  test('should return the number when not divisible by 3 or 5', () => {
    expect(fizzbuzz(1)).toBe(1);
    expect(fizzbuzz(7)).toBe(7);
  });
});

