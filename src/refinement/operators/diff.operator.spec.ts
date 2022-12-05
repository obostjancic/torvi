import { diffs } from './diff.operator';

describe('diffs', () => {
  it('should return empty array when both arrays are empty', () => {
    expect(diffs([], [])).toEqual([]);
  });

  it('should return empty array when both arrays are equal', () => {
    expect(diffs([{ a: 1 }, { b: 2 }], [{ b: 2 }, { a: 1 }])).toEqual([]);
  });

  it('should match by id if it is present', () => {
    expect(
      diffs(
        [
          { id: 1, a: 1 },
          { id: 2, b: 2 },
        ],
        [
          { id: 1, c: 3 },
          { id: 2, d: 4 },
        ],
      ),
    ).toEqual([]);
  });

  it('should match by supplied key', () => {
    expect(
      diffs(
        [
          { a: 1, b: 1 },
          { a: 2, b: 2 },
        ],
        [
          { a: 1, c: 3 },
          { a: 2, d: 4 },
        ],
        'a',
      ),
    ).toEqual([]);
  });

  it('should return added when new item is added', () => {
    expect(diffs([{ a: 1 }, { b: 2 }], [{ a: 1 }, { b: 2 }, { c: 3 }])).toEqual([{ c: 3, _diff: 'added' }]);
  });

  it('should return removed when item is removed', () => {
    expect(diffs([{ a: 1 }, { b: 2 }, { c: 3 }], [{ a: 1 }, { b: 2 }])).toEqual([{ c: 3, _diff: 'removed' }]);
  });

  it('should return added and removed results', () => {
    const lastRun = [
      { id: 1, name: 'a' },
      { id: 2, name: 'b' },
      { id: 3, name: 'c' },
    ];
    const thisRun = [
      { id: 1, name: 'a' },
      { id: 3, name: 'c' },
      { id: 4, name: 'd' },
    ];
    const diffResults = diffs(lastRun, thisRun);
    expect(diffResults).toEqual([
      { id: 2, name: 'b', _diff: 'removed' },
      { id: 4, name: 'd', _diff: 'added' },
    ]);
  });
});
