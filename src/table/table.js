import React, { useState } from 'react';
import calculate from '../calc/calc';
import multiplier from '../calc/multiplier';

import structureTiles from '../calc/structure-tiles.json';

import './table.css';

const clip = (v, min, max) => {
  if (v < min) return min;
  if (v > max) return max;
  return v;
};

const nameType = {
  Name: { convert: (v) => v },
  'Inc. Factory': { convert: Boolean },
  Popularity: { min: 0, max: 18 },
  Stars: { min: 0, max: 6 },
  default: { convert: (v) => parseInt(v, 10) },
}; 

const Table = ({ playerCount, maxPlayerCount }) => {
  const [playerStats, setPlayerStats] = useState(new Array(maxPlayerCount).fill({
    Name: '',
    Popularity: 0,
    Stars: 0,
    Territorities: 0,
    'Inc. Factory': false,
    Coins: 0,
    Structures: 0,
    Resources: 0,
  }));
  const columnIds = (new Array(maxPlayerCount)).fill(null).map((_, index) => `player${index + 1}`);

  const iterate = columnIds.slice(0, playerCount);

  const onChange = (index, name) => ({ target: { value } }) => {
    const typeSetting = nameType[name] ;
    const convert = typeSetting?.convert || nameType.default.convert;
    const v = convert(value);
    const { min, max } = typeSetting || {};
    const newVal = (min !== undefined || max !== undefined) ? clip(v,min, max) : v;
    const newPlayerStats = {
      ...playerStats[index],
      [name]: newVal,
    };
    const stats = [...playerStats];
    stats.splice(index, 1, newPlayerStats);    
    setPlayerStats(stats);
  };

  const getScore = (index) => {
    const {
      Popularity,
      Stars: stars,
      Territorities: territories,
      Resources: resources,
      'Inc. Factory': factory,
      Coins: coins,
      Structures: structureScoringCount,
    } = playerStats[index];

    const mult = multiplier(Popularity);
    const score = calculate(
      {
        stars,
        territories,
        resources,
        factory,
        structureScoringCount,
        coins
      },
      mult,
      structureTiles['adjacent-to-tunnels']
    );

    return score;
  };

  const score = (index) => {
    return (
      <div className='cell-score'>
        {index 
          ? getScore(index - 1)
          : 'Score'
        }
      </div>
    );
  };

  const cell = (index, header, type ='number') => (
    <div className='cell-input'>
      {
        !index
        ? header
        : <input
            type={type}
            className={`player-cell column-${header}`}
            name={header}
            onChange={onChange(index - 1, header)}
            min={nameType[header]?.min}
            max={nameType[header]?.max}
            value={playerStats[index - 1][header]}
          />
      }
    </div>);

  const column = (key, index) => (
    <div className="column" key={key} >
      {cell(index, 'Name', 'text')}
      {cell(index, 'Popularity')}
      {cell(index, 'Stars')}
      {cell(index, 'Territorities')}
      {cell(index, 'Inc. Factory', 'checkbox')}
      {cell(index, 'Coins')}
      {cell(index, 'Structures')}
      {cell(index, 'Resources')}
      {score(index)}
    </div>
  );

  const columns = ['headers', ...iterate];
  return (
    <div className="table">
      {columns.map((c, index) => column(c, index))}      
    </div>
  );
}

export default Table;
