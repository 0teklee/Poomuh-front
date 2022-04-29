import React, { useEffect, useState } from 'react';
import RecentRoomCard from './RecentRoomCard.js';
import styled from 'styled-components';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import NavBar from './NavBar';

function FavoriteRecent() {
  const token = localStorage.getItem('access_token');
  const [recentRoom, setRecentRoom] = useState([]);

  useEffect(() => {
    //최근본방 API (회원/비회원 분리)*******************************************************************
    if (token) {
      fetch('http://localhost:8000/favorites/users/recent', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          recent: JSON.parse(localStorage.recentRoom).join(), //배열 요소들을 string 형태로 보냅니다. ex. 3,4,1,2 (string)
          token: token,
          state: 'recent',
        },
      })
        .then(res => res.json())
        .then(data => setRecentRoom(data.recent))
        .then(console.log(recentRoom));
    } else {
      fetch('http://localhost:8000/favorites/recent', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          recent: JSON.parse(localStorage.recentRoom).join(),
          state: 'recent',
        },
      })
        .then(res => res.json())
        .then(data => setRecentRoom(data.recent))
        .then(console.log(recentRoom));
    }

    //최근본방 목데이터 API
    // fetch('/data/RecentRoomData.json')
    //   .then(res => res.json())
    //   .then(data => {
    //     setRecentRoom(data);
    //   });
  }, []);

  // console.log(typeof JSON.parse(localStorage.getItem('recentRoom')));
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
        {recentRoom.length === 0 ? (
          <Notification>최근에 본 방이 없습니다.</Notification>
        ) : (
          <CardWrapper>
            {recentRoom.map(data => {
              console.log(data);
              return <RecentRoomCard key={data.id} data={data} />;
            })}
          </CardWrapper>
        )}
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
const Notification = styled.p`
  margin: 5rem;
  text-align: center;
  color: rgb(202, 202, 202);
`;
const CardWrapper = styled.p`
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  margin-bottom: 7rem;
  margin-left: -15px;
`;
export default FavoriteRecent;
