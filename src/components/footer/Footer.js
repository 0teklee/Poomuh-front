import React from 'react';
import styled from 'styled-components';
import { AiOutlineInstagram, AiFillYoutube } from 'react-icons/ai';
import { FaFacebookF } from 'react-icons/fa';
import { SiNaver } from 'react-icons/si';
import { RiKakaoTalkFill } from 'react-icons/ri';

function Footer() {
  return (
    <FooterContainer>
      <FooterInner>
        <FooterNav>
          <List>회사소개</List>
          <List>|</List>
          <List>이용약관</List>
          <List>|</List>
          <List>개인정보처리방침</List>
          <List>|</List>
          <List>매물관리규정</List>
        </FooterNav>
        <FooterBody>
          <CompanyInfo>
            <List>(주)사랑으로품어</List>
            <List>대표 : 김수빈, 마승우, 이택우, 전하은, 전해윤</List>
            <List>사업자 번호 : 333-44-51132</List>
            <List>통신판매업신고번호 : 제2022-서울 중구-01234호</List>
            <List>
              주소 : 서울특별시 중구 한강대로 416 서울스퀘어 13층
              (주)사랑으로품어
            </List>
            <br />
            <List>
              고객센터 : 02-1234-0987 (평일 10:00 ~ 18:00 토·일요일, 공휴일휴무)
            </List>
            <List>
              팩스 : 02-333-4444 &nbsp; 프로모션/사업 제휴문의 :
              biz@poomuh.co.kr &nbsp;허위매물 신고 : service@poomang.com
            </List>
            <br />
            <List>Station3, Inc. All rights reserved.</List>
          </CompanyInfo>
          <FooterBodyRight>
            <Award>
              <AwardLeft>
                <AwardIcon>🥇</AwardIcon>
              </AwardLeft>
              <AwardRight>
                <AwardText>푸망, 2022년 한국서비스품질지수</AwardText>
                <AwardText>부동산 중개 앱 1위 선정</AwardText>
              </AwardRight>
            </Award>
            <Icons>
              <IconWrap>
                <AiOutlineInstagram />
              </IconWrap>
              <IconWrap>
                <FaFacebookF />
              </IconWrap>
              <IconWrap>
                <AiFillYoutube />
              </IconWrap>
              <IconWrap>
                <SiNaver />
              </IconWrap>
              <IconWrap>
                <RiKakaoTalkFill />
              </IconWrap>
            </Icons>
          </FooterBodyRight>
        </FooterBody>
      </FooterInner>
      {/* <TopButton>Top</TopButton> */}
    </FooterContainer>
  );
}

export default Footer;

const FooterContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 20rem;
  bottom: 0;
  color: rgb(170, 170, 170);
  background-color: rgb(55, 55, 55);
  // font-family: 'Spoqa Han Sans Neo', 'sans-serif';
`;

const FooterInner = styled.div`
  width: 80%;
  margin: 0 auto;
`;

const FooterNav = styled.ul`
  display: flex;
  border-bottom: 0.1px solid rgb(170, 170, 170);
  padding: 1.5rem 0;
  font-size: 1rem;
`;
const FooterBody = styled.ul`
  display: flex;
  justify-content: space-between;
  margin-top: 2rem;
`;

const FooterBodyRight = styled.div`
  position: relative;
`;

const List = styled.li`
  margin-right: 1rem;
  margin-top: 0.3rem;
  font-size: 0.8rem;
  list-style: none;
`;
const CompanyInfo = styled.div`
  background-color: transparent;
`;
const Award = styled.div`
  display: flex;
`;
const AwardLeft = styled.div``;

const AwardRight = styled.div`
  padding-top: 1rem;
  position: relative;
`;

const AwardText = styled.p`
  font-size: 0.7rem;
`;
const AwardIcon = styled.div`
  display: inline-block;
  font-size: 3rem;
`;
const Icons = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  position: absolute;
  bottom: 0;
`;
const IconWrap = styled.div`
  display: inline-block;
  border-radius: 50%;
  background-color: #4a4a4a;
  padding: 0.5rem;
  margin: 0.3rem;
  font-size: 1.5rem;
  color: white;
`;
// const TopButton = styled.button`
//   position: fixed;
//   width: 3rem;
//   height: 3rem;
//   right: 1rem;
//   bottom: 1rem;
//   border: none;
//   // border-radius: 50%;
// `;
