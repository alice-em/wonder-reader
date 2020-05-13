import { encodeUnix } from '../encodePath';

describe('encodePath', () => {
  it('encodeUnix', () => {
    const filepath = '/home/sample user/Documents/git/wonder-reader';
    expect(encodeUnix(filepath)).toBe(
      '/home/sample%20user/Documents/git/wonder-reader',
    );
  });
});
