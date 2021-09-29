import { RandomMiddleNamePipe } from './random-middle-name.pipe';

describe('RandomMiddleNamePipe', () => {
  it('create an instance', () => {
    const pipe = new RandomMiddleNamePipe();
    expect(pipe).toBeTruthy();
  });
});
