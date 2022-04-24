import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { BsCheck } from 'react-icons/bs';
import { RealEstateContext, RealEstateContextDispatch } from './context';

function RoomTypeModal() {
  const RealEstate = useContext(RealEstateContext);
  const RealEstateDispatch = useContext(RealEstateContextDispatch);
  const [check, setCheck] = useState({
    원룸: false,
    빌라: false,
    오피스털: false,
    아파트: false,
  });
  const handleCheck = e => {
    const { id } = e.target;
    setCheck({ ...check, [id]: !check[id] });
  };

  return (
    <Wrapper>
      <div className="title">
        <h1>방종류</h1>
        <p>중복선택이 가능합니다.</p>
      </div>
      <Input>
        <div className="inputCheckbox" id="원룸" onClick={e => handleCheck(e)}>
          <input id="원룸" type="checkbox" checked={check.원룸} readOnly />
          <label htmlFor="원룸" onClick={e => handleCheck(e)} id="원룸">
            <BsCheck size="20px" color="#fff" id="원룸" />
          </label>
          <span>원룸</span>
        </div>
        <div className="inputCheckbox" id="빌라" onClick={e => handleCheck(e)}>
          <input id="빌라" type="checkbox" checked={check.빌라} readOnly />
          <label htmlFor="빌라" onClick={e => handleCheck(e)} id="빌라">
            <BsCheck size="20px" color="#fff" id="빌라" />
          </label>
          <span>빌라</span>
        </div>
        <div
          className="inputCheckbox"
          id="오피스텔"
          onClick={e => handleCheck(e)}
        >
          <input
            id="오피스텔"
            type="checkbox"
            checked={check.오피스텔}
            readOnly
          />
          <label htmlFor="오피스텔" onClick={e => handleCheck(e)} id="오피스텔">
            <BsCheck size="20px" color="#fff" id="오피스텔" />
          </label>
          <span>오피스텔</span>
        </div>
        <div
          className="inputCheckbox"
          id="아파트"
          onClick={e => handleCheck(e)}
        >
          <input id="아파트" type="checkbox" checked={check.아파트} readOnly />
          <label htmlFor="아파트" onClick={e => handleCheck(e)} id="아파트">
            <BsCheck size="20px" color="#fff" id="아파트" />
          </label>
          <span>아파트</span>
        </div>
      </Input>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1.5rem;
  background: #fff;
  border: 1px solid rgb(226, 226, 226);
  border-radius: 5px;

  h1 {
    color: rgb(34, 34, 34);
    font-size: 18px;
    font-weight: 400;
    line-height: 27px;
  }
  p {
    color: rgb(134, 134, 134);
    font-size: 13px;
    font-weight: 400;
    margin: 4px 0px;
    line-height: 20px;
  }
`;

const Input = styled.div`
  padding: 16px 0px;
  .inputCheckbox {
    display: flex;
    align-items: center;
    margin: 15px 0px;
    cursor: pointer;
    color: rgb(134, 134, 134);
    font-size: 14px;
    input[type='checkbox'] {
      display: none;
    }
  }
  label {
    border: 1px solid rgb(226, 226, 226);
    cursor: pointer;
    margin-right: 10px;
  }
  input[type='checkbox']:checked + label {
    background: rgb(50, 108, 249);
  }
  span {
    font-weight: 300;
  }
`;

export default RoomTypeModal;
