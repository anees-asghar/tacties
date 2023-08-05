import './App.css';
import { DndContext } from '@dnd-kit/core';
import { useState } from 'react';
import { Navbar, GameGridCell, Piece } from './components';

function App() {
  const gameGridCellIds   = ["11", "21", "31", "41", "51", "61", "71", "81", "91"];
  const playerOnePieceIds = ["112", "212", "312", "412", "512", "612", "712", "812", "912"];
  const playerTwoPieceIds = ["122", "222", "322", "422", "522", "622", "722", "822", "922"];

  const [ myState, setMyState ] = useState(() => {
    let cellValues = {};
    for (let i = 0; i < gameGridCellIds.length; i++) {
      cellValues[gameGridCellIds[i]] = null;
    }

    let pieceAvailability = {};
    const pieceIds = [...playerOnePieceIds, ...playerTwoPieceIds];
    for (let i = 0; i < pieceIds.length; i++) {
      pieceAvailability[pieceIds[i]] = true;
    }

    return {playerToMove: "1", message:"", gameOver: false, cellValues, pieceAvailability};
  })
  
  const pieceMarkups = (() => {
    let markups = {};
    const ids = [...playerOnePieceIds, ...playerTwoPieceIds];
    for (let i = 0; i < ids.length; i++) {
      const id = ids[i];
      markups[id] = <Piece id={id} piecePriority={getPiecePriority(id)} disabled={myState.gameOver || !myState.pieceAvailability[id] || id[1] !== myState.playerToMove} />
    }
    return markups;
  })();

  return (
    <div className='xl:h-screen bg-blue text-white font-roboto overflow-hidden'>
      <Navbar />
      <DndContext onDragEnd={handleDragEnd} autoScroll={false}>
        <div className='xl:flex xl:h-5/6'>

          {/* Player One Area */}
          <div className='xl:w-3/12 xl:h-full flex flex-col items-center xl:items-end pt-10 xl:pt-20'>
            <div>
              <div className='w-80 h-64 flex flex-wrap'>
                {playerOnePieceIds.map((id, _) => 
                  <div key={"pieceCell" + id} className="w-1/3 h-1/3 flex items-center justify-center">
                    {myState.pieceAvailability[id] ? pieceMarkups[id] : null}
                  </div>
                )}
              </div>
              <p className='text-center mt-8'>Player One</p>
            </div>
          </div>

          {/* Game Grid Area */}
          <div className='xl:w-1/2 xl:h-full flex flex-col items-center pt-10'>
            <div className='h-96 w-96 flex flex-wrap'>
                {gameGridCellIds.map((id, _) => 
                  <GameGridCell id={id} key={id}>
                    {myState.cellValues[id] ? pieceMarkups[myState.cellValues[id]] : null}
                  </GameGridCell>
                )}
            </div>
            {myState.gameOver ? 
              <div className='pt-8 w-full flex flex-col'>
                <p className='text-center text-lg'>{myState.message}</p>
                <button className='mt-4 mx-auto w-16 h-12 rounded-lg text-3xl hover:bg-white hover:text-blue transition-colors ease-in-out delay-50' onClick={restartGame}>⟳</button>
              </div>
            : null}
          </div>

          {/* Player Two Area */}
          <div className='xl:w-3/12 xl:h-full flex flex-col items-center xl:items-start py-10 xl:pt-20 xl:pb-0'>
            <div>
              <div className='w-80 h-64 flex flex-wrap'>
                {playerTwoPieceIds.map((id, _) => 
                  <div key={"pieceCell" + id} className="w-1/3 h-1/3 flex items-center justify-center">
                    {myState.pieceAvailability[id] ? pieceMarkups[id] : null}
                  </div>
                )}
              </div>
              <p className='text-center mt-8'>Player Two</p>
            </div>
          </div>
        </div>
      </DndContext>
    </div>
  );

  function restartGame() {
    setMyState(() => {
      const nextState = {...myState};
      nextState.playerToMove = "1";
      nextState.message = "";
      nextState.gameOver = false;

      for (const key in myState.cellValues) {
        nextState.cellValues[key] = null;
      }

      for (const key in myState.pieceAvailability) {
        nextState.pieceAvailability[key] = true;
      }

      return nextState;
    })
  }

  function handleDragEnd(event) {
    if (!event.over) return;

    const pieceId = event.active.id;
    const cellId = event.over.id;

    if (!isValidMove(pieceId, cellId)) return;

    setMyState(() => {
      let nextState = {...myState};
      nextState.pieceAvailability[pieceId] = false;
      nextState.cellValues[cellId] = pieceId;

      if (checkPlayerWon()) {
        nextState.message = `Player ${myState.playerToMove === "1" ? "One" : "Two"} Won!`;
        nextState.gameOver = true;
      } else if (checkNoPossibleMoves()) {
        nextState.message = "Game Tied!";
        nextState.gameOver = true;
      } else {
        nextState.playerToMove = myState.playerToMove === "1" ? "2" : "1";
      }
      return nextState;
    })
  }

  function isValidMove(pieceId, cellId) {
    if (pieceId[1] !== myState.playerToMove) return false;

    const currPieceId = myState.cellValues[cellId];
    if (!currPieceId) return true;

    if (currPieceId[1] !== myState.playerToMove && 
      getPiecePriority(pieceId) > getPiecePriority(currPieceId)) {
      return true;
    }

    return false;
  }

  function getPiecePriority(pieceId) {
    return ~~((parseInt(pieceId[0])-1) / 3);
  }

  function checkPlayerWon() {
    const cellValues = myState.cellValues;

    try {
      if (cellValues['11'][1] === cellValues['21'][1] && cellValues['21'][1] === cellValues['31'][1]) return true;
    } catch (error) {}

    try {
      if (cellValues['41'][1] === cellValues['51'][1] && cellValues['51'][1] === cellValues['61'][1]) return true;
    } catch (error) {}
    
    try {
      if (cellValues['71'][1] === cellValues['81'][1] && cellValues['81'][1] === cellValues['91'][1]) return true;
    } catch (error) {}
    
    try {
      if (cellValues['11'][1] === cellValues['41'][1] && cellValues['41'][1] === cellValues['71'][1]) return true;
    } catch (error) {}
    
    try {
      if (cellValues['21'][1] === cellValues['51'][1] && cellValues['51'][1] === cellValues['81'][1]) return true;
    } catch (error) {}
    
    try {
      if (cellValues['31'][1] === cellValues['61'][1] && cellValues['61'][1] === cellValues['91'][1]) return true;
    } catch (error) {}
    
    try {
      if (cellValues['11'][1] === cellValues['51'][1] && cellValues['51'][1] === cellValues['91'][1]) return true;
    } catch (error) {}
    
    try {
      if (cellValues['31'][1] === cellValues['51'][1] && cellValues['51'][1] === cellValues['71'][1]) return true;
    } catch (error) {}

    return false;
  }

  function checkNoPossibleMoves() {
    return false;
  }
}

export default App;
