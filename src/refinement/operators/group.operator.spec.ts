import { group } from './group.operator';

describe('group', () => {
  it('should return empty array when results are empty', () => {
    expect(group([], { type: 'group', by: 'id' })).toEqual([]);
  });

  it('should group by provided key', () => {
    const results = [
      { id: 1, name: 'a' },
      { id: 2, name: 'b' },
      { id: 1, name: 'c' },
    ];
    expect(group(results, { type: 'group', by: 'id' })).toEqual([
      { id: 1, names: ['a', 'c'] },
      { id: 2, names: ['b'] },
    ]);
  });
});
