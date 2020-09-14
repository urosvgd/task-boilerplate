import styled from "styled-components";

const StyledHeader = styled.div`
  .content-header {
    background-color: #282c34;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    font-size: calc(10px + 2vmin);
    color: white;
    padding: 1em;

    .content-header__select {
      margin: 5px;
    }

    .content-header__button {
      margin: 5px;
    }

    &__select {
      height: 100%;
      /* width: 200px; */
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
      padding-left: 10px;
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
        background-color: #20c997;
      }

      &--usage {
        background-color: #40c057;
        box-shadow: 0 3px 3px 0 #8ce99a;
      }
    }
    @media (max-width: 768px) {
    display: flex;
    justify-content: space-around;
    flex-flow: column nowrap;
    margin: 10px 0 20px 0;
  }
  }
`;

export default StyledHeader;
