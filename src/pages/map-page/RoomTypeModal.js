import React, { useContext, useState, useEffect, useMemo, useRef } from 'react';
import styled from 'styled-components';
import { BsCheck } from 'react-icons/bs';
import { RealEstateContext, RealEstateContextDispatch } from './context';

function RoomTypeModal() {
  const RealEstate = useContext(RealEstateContext);
  const RealEstateDispatch = useContext(RealEstateContextDispatch);
  const kakaoClusterer = RealEstate.clusterer;
  const kakaoMap = RealEstate.map;
  const [check, setCheck] = useState({
    원룸: { isOn: true, roomType: '원룸' },
    빌라: { isOn: true, roomType: '빌라' },
    오피스텔: { isOn: true, roomType: '오피스텔' },
    아파트: { isOn: true, roomType: '아파트' },
  });

  useEffect(() => {
    setCheck(RealEstate.roomTypeFilter);
  }, []);

  useEffect(() => {
    RealEstateDispatch({
      type: 'UPDATE_ROOM_TYPE_FILTER',
      roomTypeFilter: check,
    });
  }, [check]);

  const handleCheck = e => {
    const { id } = e.target;
    Object.values(check).filter(check => check.isOn === true).length === 1
      ? setCheck({ ...check, [id]: { ...check[id], isOn: true } })
      : setCheck({ ...check, [id]: { ...check[id], isOn: !check[id].isOn } });
  };

  return (
    <Wrapper>
      <div className="title">
        <h1>방종류</h1>
        <p>중복선택이 가능합니다.</p>
      </div>
      <Input>
        <div className="inputCheckbox" id="원룸" onClick={handleCheck}>
          <input
            id="원룸"
            type="checkbox"
            checked={check.원룸.isOn}
            value={1}
            readOnly
          />
          <label htmlFor="원룸" id="원룸">
            <BsCheck size="20px" color="#fff" id="원룸" />
          </label>
          <span id="원룸">원룸</span>
        </div>
        <div className="inputCheckbox" id="빌라" onClick={handleCheck}>
          <input
            id="빌라"
            type="checkbox"
            checked={check.빌라.isOn}
            value={2}
            readOnly
          />
          <label htmlFor="빌라" id="빌라">
            <BsCheck size="20px" color="#fff" id="빌라" />
          </label>
          <span id="빌라">빌라</span>
        </div>
        <div className="inputCheckbox" id="오피스텔" onClick={handleCheck}>
          <input
            id="오피스텔"
            type="checkbox"
            checked={check.오피스텔.isOn}
            value={3}
            readOnly
          />
          <label htmlFor="오피스텔" id="오피스텔">
            <BsCheck size="20px" color="#fff" id="오피스텔" />
          </label>
          <span id="오피스텔">오피스텔</span>
        </div>
        <div className="inputCheckbox" id="아파트" onClick={handleCheck}>
          <input
            id="아파트"
            type="checkbox"
            checked={check.아파트.isOn}
            value={4}
            readOnly
          />
          <label htmlFor="아파트" id="아파트">
            <BsCheck size="20px" color="#fff" id="아파트" />
          </label>
          <span id="아파트">아파트</span>
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
