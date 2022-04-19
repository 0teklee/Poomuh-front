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
        <RowHead>
          <InputTitle>주소</InputTitle>
        </RowHead>
        <AddressInputWrapper>
          <InputInnerWrapper>
            <SearchNotice>
              도로명, 건물명, 지번에 대해 통합검색이 가능합니다.
            </SearchNotice>
            <SearchAddressBox>
              <TextInput
                placeholder="예)번동 10-1, 강북구 번동"
                marginRight="15px"
              />
              <ButtonInput value="주소검색" />
            </SearchAddressBox>
            <BorderBox>
              <div>도로명 : </div>
              <div>지 번 : </div>
            </BorderBox>
            <FlexDiv>
              <TextInput />
              <TextInput />
            </FlexDiv>
          </InputInnerWrapper>

          <MapWrapper>지도가 들어갈 자리</MapWrapper>
        </AddressInputWrapper>
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
  display: flex;
  align-items: center;
  justify-content: center;
  width: 12%;
  text-align: center;
  border-bottom: 1px solid rgb(226, 226, 226);
  border-right: 1px solid rgb(226, 226, 226);
  background: #fdfdfd;
`;

const AddressInputWrapper = styled.div`
  display: flex;
  width: 88%;
  -webkit-box-pack: justify;
  justify-content: space-between;
  padding: 20px;
`;

const FlexDiv = styled.div`
  display: flex;
`;

const InputInnerWrapper = styled.div`
  width: 55%;
`;

const InputTitle = styled.h1`
  font-weight: 700;
`;

const SearchNotice = styled.div`
  display: inline-block;
  color: rgb(136, 136, 136);
  font-size: 14px;
`;

const SearchAddressBox = styled.form`
  display: flex;
  margin: 15px 0px;
`;

const BorderBox = styled.div`
  margin: 15px 0px;
  padding: 20px;
  border: 1px solid rgb(226, 226, 226);
`;

const TextInput = styled.input.attrs(props => ({
  type: 'text',
  name: props.name,
}))`
  display: inline-block;
  margin-right: 15px;
  width: 100%;
  height: 46px;
  padding: 0px 16px;
  color: rgb(76, 76, 76);
  font-size: 14px;
  border: 1px solid rgb(223, 223, 223);
  border-radius: 2px;
`;

const ButtonInput = styled.input.attrs(props => ({
  type: 'button',
  name: props.name,
}))``;

const MapWrapper = styled.div`
  width: 40%;
  border: 1px solid rgb(223, 223, 223);
`;

export default ManageFormAddress;
