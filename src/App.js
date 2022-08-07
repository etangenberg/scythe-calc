import React, { useState } from 'react';

import './App.css';
import PlayerCount from './player-count/player-count';
import Table from './table/table';

function App() {
  const [playerCount, setPlayerCount] = useState();
  return (
    <div>
      <div className='App-header'>Scythe</div>
      <PlayerCount value={playerCount} onChange={setPlayerCount} />
      {playerCount
        && <Table  maxPlayerCount={6} playerCount={playerCount} />}
    </div>
  );
}

export default App;
