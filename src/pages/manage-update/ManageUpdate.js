import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import ManageNav from './ManageNav';
import ManageUpdatemNotice from './ManageUpdateNotice';
import ManageUpdatemRoomType from './ManageUpdateRoomType';
import ManageUpdatemAddress from './ManageUpdateAddress';
import ManageUpdatemSend from './ManageUpdateSend';
import { InfoDispatchContext } from './context';
import ManageUpdateDetail from './ManageUpdateDetail';
import ManageUpdateRoomInfo from './ManageUpdateRoomInfo';
import ManageUpdateTradeType from './ManageUpdateTradeType';

function ManageUpdate() {
  // 유효성 검사 추가. 검증 실패시 해당 ref 위치로 스크롤
  // map 라이브러리 사용하여 refactor
  const RealEstateId = useParams();
  const token = localStorage.getItem('access_token');

  useEffect(() => {
    fetch(`http://localhost:8000/estates/${RealEstateId.id}`, {
      method: 'GET',
      headers: { 'Content-type': 'application/json', token: token },
    })
      .then(rest => rest.json())
      .then(data => {
        InfoDispatchContext({
          type: 'UPDATE_CATEGORY',
          category_id: data.category_id,
        });
        InfoDispatchContext({
          type: 'UPDATE_ADDRESS',
          address_main: data.address_main,
        });
        InfoDispatchContext({
          type: 'UPDATE_BUILDINGNAME',
          building_name: data.building_name,
        });
        InfoDispatchContext({
          type: 'UPDATE_DONG',
          address_dong: data.address_dong,
        });
        InfoDispatchContext({
          type: 'UPDATE_HO',
          address_ho: data.address_ho,
        });
        InfoDispatchContext({
          type: 'UPDATE_SUPPLY_SIZE',
          supply_size: data.supply_size,
        });
        InfoDispatchContext({
          type: 'UPDATE_EXCLUSIVE_SIZE',
          exclusive_size: data.exclusive_size,
        });
        InfoDispatchContext({
          type: 'UPDATE_BUILDING_FLOOR',
          building_floor: data.building_floor,
        });
        InfoDispatchContext({
          type: 'UPDATE_CURRENT_FLOOR',
          building_floor: data.current_floor,
        });
        InfoDispatchContext({
          type: 'UPDATE_AVAILABLE_DATE',
          available_date: data.available_date,
        });
        InfoDispatchContext({
          type: 'UPDATE_DETAIL_TITLE',
          detail_title: data.description_title,
        });
        InfoDispatchContext({
          type: 'UPDATE_DETAIL_CONTENT',
          detail_content: data.description_detail,
        });
        InfoDispatchContext({
          type: 'UPDATE_PRICE_MAIN',
          price_main: data.price_main,
        });
        InfoDispatchContext({
          type: 'UPDATE_PRICE_DEPOSIT',
          price_deposit: data.price_deposit,
        });
        InfoDispatchContext({
          type: 'UPDATE_PRICE_MONTHLY',
          price_monthly: data.price_monthly,
        });
        InfoDispatchContext({
          type: 'UPDATE_TRADE_ID',
          trade_id: data.trade_id,
        });
        InfoDispatchContext({
          type: 'UPDATE_HEAT',
          price_deposit: data.heat_id,
        });
      });
  }, []);

  return (
    <>
      <Header />
      <Wrapper>
        <TitleWrapper>
          <Title>방내놓기</Title>
        </TitleWrapper>
        <ManageNav select="form" />
        <ManageUpdatemNotice />
        <ManageUpdatemRoomType />
        <ManageUpdatemAddress />
        <ManageUpdateTradeType />
        <ManageUpdateRoomInfo />
        <ManageUpdateDetail />
        <ManageUpdatemSend />
      </Wrapper>
      <Footer />
    </>
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

export default ManageUpdate;
