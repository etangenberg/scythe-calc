import React, { useState } from 'react';
import calculate from '../calc/calc';
import multiplier from '../calc/multiplier';

import structureTiles from '../calc/structure-tiles.json';

import './table.css';
const Table = ({ playerCount, maxPlayerCount }) => {
  const [playerStats, setPlayerStats] = useState(new Array(maxPlayerCount).fill({}));
  const columnIds = (new Array(maxPlayerCount)).fill(null).map((_, index) => `player${index + 1}`);

  const iterate = columnIds.slice(0, playerCount);

  const onChange = (index, name) => ({ target: { value } }) => {
    const v = name === 'Factory'  ? Boolean : parseInt(value, 10);
    const newPlayerStats = {
      ...playerStats[index],
      [name]: v,
    };
    const stats = [...playerStats];
    stats.splice(index, 1, newPlayerStats);    
    setPlayerStats(stats);
  };

  const row = (header, type ='number') => (
    <div className='row'>
      <div className='row-header'>{header}</div>
      <div className='row-body'>
      {
        iterate.map((id, index) => (
          <div key={id} className='cell-input'>
            <input
              type={type}
              className={`player-cell column-${header}`}
              name={header}
              onChange={onChange(index, header)}
            />
          </div>
        ))
      }
      </div>
    </div>
  );

  const score = () => {
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

    return (
      <div className='row'>
        <div className='row-header'>Score</div>
        <div className='row-body'>
        {
          iterate.map((id, index) => (
            <div key={id} className='cell-score'>
              {getScore(index)}
            </div>
          ))
        }
        </div>
      </div>
    );
  };
  return (
    <div className="table">
      {row('Name', 'text')}
      {row('Popularity')}
      {row('Stars')}
      {row('Territorities')}
      {row('Inc. Factory', 'checkbox')}
      {row('Coins')}
      {row('Structures')}
      {row('Resources')}
      {score()}
    </div>
  );
}

export default Table;
