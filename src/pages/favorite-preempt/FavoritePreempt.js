import React from 'react';
import styled from 'styled-components';
import PreemptRoomCard from './PreemptRoomCard';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import NavBar from '../favorite-recent/NavBar';

function FavoritePreempt() {
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
            총 <span>{'7개'}</span>의 찜한 방이 있습니다.
          </CountRecent>
        </CountInfoWrapper>
        <CardWrapper>
          {/* {recentRoom.map(data => (
            <PreemptRoomCard key={data.id} data={data} />
          ))} */}
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
const CardWrapper = styled.p`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-bottom: 7rem;
`;
export default FavoritePreempt;
