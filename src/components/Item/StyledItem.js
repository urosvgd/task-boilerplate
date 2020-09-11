import styled from 'styled-components';

const StyledItem = styled.div`
  .board__item {
    width: calc(calc(calc(100vh - (10vh - 9vh + 10vh)) / 10) - 5px);
    height: calc(calc(calc(100vh - (10vh - 9vh + 10vh)) / 10) - 5px);
    margin: 3px;
    border-radius: 3px;
    box-shadow: 0 2px 0 #bbb;
    cursor: pointer;
    transition: background-color 0.3s ease-out;
  }
`;

export default StyledItem;
