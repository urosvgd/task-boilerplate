import React, { useEffect, useContext, useState } from "react";
import Modal from "react-modal";
import Header from "../Header/Header";
import Board from "../Board/Board";
import { Context } from "../../Provider";
import ModalError from "../ModalError/ModalError";
import { Data, StyledContainer } from "./Styled";

Modal.setAppElement("#root");

const Container = () => {
  const context = useContext(Context);
  const { isPathExist, clear } = context;
  const [isErrorOpen, setIsErrorOpen] = useState(false);
  useEffect(() => {
    if (!isPathExist) {
      clear();
      setIsErrorOpen(true);
    }
  }, [isPathExist, clear]);

  const onErrorClose = () => {
    setIsErrorOpen(false);
  };

  const countShortestPath = () => {
    let shortest = [];
    // eslint-disable-next-line
    context.board.current.map((field) => {
      // eslint-disable-next-line
      field.map((f) => {
        if (f === "ITEM_SHORTEST") {
          let shortestOne = f.length;
          shortest.push(shortestOne);
        }
      });
    });
    // Removed two elements from array, one on which you stand and one on end
    shortest.splice(0, 2);
    return <p>{shortest.length}</p>;
  };

  const countVisitedFields = () => {
    let visitedFields = [];
    // eslint-disable-next-line
    context.board.current.map((field) => {
      // eslint-disable-next-line
      field.map((f) => {
        if (f === "ITEM_VISITED" || f === "ITEM_SHORTEST") {
          let visitedOne = f.length;
          visitedFields.push(visitedOne);
        }
      });
    });
    visitedFields.splice(0, 2);
    return <p>{visitedFields.length}</p>;
  };

  return (
    <StyledContainer>
      <ModalError isErrorOpen={isErrorOpen} onErrorClose={onErrorClose} />
      <Header />
      <Data>
        <h3>Begin at X tile: {context.begin.current.x + 1}</h3>
      </Data>
      <Data>
        <h3>Begin at Y tile: {context.begin.current.y + 1}</h3>
      </Data>
      <Data>
        <h3>End at x tile: {context.end.current.x + 1}</h3>
      </Data>
      <Data>
        <h3>End at Y tile: {context.end.current.y + 1}</h3>
      </Data>
      <Data>Steps: {countShortestPath()}</Data>
      <Data>Visited Fields: {countVisitedFields()}</Data>

      <Data>
        <h3>
          Keep in mind black ones does not count in steps and visited fields
          here :))
        </h3>
      </Data>
      <Board />
    </StyledContainer>
  );
};

export default Container;
