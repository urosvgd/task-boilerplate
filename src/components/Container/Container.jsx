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
  const { isPathExist, clear, currentLevel } = context;
  const [isErrorOpen, setIsErrorOpen] = useState(false);

  useEffect(() => {
    if (!isPathExist) {
      clear();
      setIsErrorOpen(true);
      context.setCurrentLevel(1);
    }
  }, [isPathExist, clear, context]);

  const onErrorClose = () => {
    setIsErrorOpen(false);
  };

  const countShortestPath = () => {
    const shortest = [];
    // eslint-disable-next-line
    context.board.current.map((field) => {
      // eslint-disable-next-line
      field.map((f) => {
        if (f === "ITEM_SHORTEST") {
          const shortestOne = f.length;
          shortest.push(shortestOne);
        }
      });
    });
    // Removed two elements from array, one on which you stand and one on end
    shortest.splice(0, 2);
    return <p>{shortest.length}</p>;
  };

  const countVisitedFields = () => {
    const visitedFields = [];
    // eslint-disable-next-line
    context.board.current.map((field) => {
      // eslint-disable-next-line
      field.map((f) => {
        if (f === "ITEM_VISITED" || f === "ITEM_SHORTEST") {
          const visitedOne = f.length;
          visitedFields.push(visitedOne);
        }
      });
    });
    visitedFields.splice(0, 2);
    return <p>{visitedFields.length}</p>;
  };

  return (
    <StyledContainer>
      <Header />
      <Data>
        Steps:
        {countShortestPath()}
      </Data>
      <Data>
        Visited Fields:
        {countVisitedFields()}
      </Data>
      <Data>
        Keep in mind black ones does not count in steps and visited fields here
        :))
        <ModalError
          isErrorOpen={isErrorOpen}
          noError={!isErrorOpen}
          onErrorClose={onErrorClose}
        />
      </Data>
      <Data>
        Level:
        {currentLevel}
      </Data>
      <Board />
    </StyledContainer>
  );
};

export default Container;
