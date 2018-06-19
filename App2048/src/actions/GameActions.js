import { Actions } from 'react-native-router-flux';

import {
  SWIPE,
  CREATE_GAME
} from './types';

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
    console.log(rand);
    let random = Math.floor(Math.random() * (16 -1) );
    console.log("random:" + random);
    const x = Math.floor(random / 4);
    const y = random % 4;
    console.log("x: " + x, "y: " + y)
    if (arr[x][y] === 0) {
      arr[x][y] = 2;
      rand++;
    }
  }
  
  console.log(arr);  

  return {
    type: CREATE_GAME,
    payload: arr
  }
}

export const swipeUp = (gameBoard) => {
  let changed = false;
  for (let y = 1 ; y < gameBoard.length ; y++) {
    for (let x = 0 ; x < gameBoard.length ; x++) {
      if (gameBoard[y][x] !== 0) {
        let resp = checkAbove(gameBoard, {x, y});
        gameBoard = resp.board;
        changed = resp.changed;
      }
    }
  }
  if (changed) {
    gameBoard = addNumber(gameBoard);
  }
  const newGameBoard = [...gameBoard];  
  return {
    type: SWIPE,
    payload: newGameBoard
  };
};

export const swipeDown = (gameBoard) => {
  let changed = false;
  for (let y = gameBoard.length -2 ; y >= 0 ; y--) {
    for (let x = 0 ; x < gameBoard.length ; x++) {
      if (gameBoard[y][x] !== 0) {
        let resp = checkUnder(gameBoard, {x, y});
        gameBoard = resp.board;
        changed = resp.changed
      }
    }
  }
  if (changed) {
    gameBoard = addNumber(gameBoard);    
  }
  const newGameBoard = [...gameBoard];  
  return {
    type: SWIPE,
    payload: newGameBoard
  };
};

export const swipeRight = (gameBoard) => {
  let changed = false;
  for (let x = gameBoard.length -2  ; x >= 0 ; x--) {
    for (let y = 0 ; y < gameBoard.length ; y++) {
      if (gameBoard[y][x] !== 0) {
        let resp = checkRight(gameBoard, {x, y});
        gameBoard = resp.board;
        changed = resp.changed;
      }
    }
  }
  if (changed) {
    gameBoard = addNumber(gameBoard);    
  }
  const newGameBoard = [...gameBoard];
  return {
    type: SWIPE,
    payload: newGameBoard
  };
};

export const swipeLeft = (gameBoard) => {
  let changed = false;
  for (let x = 1  ; x < gameBoard.length  ; x++) {
    for (let y = 0 ; y < gameBoard.length ; y++) {
      if (gameBoard[y][x] !== 0) {
        let resp = checkLeft(gameBoard, {x, y});
        gameBoard = resp.board;
        changed = resp.changed;
      }
    }
  }
  if (changed) {
    gameBoard = addNumber(gameBoard);    
  }
  const newGameBoard = [...gameBoard];
  return {
    type: SWIPE,
    payload: newGameBoard
  };
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
    console.log('GAME OVER');
    return gameBoard;
  }
  console.log(empty);
  const random = Math.floor(Math.random() * (empty.length -1) );
  gameBoard[empty[random].y][empty[random].x] = 2;
  return gameBoard;
}

const checkAbove = (board, position) => {
  let changed = false;
  const {x, y} = position  
  const cur = board[y][x];
  const neigh = board[y-1][x];
  if (neigh !== 0) {
    if(cur === neigh) {
      board[y-1][x] += cur;
      board[y][x] = 0;
      changed = true;
      if (y-1 > 0) {
        board = checkAbove(board, {x: x, y: y-1}).board;
      }
    } 
  } else {
    board[y-1][x] = cur;
    board[y][x] = 0;
    changed = true;
    if (y-1 > 0) {
      board = checkAbove(board, {x: x, y: y-1}).board;
    }
  }
  return {board, changed};
}

const checkUnder = (board, position) => {
  let changed = false;
  const {x, y} = position  
  const cur = board[y][x];
  const neigh = board[y+1][x];
  if (neigh !== 0) {
    if(cur === neigh) {
      board[y+1][x] += cur;
      board[y][x] = 0;
      changed = true;
      /**
       * board.length -3 omdat
       * board.length = 4
       * board[4] -> buiten het bereik
       * board[3] -> is laatste element van array (kan niet met opschuiven)
       * board[2] -> voorlaatste element van array (kan dus nog één lager)
       */
      if (y+1 < board.length - 3) {
        board = checkUnder(board, {x: x, y: y+1}).board;
      }
    } 
  } else {
    board[y+1][x] = cur;
    board[y][x] = 0;
    changed = true;
    if (y-1 < board.length - 3) {
      board = checkUnder(board, {x: x, y: y+1}).board;
    }
  }
  return {board, changed};
}

const checkRight = (board, position) => {
  let changed = false;
  const {x, y} = position  
  const cur = board[y][x];
  const neigh = board[y][x+1];
  if(neigh != 0) {
    if(cur === neigh) {
      board[y][x+1] += cur;
      board[y][x] = 0;
      changed = true;
      if (x+1 < board.length - 3) {
        board = checkRight(board, {x: x+1, y:y}).board;
      }
    }
  } else {
    board[y][x+1] = cur;
    board[y][x] = 0;
    changed = true;
    if (x-1 < board.length -3) {
      board = checkRight(board, {x: x+1, y:y}).board;
    } 
  }
  return {board, changed};
}

const checkLeft = (board, position) => {
  let changed = false;
  const {x, y} = position  
  const cur = board[y][x];
  const neigh = board[y][x-1];
  if(neigh != 0) {
    if(cur === neigh) {
      board[y][x-1] += cur;
      board[y][x] = 0;
      changed = true;
      if (x-1 > 0) {
        board = checkLeft(board, {x: x-1, y:y}).board;
      }
    }
  } else {
    board[y][x-1] = cur;
    board[y][x] = 0;
    changed = true;
    if (x-1 > 0) {
      board = checkLeft(board, {x: x-1, y:y}).board;
    } 
  }
  return {board, changed};
}


