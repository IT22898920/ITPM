import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Mock SpeechSynthesisUtterance
global.SpeechSynthesisUtterance = vi.fn();

// Mock window.speechSynthesis
global.speechSynthesis = {
  speak: vi.fn(),
};

// Mock ResizeObserver
global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

// Mock IntersectionObserver
global.IntersectionObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));