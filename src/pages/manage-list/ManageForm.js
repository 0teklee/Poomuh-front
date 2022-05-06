import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Header from '../../components/header/Header';
import ManageNav from './ManageNav';

function ManageForm() {
  return (
    <Wrapper>
      <Header />
      <TitleWrapper>
        <Title>방내놓기</Title>
      </TitleWrapper>
      <ManageNav select="form" />
    </Wrapper>
  );
}

const Wrapper = styled.section``;
const TitleWrapper = styled.header`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  height: 200px;
`;
const Title = styled.h1`
  font-size: 2rem;
`;

export default ManageForm;
