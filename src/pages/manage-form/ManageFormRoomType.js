import React from 'react';
import styled from 'styled-components';

function ManageFormRoomType() {
  return (
    <Wrapper>
      <Title>매물 종류</Title>
      <RowWrapper>
        <RowHead>종류 선택</RowHead>
        <RowSelectBox>
          <UlWrapper>
            <li />
            <li />
            <li />
            <li />
          </UlWrapper>
        </RowSelectBox>
      </RowWrapper>
      <RowWrapper>
        <RowHead>건물 유형</RowHead>
        <RowSelectBox>
          <UlWrapper>
            <li />
            <li />
            <li />
            <li />
          </UlWrapper>
        </RowSelectBox>
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
const RowWrapper = styled.div`
  display: flex;
`;
const RowHead = styled.div`
  width: 10%;
  padding: 2rem;
  text-align: center;
  font-weight: 700;
  background: #fdfdfd;
  border-bottom: 1px solid rgb(226, 226, 226);
  border-right: 1px solid rgb(226, 226, 226);
`;
const RowSelectBox = styled.div`
  width: 90%;
`;
const UlWrapper = styled.ul`
  display: flex;
  /* border-bottom: 1px solid rgb(226, 226, 226); */
`;
export default ManageFormRoomType;
