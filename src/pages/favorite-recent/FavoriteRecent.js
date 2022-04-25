import React, { useEffect, useState } from 'react';
import RecentRoomCard from './RecentRoomCard.js';
import styled from 'styled-components';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import NavBar from './NavBar';

function FavoriteRecent() {
  const [recentRoom, setRecentRoom] = useState([]);
  //최근본방의 데이터 => 지도페이지에서 매물 클릭시 해당 데이터를 로컬스토리지에 저장, 최근본방에 가져오기?

  //최근본방 목데이터 가져오기
  useEffect(() => {
    fetch('/data/RecentRoomData.json')
      .then(res => res.json())
      .then(data => {
        setRecentRoom(data);
      });
  }, []);

  return (
    <Wrapper>
      <Header />
      <Main>
        <TitleWrapper>
          <Title>관심목록</Title>
        </TitleWrapper>
        <NavBar select="recent" />
        <CountInfoWrapper>
          <CountRecent>
            총 <span>{recentRoom.length}개</span>의 최근 본 방이 있습니다.
          </CountRecent>
          <CountInfo>최근 본 방은 20개까지 저장됩니다.</CountInfo>
        </CountInfoWrapper>
        <CardWrapper>
          {recentRoom.map(data => (
            <RecentRoomCard key={data.id} data={data} />
          ))}
        </CardWrapper>
      </Main>
      <Footer />
    </Wrapper>
  );
}

const Wrapper = styled.section``;
const Main = styled.section`
  margin: 0 auto;
  padding: 0 1rem;
  width: 1200px;
`;
const TitleWrapper = styled.header`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 200px;
  // border: 1px solid black;
`;
const Title = styled.h1`
  font-size: 2rem;
`;
const CountInfoWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 2rem 0;
`;
const CountRecent = styled.h2`
  span {
    color: #326cf9;
  }
`;

const CountInfo = styled.p`
  color: rgb(202, 202, 202);
`;

const CardWrapper = styled.p`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-bottom: 7rem;
`;
export default FavoriteRecent;
