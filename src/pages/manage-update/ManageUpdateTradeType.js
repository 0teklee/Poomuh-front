import React, { useState, useRef, useContext, useEffect } from 'react';
import styled from 'styled-components';
import { InfoContext, InfoDispatchContext } from './context';

function Trade({ name, close }) {
  const sample = useRef('');
  const sampleMonthly = useRef('');
  const InfoDispatch = useContext(InfoDispatchContext);
  const Info = useContext(InfoContext);
  const { price_deposit, price_monthly, price_main } = Info;
  const depositRef = useRef('');
  const monthlyRef = useRef('');
  const priceMainRef = useRef('');

  const handlePriceMain = e => {
    InfoDispatch({ type: 'UPDATE_PRICE_MAIN', price_main: e.target.value * 1 });
  };
  const handlePriceDeposit = e => {
    InfoDispatch({
      type: 'UPDATE_PRICE_DEPOSIT',
      price_deposit: e.target.value * 1,
    });
  };
  const handlePriceMonthly = e => {
    InfoDispatch({
      type: 'UPDATE_PRICE_MONTHLY',
      price_monthly: e.target.value * 1,
    });
  };

  const handleDeleteTradeId = e => {
    InfoDispatch({
      type: 'UPDATE_TRADE_ID',
      trade_id: Info.trade_id.filter(id => id !== e.target.id * 1),
    });
  };
  const updateSample = (e, targetRef) => {
    if (e.target.value.length < 5) {
      targetRef.current.innerText = e.target.value + '만원';
    } else {
      targetRef.current.innerText = ` ${Math.floor(e.target.value / 10000)}억${
        Math.floor(e.target.value) -
          Math.floor(e.target.value / 10000) * 10000 ===
        0
          ? ''
          : Math.floor(e.target.value) -
            Math.floor(e.target.value / 10000) * 10000 +
            ' 만원'
      }`;
    }
  };
  useEffect(() => {
    if (
      depositRef.current &&
      monthlyRef.current &&
      priceMainRef.current &&
      price_deposit &&
      price_monthly &&
      price_main
    ) {
      depositRef.current.value = price_deposit;
      monthlyRef.current.value = price_monthly;
      priceMainRef.current.value = price_main;
    }
  }, [Info]);
  return (
    <TradeWrapper>
      <span className="typeName">{name}</span>
      {name === '월세' ? (
        <>
          <input
            type="number"
            onChange={e => {
              handlePriceDeposit(e);
              updateSample(e, sample);
            }}
            placeholder="보증금"
            ref={depositRef}
          />
          <span>/</span>
          <input
            type="number"
            onChange={e => {
              handlePriceMonthly(e);
              if (sample.current.innerText === '(예 월세 1000만원/50만원)') {
                sample.current.innerText = '';
              }
              if (e.target.value.length === 0) {
                sampleMonthly.current.innerText = '';
                return;
              }
              if (e.target.value.length < 5) {
                sampleMonthly.current.innerText = ` /  ${e.target.value} 만원`;
                return;
              } else {
                sampleMonthly.current.innerText = ` ${Math.floor(
                  e.target.value / 10000
                )}억${
                  Math.floor(e.target.value) -
                    Math.floor(e.target.value / 10000) * 10000 ===
                  0
                    ? ''
                    : Math.floor(e.target.value) -
                      Math.floor(e.target.value / 10000) * 10000 +
                      ' 만원'
                }`;
              }
            }}
            placeholder="월세"
            ref={monthlyRef}
          />
          <span className="info" ref={sample}>
            (예 월세 1000만원/50만원)
          </span>
          <span className="info" ref={sampleMonthly} />
        </>
      ) : (
        <>
          <input
            type="number"
            onChange={e => {
              handlePriceMain(e);
              updateSample(e, sample);
            }}
            placeholder="전세"
            ref={priceMainRef}
          />
          <span className="info" ref={sample}>
            (예 전세 2000만원)
          </span>
        </>
      )}

      <button
        className="closeBtn"
        onClick={e => {
          close(e);
          handleDeleteTradeId(e);
        }}
        id={name === '월세' ? 1 : 2}
      >
        X
      </button>
    </TradeWrapper>
  );
}
let tradeKey = 0;

