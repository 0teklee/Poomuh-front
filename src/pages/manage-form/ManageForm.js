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
  // 유효성 검사 추가. 검증 실패시 해당 ref 위치로 스크롤
  // map 라이브러리 사용하여 refactor
  // css 하드코딩 된 부분 수정 22/04/22
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
