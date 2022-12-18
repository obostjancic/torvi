import { sort } from './sort.operator';

describe('sort', () => {
  it('should return empty array when array is empty', () => {
    expect(sort([])).toEqual([]);
  });

  it('should not change alread sorted array', () => {
    expect(sort([{ a: 1 }, { b: 2 }], {})).toEqual([{ a: 1 }, { b: 2 }]);
  });

  it('should sort by provided key', () => {
    const results = [
      { a: 2, b: 1 },
      { a: 1, b: 2 },
      { a: 3, b: 1 },
    ];
    expect(sort(results, { by: 'a', direction: 'asc' })).toEqual([
      { a: 1, b: 2 },
      { a: 2, b: 1 },
      { a: 3, b: 1 },
    ]);
  });

  it('should sort by provided key in descending order', () => {
    const results = [
      { a: 2, b: 1 },
      { a: 1, b: 2 },
      { a: 3, b: 1 },
    ];
    expect(sort(results, { by: 'a', direction: 'desc' })).toEqual([
      { a: 3, b: 1 },
      { a: 2, b: 1 },
      { a: 1, b: 2 },
    ]);
  });
});
