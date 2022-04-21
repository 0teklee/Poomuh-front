import React, { useContext } from 'react';
import styled from 'styled-components';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import ManageNav from './ManageNav';
import ManageFormNotice from './ManageFormNotice';
import ManageFormRoomType from './ManageFormRoomType';
import ManageFormAddress from './ManageFormAddress';
import ManageFormSend from './ManageFormSend';
import { GlobalContextProvider } from './context';
import ManageFormDetail from './ManageFormDetail';
import ManageFormRoomInfo from './ManageFormRoomInfo';
import ManageFormTradeType from './ManageFormTradeType';

function ManageForm() {
  return (
    <Wrapper>
      <Header />
      <TitleWrapper>
        <Title>방내놓기</Title>
      </TitleWrapper>
      <ManageNav select="form" />
      <GlobalContextProvider>
        <ManageFormNotice />
        <ManageFormRoomType />
        <ManageFormAddress />
        <ManageFormTradeType />
        <ManageFormRoomInfo />
        <ManageFormDetail />
        <ManageFormSend />
      </GlobalContextProvider>
      <Footer />
    </Wrapper>
  );
}

const Wrapper = styled.section`
  margin: 0 auto;
  padding: 0 1rem;
  width: 1200px;
`;
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
