import sut from './multiplier';

describe('score', () => { 
  const low = [3, 2, 1];
  const mid = [4, 3, 2];
  const top = [5, 4, 3];
  it.each([
    [0, ...low],
    [1, ...low],
    [2, ...low],
    [3, ...low],
    [4, ...low],
    [5, ...low],
    [6, ...low],
    [7, ...mid],
    [8, ...mid],
    [9, ...mid],
    [10, ...mid],
    [11, ...mid],
    [12, ...mid],
    [13, ...top],
    [14, ...top],
    [15, ...top],
    [16, ...top],
    [17, ...top],
    [18, ...top],
  ])(
    'popularity %s, result stars %d, territory %d, resources %d',
    (popularity, starscore, territoryscore, resourcescore) => {
    expect(sut(popularity))
    .toEqual([starscore, territoryscore, resourcescore])
  });
});
