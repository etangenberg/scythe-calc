import React from 'react';

import './player-count.css';

const PlayerCount = ({ value, onChange }) => {
  return (
    <div className='player-count'>
      <div className='player-count-label'>Player Count</div>
      <input
        className='player-count-value'
        type='number'
        onChange={onChange}
      />
    </div>
  );
};

export default PlayerCount;
