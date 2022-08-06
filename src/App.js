import React, { useState } from 'react';

import './App.css';
import PlayerCount from './player-count/player-count';

function App() {
  const [playerCount, setPlayerCount] = useState();
  return (
    <div>
      <div className='App-header'>Scythe</div>
      <PlayerCount value={playerCount} onChange={setPlayerCount} />
    </div>
  );
}

export default App;
