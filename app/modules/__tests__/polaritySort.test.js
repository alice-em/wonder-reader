import basenameSort from '../polaritySort';

describe('basenameSort', () => {
  it('sorts with a, b arguments', () => {
    const sampleArray = ['c', 'c', 'r', 'a', 'e'];
    sampleArray.sort(basenameSort);
    expect(sampleArray).toEqual(['a', 'c', 'c', 'e', 'r']);
  });

  it('sorts with a, b, prop arguments', () => {
    const objectfy = v => ({ letter: v });
    const sampleArray = ['c', 'r', 'a', 'c', 'e'].map(objectfy);
    sampleArray.sort((a, b) => basenameSort(a, b, 'letter'));
    expect(sampleArray).toEqual(['a', 'c', 'c', 'e', 'r'].map(objectfy));
  });
});
