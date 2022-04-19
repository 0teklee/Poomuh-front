import React from 'react';
import styled from 'styled-components';
import DaumPostcode from 'react-daum-postcode';

function ManageFormAddress() {
  return (
    <Wrapper>
      <Title>
        위치 정보
        <TitleNotice>*등기부등본 상의 주소를 입력해 주세요.</TitleNotice>
      </Title>
      <RowWrapper>
        <RowHead>주소</RowHead>
        <button onClick={() => <DaumPostcode />}>주소 찾기</button>
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
  position: relative;
`;

const TitleNotice = styled.span`
  color: rgb(136, 136, 136);
  font-size: 14px;
  font-weight: 400;
  position: absolute;
  top: 50%;
  right: 18px;
  transform: translateY(-50%);
`;

const RowWrapper = styled.div`
  display: flex;
`;
const RowHead = styled.div`
  width: 12%;
  padding: 2rem;
  text-align: center;
  font-weight: 700;
  background: #fdfdfd;
  border-bottom: 1px solid rgb(226, 226, 226);
  border-right: 1px solid rgb(226, 226, 226);
`;

export default ManageFormAddress;
