import React, { useContext, useState, useRef, useEffect } from "react";
import { Context } from "../../Provider";
import { KEYS, BOARD, ITEM_CLICKED, ITEM_INITIAL } from "../../constants.js";
import StyledBoard from "./StyledBoard";
import Item from "../Item/Item";

const Board = () => {
  const context = useContext(Context);
  const {
    updateItem,
    begin,
    end,
    isVisualized,
    currentLevel,
    pause,
    setPause,
    setIsVisualized,
    clear,
  } = context;
  const [clicking, setClicking] = useState(false);
  const [dragging, setDragging] = useState({
    begin: false,
    end: false,
  });
  const clickPos = useRef({ x: -1, y: -1 });

  const onMouseDown = (e) => {
    const ridx = Number(e.target.dataset.ridx);
    const cidx = Number(e.target.dataset.cidx);
    if (ridx === begin.current.x && cidx === begin.current.y) {
      setDragging({ begin: true, end: false });
    } else if (ridx === end.current.x && cidx === end.current.y) {
      setDragging({ begin: false, end: true });
    } else {
      clickPos.current = { x: ridx, y: cidx };
      setClicking(true);
    }
  };

  const onMouseUp = () => {
    setClicking(false);
    setDragging({ begin: false, end: false });
  };

  const onClick = (e) => {
    if (isVisualized) return;
    changeColor(e, false);
  };

  const onMouseMove = (e) => {
    if (isVisualized) return;
    if (e.target.className !== "board__item") return;

    const ridx = Number(e.target.dataset.ridx);
    const cidx = Number(e.target.dataset.cidx);

    if (dragging.begin || dragging.end) {
      const formerX = dragging.begin ? begin.current.x : end.current.x;
      const formerY = dragging.begin ? begin.current.y : end.current.y;

      updateItem(formerX, formerY, ITEM_INITIAL);

      const next = { x: ridx, y: cidx };

      if (dragging.begin) {
        begin.current = next;
      } else {
        end.current = next;
      }

      updateItem(next.x, next.y);
    } else {
      if (!clicking) return;
      if (clickPos.current.x === ridx && clickPos.current.y === cidx) return;
      changeColor(e, true);
    }
  };

  const changeColor = (e, mouseMove) => {
    if (e.target.className !== "board__item") return;
    const { type } = e.target.dataset;
    if (type !== ITEM_INITIAL && type !== ITEM_CLICKED) return;

    const ridx = Number(e.target.dataset.ridx);
    const cidx = Number(e.target.dataset.cidx);

    const itemType =
      type === ITEM_CLICKED && !mouseMove ? ITEM_INITIAL : ITEM_CLICKED;
    updateItem(ridx, cidx, itemType);
  };

  const changeColorRandom = (e) => {
    if (e.target.className !== "board__item") return;
    const { type } = e.target.dataset;
    if (type !== ITEM_INITIAL && type === ITEM_CLICKED) return;

    const getRandomInt = (min, max) => {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min;
    };
    const ridx = getRandomInt(2, 8);
    const cidx = getRandomInt(2, 8);
    const itemType = type === ITEM_CLICKED ? ITEM_INITIAL : ITEM_CLICKED;
    updateItem(ridx, cidx, itemType);
  };

  const randomObstacles = (e) => {
    for (let i = 1; i < currentLevel; i++) {
      changeColorRandom(e, true);
    }
  };
  // eslint-disable-next-line
  const onClearAll = () => {
    if (isVisualized && !pause) return;
    if (pause) setPause(false);
    setIsVisualized(false);
    clear();
  };

  useEffect(() => {
    if (!isVisualized) {
      onClearAll();
    }
  }, [currentLevel, isVisualized, onClearAll]);

  return (
    <StyledBoard
      className="board"
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onMouseMove={onMouseMove}
      onClick={onClick}
      role="button"
      tabIndex="0"
    >
      <div className="board__row">
        <button className="board__item" onClick={randomObstacles}>
          Create Obstacles
        </button>
      </div>
      {BOARD.map((row, ridx) => (
        <div className="board__row" key={ridx}>
          {row.map((col, cidx) => (
            <Item ridx={ridx} cidx={cidx} key={KEYS[ridx][cidx]} />
          ))}
          <br />
        </div>
      ))}
    </StyledBoard>
  );
};

export default Board;
