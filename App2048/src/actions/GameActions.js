import { Actions } from 'react-native-router-flux';

import {
  SWIPE,
  CREATE_GAME
} from './types';

export const createGame = () => {
  return (dispatch) => {
    dispatch({type: CREATE_GAME})
  }
}

export const swipeUp = (gameBoard) => {
  for (let y = 1 ; y < gameBoard.length ; y++) {
    for (let x = 0 ; x < gameBoard.length ; x++) {
      if (gameBoard[y][x] !== 0) {
        gameBoard = checkAbove(gameBoard, {x, y});
      }
    }
  }
  const newGameBoard = [...gameBoard];  
  return {
    type: SWIPE,
    payload: newGameBoard
  };
};

export const swipeDown = (gameBoard) => {
  for (let y = gameBoard.length -2 ; y >= 0 ; y--) {
    for (let x = 0 ; x < gameBoard.length ; x++) {
      if (gameBoard[y][x] !== 0) {
        gameBoard = checkUnder(gameBoard, {x, y});
      }
    }
  }
  const newGameBoard = [...gameBoard];  
  return {
    type: SWIPE,
    payload: newGameBoard
  };
};

export const swipeRight = (gameBoard) => {
  for (let x = gameBoard.length -2  ; x >= 0 ; x--) {
    for (let y = 0 ; y < gameBoard.length ; y++) {
      if (gameBoard[y][x] !== 0) {
        gameBoard = checkRight(gameBoard, {x, y});
      }
    }
  }
  const newGameBoard = [...gameBoard];
  return {
    type: SWIPE,
    payload: newGameBoard
  };
};

export const swipeLeft = (gameBoard) => {
  for (let x = 1  ; x < gameBoard.length  ; x++) {
    for (let y = 0 ; y < gameBoard.length ; y++) {
      if (gameBoard[y][x] !== 0) {
        gameBoard = checkLeft(gameBoard, {x, y});
      }
    }
  }
  const newGameBoard = [...gameBoard];
  return {
    type: SWIPE,
    payload: newGameBoard
  };
};

const checkAbove = (board, position) => {
  const {x, y} = position  
  const cur = board[y][x];
  const neigh = board[y-1][x];
  if (neigh !== 0) {
    if(cur === neigh) {
      board[y-1][x] += cur;
      board[y][x] = 0;
      if (y-1 > 0) {
        board = checkAbove(board, {x: x, y: y-1});
      }
    } 
  } else {
    board[y-1][x] = cur;
    board[y][x] = 0;
    if (y-1 > 0) {
      board = checkAbove(board, {x: x, y: y-1});
    }
  }
  return board;
}

const checkUnder = (board, position) => {
  const {x, y} = position  
  const cur = board[y][x];
  const neigh = board[y+1][x];
  if (neigh !== 0) {
    if(cur === neigh) {
      board[y+1][x] += cur;
      board[y][x] = 0;
      /**
       * board.length -3 omdat
       * board.length = 4
       * board[4] -> buiten het bereik
       * board[3] -> is laatste element van array (kan niet met opschuiven)
       * board[2] -> voorlaatste element van array (kan dus nog één lager)
       */
      if (y+1 < board.length - 3) {
        board = checkUnder(board, {x: x, y: y+1});
      }
    } 
  } else {
    board[y+1][x] = cur;
    board[y][x] = 0;
    if (y-1 < board.length - 3) {
      board = checkUnder(board, {x: x, y: y+1});
    }
  }
  return board;
}

const checkRight = (board, position) => {
  console.log(board, position);  
  const {x, y} = position  
  const cur = board[y][x];
  const neigh = board[y][x+1];
  if(neigh != 0) {
    if(cur === neigh) {
      board[y][x+1] += cur;
      board[y][x] = 0;
      if (x+1 < board.length - 3) {
        board = checkRight(board, {x: x+1, y:y});
      }
    }
  } else {
    board[y][x+1] = cur;
    board[y][x] = 0;
    
    if (x-1 < board.length -3) {
      board = checkRight(board, {x: x+1, y:y})
    } 
  }
  return board;
}

const checkLeft = (board, position) => {
  console.log(board, position);  
  const {x, y} = position  
  const cur = board[y][x];
  const neigh = board[y][x-1];
  if(neigh != 0) {
    if(cur === neigh) {
      board[y][x-1] += cur;
      board[y][x] = 0;
      if (x-1 > 0) {
        board = checkLeft(board, {x: x-1, y:y});
      }
    }
  } else {
    board[y][x-1] = cur;
    board[y][x] = 0;
    
    if (x-1 > 0) {
      board = checkLeft(board, {x: x-1, y:y})
    } 
  }
  return board;
}


