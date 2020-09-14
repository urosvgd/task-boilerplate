import styled from 'styled-components';

const sizes = {
	headerHeight: '10vh',
	contentHeaderHeight: '9vh',
	footerHeight: '10vh',
};

const StyledBoard = styled.div`
  .board {
    display: flex;
    flex-direction: column;
    outline: none;
    height: calc(
      100vh -
        (
          ${sizes.headerHeight} + ${sizes.contentHeaderHeight} +${sizes.footerHeight}
        )
    );
    &__row {
      display: flex;
      flex-direction: row;
      justify-content: center;

      button {
        margin: 1em 0 1em 0;
        padding: 1em 1em 1em 1em;
        font-weight: bold;
        font-size: inherit;
        cursor: pointer;
        background: #339af0;
        appearance: none;
        -webkit-appearance: none;
        border: none;
        margin-right: 20px;
        box-shadow: 0 3px 3px 0 #74c0fc;
        color: inherit;
        transition: transform 0.2s linear;
        outline: none;
      }
    }
  }
`;

export default StyledBoard;
