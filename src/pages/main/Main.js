import React from 'react';
import styled from 'styled-components';

function Main() {
  return (
    <MainContainer>
      <ListBox>
        <Title>형태별 검색</Title>
        <Link>원룸</Link>
        <Link>오피스텔</Link>
        <Link>아파트</Link>
      </ListBox>
      <ListBox>
        <Title>패밀리 사이트</Title>
        <Link>푸망 중개사</Link>
        <Link>푸망 임대관리</Link>
        <Link>푸망싸인</Link>
      </ListBox>
      <ListBox>
        <Title>상품 소개</Title>
        <Link>패키지 상품</Link>
        <Link>일반 상품</Link>
        <Link>단지 상품</Link>
        <Link>프리미엄 상품</Link>
        <Link>플러스 상품</Link>
        <Link>이 지역 부동산 상품</Link>
      </ListBox>
      <ListBox>
        <Title>푸망 뉴스</Title>
        <Link>공지사항</Link>
        <Link>이벤트</Link>
      </ListBox>
      <ListBox>
        <Title>고객지원</Title>
        <Link>자주묻는 질문</Link>
        <Link>Android</Link>
        <Link>IOS</Link>
      </ListBox>
      <ListBox>
        <Title>About 푸망</Title>
        <Link>회사소개</Link>
        <Link>오시는 길</Link>
        <Link>제휴문의</Link>
      </ListBox>
    </MainContainer>
  );
}

export default Main;

const MainContainer = styled.div`
  font-family: 'Spoqa Han Sans', -apple-system, sans-serif;
  font-size: 1rem;
  display: flex;
  justify-content: space-around;
  margin: 0 1rem;
  // background-color: yellow;
`;

const ListBox = styled.div`
  margin: 2.5rem 0;
`;

const Title = styled.p`
  display: block;
  font-weight: bold;
  margin: 1.5rem 0;
  // background-color: green;
`;

const Link = styled.a`
  display: block;
  margin: 0.8rem 0;
  color: rgb(136, 136, 136);
  :hover {
    cursor: pointer;
  }
`;
