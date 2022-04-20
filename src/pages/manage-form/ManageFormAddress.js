import React, { useState, useContext } from 'react';
import { BsCheck } from 'react-icons/bs';
import styled from 'styled-components';
import Map from './ManageFormMap';
import ManageFormPostCode from './ManageFormPostCode';
import { InfoDispatchContext, InfoContext } from './context';

function ManageFormAddress() {
  const [check, setCheck] = useState(false);
  const [detail, setDetail] = useState({ 동: '', 호: '' });
  const infoDispatch = useContext(InfoDispatchContext);
  const infoContext = useContext(InfoContext);
  const handleCheck = () => {
    setCheck(prev => !prev);
  };
  const handleDongAddress = e => {
    const { value } = e.target;
    infoDispatch({
      type: 'UPDATE_DONG',
      dong: `${value}동`,
    });
  };
  const handleHoAddress = e => {
    const { value } = e.target;
    infoDispatch({
      type: 'UPDATE_HO',
      ho: `${value}호`,
    });
  };

  const [showModal, setShowModal] = useState(false);
  const handleShowModal = () => {
    setShowModal(prev => !prev);
  };

  return (
    <Wrapper>
      {showModal && <ManageFormPostCode handle={handleShowModal} />}
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
              <TextInput placeholder="예)번동 10-1, 강북구 번동" />
              <ButtonInput value="주소검색" onClick={handleShowModal} />
            </SearchAddressBox>
            <BorderBox>
              <div className="addressText">{`도로명 : ${infoContext.address}`}</div>
              <div className="addressText">
                {`지  번 : `}
                {infoContext.jaddress}
              </div>
            </BorderBox>
            <FlexDiv>
              <FlexDiv check={check}>
                <TextInput
                  placeholder="예 ) 101동"
                  check={check}
                  onChange={handleDongAddress}
                />
                <DetailAdressBox marginRight="5px">동</DetailAdressBox>
              </FlexDiv>
              <FlexDiv flexWidth={check}>
                <TextInput
                  placeholder="예 ) 101호"
                  onChange={handleHoAddress}
                />
                <DetailAdressBox>호</DetailAdressBox>
              </FlexDiv>
            </FlexDiv>
            <Input>
              <div className="inputCheckbox" onClick={() => handleCheck()}>
                <input
                  id="inputCheck"
                  type="checkbox"
                  checked={check}
                  readOnly
                />
                <label htmlFor="inputCheck" onClick={() => handleCheck()}>
                  <BsCheck size="20px" color="#fff" />
                </label>
                <p className="notice">
                  등본에 동정보가 없는 경우 클릭해주세요.
                </p>
              </div>
            </Input>
          </InputInnerWrapper>
          <MapWrapper>
            <Map />
          </MapWrapper>
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
  display: ${props => (props.check ? 'none' : 'flex')};
  width: ${props => (props.flexWidth ? '50%' : '100%')};
  align-items: center;
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

const SearchAddressBox = styled.div`
  display: flex;
  margin: 15px 0px;
`;

const BorderBox = styled.div`
  margin: 15px 0px;
  padding: 20px;
  border: 1px solid rgb(226, 226, 226);
  .addressText {
    color: rgb(136, 136, 136);
    font-size: 15px;
    line-height: 22px;
  }
`;

const Input = styled.div`
  .inputCheckbox {
    margin: 15px 0px;
    position: relative;
    cursor: pointer;
    input[type='checkbox'] {
      display: none;
    }
    .notice {
      display: inline-block;
      margin-left: 30px;
    }
    label {
      border: 1px solid rgb(226, 226, 226);
      position: absolute;
      bottom: -5px;
      cursor: pointer;
    }
    input[type='checkbox']:checked + label {
      background: rgb(50, 108, 249);
    }
  }
`;

const TextInput = styled.input.attrs(props => ({
  type: 'text',
  name: props.name,
}))`
  display: inline-block;
  margin-right: ${props => props.marginRight};
  width: 100%;
  height: 46px;
  padding: 0px 16px;
  color: rgb(76, 76, 76);
  font-size: 14px;
  border: 1px solid rgb(223, 223, 223);
  border-radius: 2px;
  &:focus {
    outline: none;
    border: 1px solid rgb(50, 108, 249);
  }
`;

const DetailAdressBox = styled.div`
  display: flex;
  height: 46px;
  margin-right: ${props => props.marginRight};
  padding: 0px 16px;
  border: 1px solid rgb(226, 226, 226);
  align-items: center;
`;

const ButtonInput = styled.input.attrs(props => ({
  type: 'button',
  name: props.name,
}))`
  -webkit-box-flex: 1;
  flex-grow: 1;
  margin-left: 15px;
  height: 46px;
  vertical-align: middle;
  color: rgb(255, 255, 255);
  font-size: 14px;
  font-weight: 500;
  padding: 1rem;
  border: 0px;
  border-radius: 3px;
  background-color: rgb(35, 45, 74);
  cursor: pointer;
`;

const MapWrapper = styled.div`
  width: 40%;
  border: 1px solid rgb(223, 223, 223);
`;

export default ManageFormAddress;
