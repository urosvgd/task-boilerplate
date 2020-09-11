import styled from 'styled-components';

const StyledHeader = styled.div`
  .content-header {
  display: flex;
  flex-direction: row;
  justify-content: center;
  height: calc(9vh - 20px);
  margin-bottom: 20px;
  padding: 10px 0;
  box-sizing: border-box;
  font-size: 20px;
  color: white;

  &__select {
    height: 100%;
    width: 200px;
    margin-right: 20px;
    border-radius: none;
    font-family: inherit;
    font-size: inherit;
    color: inherit;
    border: none;
    outline: none;
    cursor: pointer;
    -webkit-appearance: none;
    appearance: none;
    background: #5c7cfa;
    background-repeat: no-repeat;
    background-position-x: 100%;
    background-position-y: 5px;
    padding-left: 10px;

    &:disabled {
      @extend %disabled;
    }
  }

  &__button {
    $button: &;
    display: flex;
    font-family: inherit;
    font-weight: bold;
    font-size: inherit;
    cursor: pointer;
    background: #339af0;
    appearance: none;
    -webkit-appearance: none;
    border: none;
    padding: 0 10px;
    margin-right: 20px;
    box-shadow: 0 3px 3px 0 #74c0fc;
    color: inherit;
    transition: transform 0.2s linear;
    outline: none;

    &--pause {
      /* @extend #{$button}; */
      background-color: #20c997;
    }

    &--usage {
      /* @extend #{$button}; */
      background-color: #40c057;
      box-shadow: 0 3px 3px 0 #8ce99a;
    }
  }
}
`;

export default StyledHeader;
