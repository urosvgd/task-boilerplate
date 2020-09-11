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
    height: calc(100vh - (${sizes.headerHeight} + ${sizes.contentHeaderHeight} + ${sizes.footerHeight}));
    margin: 0 auto;

    &__row {
      display: flex;
      flex-direction: row;
      justify-content: center;
    }
  }
`;

export default StyledBoard;
