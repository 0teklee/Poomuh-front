import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Header from '../../components/header/Header';

function ManageForm() {
  return (
    <Wrapper>
      <Header />
      <TitleWrapper>
        <Title>방내놓기</Title>
      </TitleWrapper>
      <ComponentNav>
        <ComponentButton>
          <Link to="/manage/form">방내놓기</Link>
        </ComponentButton>
        <ComponentButton>
          <Link to="/manage/list">내 방관리</Link>
        </ComponentButton>
      </ComponentNav>
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
const ComponentNav = styled.ul`
  display: flex;
  flex: 0 0 auto;
  justify-content: center;
  align-items: center;
  height: 48px;
  margin: 0px auto;
  border-bottom: 1px solid rgb(232, 232, 232);
`;
const ComponentButton = styled.li`
  flex-grow: 1;
  text-align: center;
`;
export default ManageForm;
