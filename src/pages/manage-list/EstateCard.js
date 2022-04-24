import React from 'react';
import styled from 'styled-components';

const EstateCard = () => {
  return (
    <Wrapper>
      <CardBox>
        <EstateBox>
          <EstateDeadline>
            <div className="estateNum">
              <p>매물번호 27248658</p>
            </div>
            <div className="adInfo">
              <p className="advertising">광고중</p>
              <p className="expirationDate">광고종료 D-29</p>
            </div>
          </EstateDeadline>
          <EstateInfo>
            <div className="imgWrapper">
              <img src="" alt="매물 사진" />
            </div>
            <div className="infoWrapper">
              <p className="type">원룸</p>
              <p className="price">월세 1억 2342만/122만</p>
              <p className="status">업로드 처리중입니다.</p>
            </div>
          </EstateInfo>
        </EstateBox>
        <DescriptionBox>
          <Description>
            <div className="descBox" />
          </Description>
          <Buttons>
            <div className="registerDate">
              <p>등록일</p>
              <p>조회수</p>
              <p>찜</p>
            </div>
          </Buttons>
        </DescriptionBox>
      </CardBox>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  width: 100%;
`;

const CardBox = styled.section`
  display: flex;
  flex-wrap: nowrap;
  width: 100%;
  border: 1px solid rgb(226, 226, 226);
`;

const EstateBox = styled.section`
  display: flex;
  flex-wrap: nowrap;
  width: 50%;
  border: 1px solid rgb(226, 226, 226);
`;

const DescriptionBox = styled.section`
  display: flex;
  flex-wrap: nowrap;
  width: 50%;
  border: 1px solid rgb(226, 226, 226);
`;

const EstateDeadline = styled.div`
  width: 40%;
  text-align: center;
  font-size: 14px;
  font-weight: 500;
  border-right: 1px solid rgb(226, 226, 226);

  .estateNum {
    width: 70%;
    margin: 30px auto 10px;
    padding-bottom: 15px;
    border-bottom: 1.5px solid rgb(226, 226, 226);
    text-align: center;
  }

  .adInfo {
    margin-bottom: 20px;
    line-height: 20px;
    .advertising {
      color: #1564f9;
      font-size: 15px;
    }
    .expirationDate {
      color: #62a6ff;
      font-size: 13px;
    }
  }
`;

const EstateInfo = styled.div`
  display: flex;
  flex-wrap: nowrap;
  width: 70%;

  .imgWrapper {
    margin: auto 10px;
    width: 50%;
    height: 70%;
    border: 1px solid rgb(226, 226, 226);
  }

  .infoWrapper {
    margin: auto 10px;
    width: 40%;
    height: 70%;
    font-size: 18px;
    font-weight: 700;
    line-height: 25px;
    .status {
      font-size: 14px;
      font-weight: 400;
    }
  }
`;

const Description = styled.div`
  width: 50%;
  border-right: 1px solid rgb(226, 226, 226);

  .descBox {
    margin: 20px auto;
    width: 80%;
    height: 65%;
    border: 1px solid rgb(226, 226, 226);
  }
`;

const Buttons = styled.div`
  width: 50%;
`;
export default EstateCard;
