// Minimal jest shim for Vitest
globalThis.jest = {
  spyOn: (...args) => vi.spyOn(...args),
};