function ManageFormTradeType() {
  const [trade, setTrade] = useState([]);
  const deleteCompo = e => {
    setTrade(trade.filter(el => el.key !== e.key));
  };
  const InfoDispatch = useContext(InfoDispatchContext);
  const Info = useContext(InfoContext);

  const handleTradeType = e => {
    InfoDispatch({
      type: 'UPDATE_TRADE_ID',
      trade_id: [...Info.trade_id, e.target.id * 1],
    });
  };
  useEffect(() => {
    // if() {
    // }
  }, [Info]);
  return (
    <Wrapper>
      <Title>거래 정보</Title>
      <RowWrapper>
        <RowHead>거래 종류</RowHead>
        <RowContent>
          <RowInner>
            {trade.length === 0
              ? null
              : trade.map(el => (
                  <Trade
                    name={el.name}
                    close={() => deleteCompo(el)}
                    key={el.key}
                  />
                ))}
            <div className="selectButton">
              <button
                id={1}
                onClick={e => {
                  handleTradeType(e);
                  setTrade([
                    ...trade,
                    {
                      key: ++tradeKey,
                      name: '월세',
                    },
                  ]);
                }}
                disabled={0 < trade.filter(el => el.name === '월세').length}
              >
                월세
              </button>
              <button
                id={2}
                onClick={e => {
                  handleTradeType(e);
                  setTrade([
                    ...trade,
                    {
                      key: ++tradeKey,
                      name: '전세',
                    },
                  ]);
                }}
                disabled={0 < trade.filter(el => el.name === '전세').length}
              >
                전세
              </button>
            </div>
          </RowInner>
        </RowContent>
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
  width: 200px;
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
  flex: 1;
  width: 80%;
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

const RowInner = styled.div`
  .selectButton {
    display: flex;
    align-items: center;
    width: 100%;
    padding: 20px;
    button {
      all: unset;
      width: 100px;
      height: 40px;
      margin-right: 10px;
      color: rgb(68, 68, 68);
      font-size: 14px;
      border: 1px solid rgb(68, 68, 68);
      border-radius: 3px;
      background-color: rgb(255, 255, 255);
      text-align: center;
      cursor: pointer;
      &:disabled {
        color: #fdfdfd;
        border: 1px solid #fdfdfd;
        background: rgb(226, 226, 226);
      }
    }
  }
`;

const TradeWrapper = styled.div`
  display: flex;
  height: 46px;
  align-items: center;
  padding: 40px;
  border-bottom: 1px solid rgb(226, 226, 226);
  .typeName {
    width: 50px;
    height: 26px;
    margin-right: 10px;
    line-height: 26px;
    color: rgb(255, 255, 255);
    font-size: 13px;
    text-align: center;
    border-radius: 3px;
    background-color: rgb(97, 182, 229);
  }
  input {
    width: 120px;
    height: 46px;
    margin: 0 16px;
    padding: 0px 8px 0px 10px;
    border: 1px solid rgb(226, 226, 226);
    font-size: 16px;
    &:focus {
      outline: none;
      border: 1px solid rgb(50, 108, 249);
    }
    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
    &[type='number'] {
      -moz-appearance: textfield;
    }
  }

  .info {
    margin-left: 10px;
    color: rgb(136, 136, 136);
    font-size: 14px;
  }

  .closeBtn {
    all: unset;
    margin-left: auto;
    width: 22px;
    height: 22px;
    text-align: center;
    color: #fff;
    font-weight: 100;
    font-size: 14px;
    background: rgb(102, 102, 102);
    cursor: pointer;
  }
`;

export default ManageFormTradeType;
