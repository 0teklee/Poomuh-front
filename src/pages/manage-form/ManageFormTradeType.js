import React from 'react';
import styled from 'styled-components';

function ManageFormTradeType() {
  return (
    <Wrapper>
      <Title>거래 정보</Title>
      <RowWrapper>
        <RowHead>거래 종류</RowHead>
        <RowContent>123</RowContent>
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

const RowHead = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 11%;
  padding: 2rem;
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

export default ManageFormTradeType;
