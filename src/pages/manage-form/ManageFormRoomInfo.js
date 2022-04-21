import React from 'react';
import styled from 'styled-components';

function ManageFormRoomInfo() {
  const floorSelect = num => {
    let result = [];
    for (let i = 0; i.length < num; i++) {}
  };
  return (
    <Wrapper>
      <Title>기본 정보</Title>
      <FlexDiv>
        <div className="size">
          <div className="title">건물 크기</div>
          <div className="inner">
            <div>
              <span>공급 면적</span>
            </div>
            <div>
              <span>전용 면적</span>
            </div>
          </div>
        </div>
        <div className="story">
          <div className="title">건물 층수</div>
          <div className="inner">
            <div>
              <span>건물 층수</span>
              <select>
                <option>1</option>
                <option>2</option>
                <option>3</option>
              </select>
            </div>
            <div>
              <span>해당 층수</span>
              <select>
                <option>1</option>
                <option>2</option>
                <option>3</option>
              </select>
            </div>
          </div>
        </div>
      </FlexDiv>
      <RowWrapper>
        <RowHead>난방 종류</RowHead>
        <RowContent>난방 종류 선택</RowContent>
      </RowWrapper>
      <RowWrapper>
        <RowHead>입주 가능일</RowHead>
        <RowContent>즉시 입주, 날짜 협의, 날짜 선택</RowContent>
      </RowWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  width: 100%;
  margin-bottom: 50px;
  border-radius: 4px;
  box-shadow: rgb(0 0 0 / 5%) 0px 1px 5px 0px;
  border: 1px solid rgb(226, 226, 226);
  background-color: rgb(255, 255, 255);
  overflow: hidden;
`;
const Title = styled.h1`
  padding: 1rem;
  border-bottom: 1px solid rgb(226, 226, 226);
  font-size: 1.2rem;
  font-weight: 700;
  text-align: center;
`;
const FlexDiv = styled.div`
  display: flex;
  .size,
  .story {
    display: flex;
    width: -webkit-fill-available;
    .title {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 2rem 0;
      width: 300px;
      text-align: center;
      font-weight: 700;
      background: #fdfdfd;
      border-right: 1px solid rgb(226, 226, 226);
      border-bottom: 1px solid rgb(226, 226, 226);
    }

    .inner {
      width: 100%;
      div {
        padding: 1rem;
        border-bottom: 1px solid rgb(226, 226, 226);
      }
    }
  }
  .size {
    border-right: 1px solid rgb(226, 226, 226);
  }
`;
const RowHead = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 200px;
  padding: 2rem 0;
  text-align: center;
  font-weight: 700;
  background: #fdfdfd;
  border-right: 1px solid rgb(226, 226, 226);
  border-bottom: 1px solid rgb(226, 226, 226);
  &:last-child {
    border-bottom: 0px solid #fff;
  }
`;
const RowContent = styled.div`
  width: 80%;
  padding: 20px;
  border-bottom: 1px solid rgb(226, 226, 226);
`;

const RowWrapper = styled.div`
  display: flex;
  &:last-child {
    ${RowHead}, ${RowContent} {
      border-bottom: none;
    }
  }
`;
export default ManageFormRoomInfo;
