import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import PreemptRoomCard from './PreemptRoomCard';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import NavBar from '../favorite-recent/NavBar';

function FavoritePreempt() {
  const [preemptRoom, setPreemptRoom] = useState([]);

  console.log(preemptRoom);
  useEffect(() => {
    // fetch('찜한방 API', {
    //   method: 'GET',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    // }).then(res => res.json());

    //찜한방 목데이터
    fetch('/data/PreemptData.json')
      .then(res => res.json())
      .then(data => {
        setPreemptRoom(data);
      });
  }, []);
  return (
    <Wrapper>
      <Header />
      <Main>
        <TitleWrapper>
          <Title>관심목록</Title>
        </TitleWrapper>
        <NavBar select="preempt" />
        <CountInfoWrapper>
          <CountRecent>
            총 <span>{preemptRoom.length}</span>개의 찜한 방이 있습니다.
          </CountRecent>
        </CountInfoWrapper>
        {preemptRoom.length === 0 ? (
          <Notification>찜한 방이 없습니다.</Notification>
        ) : (
          <CardWrapper>
            {preemptRoom.map(data => (
              <PreemptRoomCard key={data.id} data={data} />
            ))}
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
const Notification = styled.p`
  margin: 5rem;
  text-align: center;
  color: rgb(202, 202, 202);
`;
const CardWrapper = styled.p`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-bottom: 7rem;
`;
export default FavoritePreempt;
