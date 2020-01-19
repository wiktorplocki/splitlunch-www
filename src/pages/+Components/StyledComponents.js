import styled from "styled-components";
import { Link } from "react-router-dom";
import { Card } from "../../components";

const PageForm = styled.form`
  font-family: "Lato", sans-serif;
  margin: 0 auto;
`;

const Header = styled.h1`
  font-size: 24px;
  font-weight: 300;
  text-align: center;
  color: #576574;
  margin: 16px 20px;
`;

const StyledCard = styled(Card)`
  margin-bottom: 16px;
`;

const InputsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 32px;
  & > :not(:first-child) {
    margin-top: 24px;
  }
  & > :last-child {
    margin-top: 16px;
  }

  @media (min-width: 270px) {
    width: 75vw;
  }

  @media (min-width: 540px) {
    width: 37.5vw;
  }

  @media (min-width: 1080px) {
    width: 18.75vw;
  }

  @media (min-width: 2160px) {
    width: 9.375vw;
  }
`;

const StyledLink = styled(Link)`
  color: #01b6f5;
  text-align: center;
  font-size: 1rem;
`;

export { PageForm, Header, StyledCard, InputsContainer, StyledLink };
