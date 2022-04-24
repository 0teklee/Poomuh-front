import React, { useContext, useMemo, useState, useEffect } from 'react';
import styled from 'styled-components';
import { BsCheck } from 'react-icons/bs';
import { Slider } from 'antd';
import 'antd/dist/antd.css';

function TradeTypeModal() {
  const [check, setCheck] = useState({
    월세: false,
    전세: false,
  });
  const handleCheck = e => {
    const { id } = e.target;
    setCheck({ ...check, [id]: !check[id] });
  };

  const [rangeVal, setRangeVal] = useState({
    deposit: [20, 50],
    monthly: [20, 50],
  });

  const handleDeposit = e => {
    setRangeVal({ ...rangeVal, deposit: e });
  };
  const handleMonthly = e => {
    setRangeVal({ ...rangeVal, monthly: e });
  };

  return (
    <Wrapper>
      <div className="title">
        <h1>거래유형</h1>
        <p>중복선택이 가능합니다.</p>
      </div>
      <Input>
        <div className="inputCheckbox" id="월세" onClick={e => handleCheck(e)}>
          <input id="월세" type="checkbox" checked={check.월세} readOnly />
          <label htmlFor="월세" onClick={e => handleCheck(e)} id="월세">
            <BsCheck size="20px" color="#fff" id="월세" />
          </label>
          <span>월세</span>
        </div>
        <div className="inputCheckbox" id="전세" onClick={e => handleCheck(e)}>
          <input id="전세" type="checkbox" checked={check.전세} readOnly />
          <label htmlFor="전세" onClick={e => handleCheck(e)} id="전세">
            <BsCheck size="20px" color="#fff" id="전세" />
          </label>
          <span>전세</span>
        </div>
      </Input>
      <Input>
        <h1>가격</h1>
        <div className="range">
          <div className="rangeWrapper">
            <div className="priceInfo">
              <p>보증금/전세가</p>
              <span>{`${rangeVal.deposit[0] * 100} 만원 ~ ${
                rangeVal.deposit[1] === 500
                  ? '무제한'
                  : rangeVal.deposit[1] + ' 만원'
              } `}</span>
            </div>
            <Slider
              range
              defaultValue={[20, 50]}
              min={1}
              max={500}
              onChange={handleDeposit}
            />
          </div>
          <div className="rangeWrapper">
            <div className="priceInfo">
              <p>월세</p>
              <span>{`${rangeVal.monthly[0]} 만원 ~ ${
                rangeVal.monthly[1] === 200
                  ? '무제한'
                  : rangeVal.monthly[1] + ' 만원'
              }`}</span>
            </div>
            <Slider
              range
              defaultValue={[20, 50]}
              // tipFormatter={null}
              max={300}
              min={10}
              draggableTrack={false}
              onChange={handleMonthly}
              step={5}
              id="monthly"
            />
          </div>
        </div>
      </Input>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  background: #fff;
  border: 1px solid rgb(226, 226, 226);
  border-radius: 5px;
  .title {
    padding: 1.5rem;
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
  }
`;

const Input = styled.div`
  padding: 1.5rem;
  border-bottom: 1px solid rgb(226, 226, 226);
  h1 {
    color: rgb(34, 34, 34);
    font-size: 18px;
    font-weight: 400;
    line-height: 27px;
    margin-bottom: 1.5rem;
  }

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
  .rangeWrapper {
    &:first-child {
      border-bottom: 1px solid rgb(226, 226, 226);
      margin-bottom: 10px;
    }
    .priceInfo {
      display: flex;
      justify-content: space-between;
      span {
        color: rgb(50, 108, 249);
      }
    }
  }
  .range {
    display: flex;
    flex-direction: column;
    justify-content: center;
    p {
      text-align: center;
    }
    input[type='range'] {
      padding: 20px 0px;
      width: 100%;
    }
  }
`;

export default TradeTypeModal;
