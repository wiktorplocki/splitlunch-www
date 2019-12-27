import styled from "styled-components";
import { Link } from "react-router-dom";
import { Card } from "../../components";

const PageForm = styled.form`
  font-family: "Lato", sans-serif;
  margin: 0 auto;
`;

const FullScreenContainer = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  flex: 1;
`;

const Header = styled.p`
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
  width: 9.375vw;
  margin: 32px;
  & > :not(:first-child) {
    margin-top: 24px;
  }
  & > :last-child {
    margin-top: 16px;
  }
`;

const ForgotPasswordLink = styled(Link)`
  color: #01b6f5;
  text-align: center;
  font-size: 1rem;
`;

export {
  PageForm,
  FullScreenContainer,
  Header,
  StyledCard,
  InputsContainer,
  ForgotPasswordLink
};
