const calculate = (input, multipliers = [], structureTile = []) => {
  const [s, t, r] = multipliers;
  const mstars = s || 3;
  const mterritories = t || 2;
  const mresources = r || 1;
  const {
    stars: istars,
    territories: iterritories,
    resources: iresources,
    factory,
    structureScoringCount: scount,
    coins: icoins,
  } = input || {};
  
  const structureScoringCount = scount || 0;
  const stars = istars || 0;
  const territories = (iterritories + (iterritories && factory ? 2 : 0 )) || 0;
  const resources = iresources || 0;
  const coins = icoins | 0;

  const scoreStars = stars * mstars;
  const scoreTerritories = territories * mterritories;
  const scoreResources = Math.floor(resources / 2) * mresources;
  const scoreStructures = structureTile[structureScoringCount] || 0;
  const scoreCoins = coins;

  return (
    scoreStars +
    scoreTerritories +
    scoreResources +
    scoreStructures +
    scoreCoins
  );
};

export default calculate;
