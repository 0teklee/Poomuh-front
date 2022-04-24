import React from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import RecentRoom from './RecentRoom';
import PreemptRoom from './PreemptRoom';

function Favorite() {
  // const [card, setCard] = useState(<RecentRoom />);
  const [card, setCard] = useState('1번');

  const switchCard = () => {
    {
      card === '1번' ? setCard('2번') : setCard('1번');
      console.log('카드상태:' + card);
    }
  };

  return (
    <>
      <Wrapper>
        <Header />
        <Main>
          <Title>관심목록</Title>
          <NavBar>
            <NavRecent onClick={switchCard}>최근 본 방</NavRecent>
            <NavPreempt onClick={switchCard}>찜한 방</NavPreempt>
          </NavBar>
        </Main>
        {card}
        <Footer />
      </Wrapper>
    </>
  );
}

export default Favorite;

const Wrapper = styled.div`
  // font-family: 'Spoqa Han Sans', -apple-system, sans-serif;
`;
const Main = styled.div`
  width: 80rem;
  margin: auto;
`;
const NavBar = styled.div`
  color: rgb(202, 202, 202);
  margin: 1rem;
  display: flex;
  justify-content: center;
`;
const NavRecent = styled.div`
  padding-bottom: 1rem;
  width: 20rem;
  text-align: center;
  border-bottom: 1px solid rgb(202, 202, 202);
  :hover {
    cursor: pointer;
  }
`;
const NavPreempt = styled.div`
  padding-bottom: 1rem;
  width: 20rem;
  text-align: center;
  border-bottom: 1px solid rgb(202, 202, 202);
  :hover {
    cursor: pointer;
  }
`;

const Title = styled.h1`
  margin: 5rem 0 2rem;
  text-align: center;
  font-size: 2rem;
  font-weight: 400;
  // border: 1px solid black;
`;
