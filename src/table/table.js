import React from 'react';

import './table.css';
const Table = ({ playerCount, maxPlayerCount }) => {
  const columnIds = (new Array(maxPlayerCount)).fill(null).map((_, index) => `player${index + 1}`);

  const iterate = columnIds.slice(0, playerCount);

  const row = (header, type ='number') => (
    <div className='row'>
      <div className='row-header'>{header}</div>
      <div className='row-body'>
      {
        iterate.map((id) => (
          <div key={id}>
            <input type={type} className={`player-cell column-${header}`} />
          </div>
        ))
      }
      </div>
    </div>
  );
  return (
    <div className="table">
      {row('Name', 'text')}
      {row('Popularity')}
      {row('Stars')}
      {row('Territorities')}
      {row('Inc. Factory', 'checkbox')}
      {row('Coins')}
      {row('Structures')}
    </div>
  );
}

export default Table;
