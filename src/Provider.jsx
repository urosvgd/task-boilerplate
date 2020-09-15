// @flow

import React, { createContext, useRef, useState } from "react";
import Timer from "./algorithms/Timer";
import {
  BOARD,
  KEYS,
  DELAY_NORMAL,
  ITEM_INITIAL,
  ITEM_FIXED,
  ITEM_CLICKED,
} from "./constants";

const Context = createContext();

const Provider = ({ children }) => {
  const [isPathExist, setIsPathExist] = useState(true);
  const [currentLevel, setCurrentLevel] = useState(1);
  const [isVisualized, setIsVisualized] = useState(false);
  const [isHelped, setIsHelped] = useState(false);

  const begin = useRef({ x: 4, y: 0 });
  const end = useRef({
    x: 9,
    y: 4,
  });
  const board = useRef(JSON.parse(JSON.stringify(BOARD)));
  const setItemCache = useRef({});
  const pathFinder = useRef(null);
  const delay = useRef(DELAY_NORMAL);

  const updateItem = (ridx, cidx, type = ITEM_FIXED, timeFactor = 0) => {
    if (
      ridx === begin.x &&
      cidx === begin.y &&
      ridx === end.x &&
      cidx === end.y
    )
      return;

    board.current[ridx][cidx] = type;
    const setItem = setItemCache.current[KEYS[ridx][cidx]];
    if (timeFactor) {
      const timer = new Timer({
        callback: () => setItem(type),
        delay: timeFactor * delay.current,
      });
      pathFinder.current.timers.push(timer);
    } else {
      setItem(type);
    }
  };

  const clear = () => {
    if (!isPathExist) setIsPathExist(true);
    if (isVisualized) setIsVisualized(false);
    const currentBoard = board.current;
    currentBoard.forEach((row, ridx) => {
      row.forEach((item, cidx) => {
        updateItem(ridx, cidx, ITEM_INITIAL);
      });
    });
  };

  const clearPath = () => {
    board.current.forEach((row, ridx) => {
      row.forEach((item, cidx) => {
        if (board.current[ridx][cidx] !== ITEM_CLICKED) {
          updateItem(ridx, cidx, ITEM_INITIAL);
        }
      });
    });
  };

  return (
    <Context.Provider
      value={{
        // States
        isPathExist,
        isVisualized,
        isHelped,
        currentLevel,

        // Methods
        clear,
        clearPath,
        updateItem,
        setIsPathExist,
        setIsVisualized,
        setIsHelped,
        setCurrentLevel,

        // Refs
        pathFinder,
        begin,
        end,
        board,
        setItemCache,
        delay,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export { Context, Provider };
