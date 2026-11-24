import { describe, it, expect } from 'vitest';
import {
  generateId,
  copy,
  formatDate,
  getInitials,
  slugify,
  validateEmail,
  validateUrl,
} from './helpers';

describe('helpers utility functions', () => {
  it('generateId produces prefixed unique IDs', () => {
    const id1 = generateId('exp');
    const id2 = generateId('exp');
    expect(id1.startsWith('exp-')).toBe(true);
    expect(id2.startsWith('exp-')).toBe(true);
    expect(id1).not.toBe(id2);
  });

  it('copy deep-clones an object', () => {
    const original = { name: 'Amor', details: { city: 'Multan' } };
    const cloned = copy(original);
    expect(cloned).toEqual(original);
    cloned.details.city = 'Lahore';
    expect(original.details.city).toBe('Multan');
  });

  it('formatDate formats year or Present', () => {
    expect(formatDate('Present')).toBe('Present');
    expect(formatDate('2024-05-12')).toBe('2024');
    expect(formatDate('2023')).toBe('2023');
  });

  it('getInitials extracts up to 2 initials', () => {
    expect(getInitials('Amor Zephyr')).toBe('AZ');
    expect(getInitials('John')).toBe('J');
    expect(getInitials('Jane Alice Doe')).toBe('JA');
  });

  it('slugify converts strings into url slugs', () => {
    expect(slugify('Hello World!')).toBe('hello-world');
    expect(slugify('Senior Software Engineer - React')).toBe('senior-software-engineer-react');
  });

  it('validateEmail validates email addresses correctly', () => {
    expect(validateEmail('amor@example.com')).toBe(true);
    expect(validateEmail('invalid-email')).toBe(false);
    expect(validateEmail('')).toBe(false);
  });

  it('validateUrl validates URLs properly', () => {
    expect(validateUrl('https://example.com')).toBe(true);
    expect(validateUrl('example.com')).toBe(true);
    expect(validateUrl('')).toBe(false);
  });
});
