import React, { useContext, useMemo, useRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import { BsCheck } from 'react-icons/bs';
import { Slider } from 'antd';
import 'antd/dist/antd.css';
import { RealEstateContextDispatch, RealEstateContext } from './context';

function TradeTypeModal() {
  const RealEstateDispatch = useContext(RealEstateContextDispatch);
  const RealEstate = useContext(RealEstateContext);
  const [check, setCheck] = useState({
    월세: false,
    전세: false,
    depositStep: 1,
    deposit: [20, 50],
    monthly: [20, 50],
    monthlyStep: 1,
  });

  // 필터의 state가 업데이트 될 때마다 Context의 지도 범위 내 매물 저장소 업데이트
  const sendFilter = () => {
    const filter = new URLSearchParams(RealEstate.tradeTypeFilter).toString();
    const mapRange = new URLSearchParams(RealEstate.mapBounds).toString();
    fetch(
      // `/검색필터URI/endpoint?${filter}&`${mapRange}`
      `/검색필터URI/endpoint`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
      .then(res => res.json())
      .then(data => {
        RealEstateDispatch({
          type: 'GET_REAL_ESTATE',
          realEstate: data,
        });
      })
      .catch(err => console.log(err));
  };

  const handleCheck = e => {
    const { id } = e.target;
    setCheck({ ...check, [id]: !check[id] });
    sendFilter();
  };

  const handleDeposit = e => {
    setCheck({ ...check, deposit: e });
  };
  const handleMonthly = e => {
    setCheck({ ...check, monthly: e });
  };

  const handelDepositStep = () => {
    const cur = check.deposit[1];
    if (cur < 50) {
      setCheck({ ...check, depositStep: 1 });
    } else if (50 <= cur && cur <= 100) {
      setCheck({ ...check, depositStep: 5 });
      setCheck({ ...check, depositStep: 10 });
    }
  };

  const handelMonthlyStep = () => {
    const cur = check.monthly[1];
    if (cur < 70) {
      setCheck({ ...check, monthlyStep: 1 });
    } else if (70 < cur && cur < 100) {
      setCheck({ ...check, monthlyStep: 5 });
    } else if (100 <= cur) {
      setCheck({ ...check, monthlyStep: 10 });
    }
  };

  const trackStyle = {
    background: 'rgb(50, 108, 249)',
    border: '2px solid rgb(50, 108, 249)',
    top: '5px',
  };
  const handleStyle = {
    border: '1px solid rgb(226, 226, 226)',
    width: '20px',
    height: '20px',
    top: '0',
  };

  const depositMark = {
    0: '0',
    150: '1억 5천만원',
    300: '무제한',
  };
  const monthlyMark = { 0: '0', 100: '100만원', 200: '무제한' };

  useEffect(() => {
    handelMonthlyStep();
  }, [check.monthly]);

  useEffect(() => {
    handelDepositStep();
  }, [check.deposit]);

  useEffect(() => {
    setCheck(RealEstate.tradeTypeFilter);
  }, []);

  useEffect(() => {
    RealEstateDispatch({
      type: 'UPDATE_TRADE_TYPE_FILTER',
      tradeTypeFilter: check,
    });
  }, [check]);

  // filtered data get fetch 함수를 check 필터와 지도를 이동시켜
  // RealEstate를 업데이트될 때마다 요청한다.

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
              <span>{`${
                check.deposit[0] === 300
                  ? '무제한'
                  : check.deposit[0] === 0
                  ? ''
                  : check.deposit[0] < 100
                  ? check.deposit[0] * 100 + ' 만원 ~ '
                  : check.deposit[0] -
                      Math.floor(check.deposit[0] / 100) * 100 !==
                    0
                  ? Math.floor(check.deposit[0] / 100) +
                    '억' +
                    (check.deposit[0] -
                      Math.floor(check.deposit[0] / 100) * 100) *
                      100 +
                    ' 만원  ~ '
                  : Math.floor(check.deposit[0] / 100) + '억 ~ '
              }${
                check.deposit[1] === 300
                  ? '무제한'
                  : check.deposit[1] < 100
                  ? check.deposit[1] * 100 + '만원'
                  : check.deposit[1] -
                      Math.floor(check.deposit[1] / 100) * 100 !==
                    0
                  ? Math.floor(check.deposit[1] / 100) +
                    ' 억 ' +
                    (check.deposit[1] -
                      Math.floor(check.deposit[1] / 100) * 100) *
                      100 +
                    ' 만원'
                  : Math.floor(check.deposit[1] / 100) + '억'
              }`}</span>
            </div>
            <Slider
              range
              tipFormatter={null}
              defaultValue={RealEstate.tradeTypeFilter.deposit}
              min={0}
              max={300}
              step={check.depositStep}
              onChange={handleDeposit}
              onAfterChange={sendFilter}
              trackStyle={trackStyle}
              handleStyle={handleStyle}
              marks={depositMark}
            />
          </div>
          <div className="rangeWrapper">
            <div className="priceInfo">
              <p>월세</p>
              <span>{`${
                check.monthly[0] === 200
                  ? '무제한'
                  : check.monthly[0] === 0
                  ? ''
                  : check.monthly[0] + ' 만원  ~ '
              }${
                check.monthly[1] === 200
                  ? '무제한'
                  : check.monthly[1] === 0
                  ? ''
                  : check.monthly[1] + ' 만원'
              }`}</span>
            </div>
            <Slider
              range
              defaultValue={RealEstate.tradeTypeFilter.monthly}
              tipFormatter={null}
              max={200}
              min={0}
              draggableTrack={false}
              onChange={handleMonthly}
              onAfterChange={sendFilter}
              step={check.monthlyStep}
              trackStyle={trackStyle}
              handleStyle={handleStyle}
              marks={monthlyMark}
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
  width: 400px;
  border: 1px solid rgb(226, 226, 226);
  border-radius: 5px;
  background: #fff;
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
      padding-bottom: 15px;
      margin-bottom: 10px;
      border-bottom: 1px solid rgb(226, 226, 226);
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
