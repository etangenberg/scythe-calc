import React from 'react';

import './player-count.css';

const PlayerCount = ({ value, onChange }) => {
  const changePlayerCount = (e) => onChange(parseInt(e.target.value, 10)); 

  return (
    <div className='player-count'>
      <div className='player-count-label'>Player Count</div>
      <input
        className='player-count-value'
        type='number'
        onChange={changePlayerCount}
        min={1}
        max={6}
      />
    </div>
  );
};

export default PlayerCount;
