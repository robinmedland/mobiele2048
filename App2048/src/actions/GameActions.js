import { Actions } from 'react-native-router-flux';
import {
    SWIPE,
    CREATE_GAME,
    SCORE,
    ENDGAME
} from './types';


export const endgamevenster = () =>  {
  return {
   type: ENDGAME,
   payload: false
}
}

export const createGame = () => {
  let arr = [];
  for(let i = 0; i < 4; i++) {
    arr.push([]);
    for (let j = 0; j < 4; j++) {
      arr[i].push(0);
    }
  }
  let rand = 0;
  while (rand < 2) {
    let random = Math.floor(Math.random() * (16 -1) );
    const x = Math.floor(random / 4);
    const y = random % 4;
    if (arr[x][y] === 0) {
      arr[x][y] = 2;
      rand++;
    }
  }

  return {
    type: CREATE_GAME,
    payload: arr
  }
};

export const swipeRight = ( gameBoard ) => {
  let gedaan = false;
  for (let y = 0 ; y < gameBoard.length ; y++) {
      let wasAdded = false; // next row
      for (let x = gameBoard.length -2; x >= 0; x--) { //last column can't move to the right
          if (gameBoard[y][x] !== 0) {
              //check(gameboard, postion, direction (horizontal/vertical), zin (right/left, up/down), wasAdded)
              let resp = check(gameBoard, {x, y}, -1, +1, wasAdded);
              wasAdded = resp.added; //To check if next neighbour can add up
              gameBoard = resp.gameBoard;
          }
      }
  }
  return swipeFinished(gameBoard, gedaan );
};

export const swipeLeft = ( gameBoard ) => {
  for (let y = 0 ; y < gameBoard.length ; y++) {
      let wasAdded = false; // next row
      for (let x = 1; x < gameBoard.length; x++) { //first column can't move to the right
          if (gameBoard[y][x] !== 0) {
              //check(gameboard, postion, direction (horizontal/vertical), zin (right/left, up/down), wasAdded)
              let resp = check(gameBoard, {x, y}, -1, -1, wasAdded);
              wasAdded = resp.added; //To check if next neighbour can add up
              gameBoard = resp.gameBoard;
          }
      }
  }
  return swipeFinished(gameBoard );
};

export const swipeDown = (gameBoard, gameOver) => {
  for (let x = 0; x < gameBoard.length; x++) {
      let wasAdded = false; // next row
      for (let y = gameBoard.length-2 ; y >= 0 ; y--) { //last row can't move down
          if (gameBoard[y][x] !== 0) {
              //check(gameboard, postion, direction (horizontal/vertical), zin (right/left, up/down), wasAdded)
              let resp = check(gameBoard, {x, y}, +1, +1, wasAdded);
              wasAdded = resp.added; //To check if next neighbour can add up
              gameBoard = resp.gameBoard;
          }
      }
  }
  return swipeFinished(gameBoard );
};

export const swipeUp = (gameBoard ) => {
  for (let x = 0; x < gameBoard.length; x++) {
      let wasAdded = false; // next row
      for (let y = 1 ; y < gameBoard.length -1 ; y++) { //first row can't move up
          if (gameBoard[y][x] !== 0) {
              //check(gameboard, postion, direction (horizontal/vertical), zin (right/left, up/down), wasAdded)
              let resp = check(gameBoard, {x, y}, +1, -1, wasAdded);
              wasAdded = resp.added; //To check if next neighbour can add up
              gameBoard = resp.gameBoard;
          }
      }
  }
  return swipeFinished(gameBoard);
};

const swipeFinished = (gameBoard) => {

  const resp = addNumber(gameBoard);
  const changed = resp.changed;
  const changedGameBoard = resp.gameBoard;
  //If end game
  if (!changed) {
      return (dispatch) => {
          dispatch({type: ENDGAME, payload: true})
      }
  } else {
      const newGameBoard = [...changedGameBoard];
      const score = calculateScore(newGameBoard);
      return (dispatch) => {
          dispatch({type: SWIPE, payload: newGameBoard});
          dispatch({type: SCORE, payload: score});
      }
  }
};

/**
 *
 * @param gameBoard
 * @returns the new gameBoard score
 */
const calculateScore = (gameBoard) => {
  let score = 0;
  for (let x = 0; x < gameBoard.length; x++) {
      for (let y = 0; y < gameBoard.length; y++) {
          score += gameBoard[y][x];
      }
  }
  return score;
};

/**
 *
 * @param gameBoard 
 * @param position current check position
 * @param direction of the swipe gesture -> -1 = horizontal, +1 = vertical
 * @param vector of the swipe gesture => -1 = (left|up), +1 = (right|down)
 * @param wasAdded boolean if first not zero neighbour is added with his neighbour
 */
const check = (gameBoard, position, direction, vector, wasAdded) => {
  let neigh = {};
  if (direction === -1) neigh = {x: position.x + vector, y: position.y};
  if (direction === +1) neigh = {x: position.x, y: position.y + vector};
  //Check if neighbour is out of range
  if (neigh.x >= gameBoard.length || neigh.x < 0 || neigh.y >= gameBoard.length || neigh.y < 0) {
      return {gameBoard, changed: false, added: wasAdded};
  }
  //Check if neighbour is empty
  if (gameBoard[neigh.y][neigh.x] === 0) {
      gameBoard[neigh.y][neigh.x] = gameBoard[position.y][position.x];
      gameBoard[position.y][position.x] = 0;
      const resp = check(gameBoard, {x: neigh.x, y: neigh.y}, direction, vector, wasAdded);
      return {gameBoard: resp.gameBoard, changed: true, added: resp.added};
  } else if (gameBoard[neigh.y][neigh.x] === gameBoard[position.y][position.x] && wasAdded === false) {
      gameBoard[neigh.y][neigh.x] += gameBoard[neigh.y][neigh.x];
      gameBoard[position.y][position.x] = 0;
      return {gameBoard, changed: true, added: true};
  } else return {gameBoard, changed: false, added: false};
};

const addNumber = (gameBoard) => {
  let empty = [];
  for(let x = 0; x < gameBoard.length; x++) {
    for (let y = 0; y < gameBoard.length; y++) {
      if (gameBoard[y][x] === 0) {
        empty.push({x,y})
      }
    }
  }
  if (empty.length === 0) {
    console.log('End');
    return {gameBoard, changed: false};

  } else {
      const random = Math.floor(Math.random() * (empty.length -1) );
      gameBoard[empty[random].y][empty[random].x] = (Math.random() >= 0.9 ? 4 : 2);
      return {gameBoard, changed: true};
  }
};


