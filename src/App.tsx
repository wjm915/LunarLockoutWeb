import React from 'react';
import './App.css';
import { RobotBar } from './RobotBar';
import { myData } from './DataSingleton';
import { GameBoard } from './GameBoard';
import { ControlBar } from './ControlBar';

export default function App() {
  let sData = myData.getInstance();
  console.log(sData.robots.toString())

  return (
    <div className="App">
      <header className="App-header">
        <RobotBar />
        <GameBoard />
        <ControlBar />
      </header>
    </div>
  );
}
