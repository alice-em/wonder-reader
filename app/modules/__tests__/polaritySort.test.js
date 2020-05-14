import basenameSort from '../polaritySort';

describe('basenameSort', () => {
  it('sorts with a, b arguments', () => {
    const sampleArray = ['c', 'c', 'r', 'a', 'e'];
    sampleArray.sort(basenameSort);
    expect(sampleArray).toEqual(['a', 'c', 'c', 'e', 'r']);
  });
});
