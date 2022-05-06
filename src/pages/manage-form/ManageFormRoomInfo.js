import React, { useRef, useContext, useEffect } from 'react';
import styled from 'styled-components';
import { InfoContext, InfoDispatchContext } from './context';

function ManageFormRoomInfo() {
  // 258번째줄 REFACTOR
  const Info = useContext(InfoContext);
  const InfoDispatch = useContext(InfoDispatchContext);
  const {
    exclusive_size,
    supply_size,
    current_floor,
    building_floor,
    heat_id,
  } = Info;

  const SelectOption = num => {
    let result = [];
    for (let i = 1; i <= num; i++) {
      result.push(i);
    }
    return result;
  };
  const totalFloor = SelectOption(50);
  const supplySizePRef = useRef('');
  const supplySizeMRef = useRef('');
  const exclusiveSizePRef = useRef('');
  const exclusiveSizeMRef = useRef('');
  const PtoM = (e, M) => {
    if (!e.target.value) {
      M.current.value = '';
    } else {
      M.current.value = (e.target.value * 3.3).toFixed(2);
    }
  };
  const MtoP = (e, P) => {
    if (!e.target.value) {
      P.current.value = '';
    } else {
      P.current.value = (e.target.value / 3.3).toFixed(2);
    }
  };

  const handleSupply = e => {
    InfoDispatch({
      type: 'UPDATE_SUPPLY_SIZE',
      supply_size: e * 1,
    });
  };
  const handleExclusive = e => {
    if (supply_size < e) {
      exclusiveSizeMRef.current.value = '';
      alert('전용 면적은 공급 면적보다 클 수 없습니다.');
      return;
    }
    InfoDispatch({
      type: 'UPDATE_EXCLUSIVE_SIZE',
      exclusive_size: e * 1,
    });
  };
  const handleAvailableDate = e => {
    InfoDispatch({
      type: 'UPDATE_AVAILABLE_DATE',
      available_date: e.target.value,
    });
  };

  return (
    <Wrapper>
      <Title>기본 정보</Title>
      <FlexDiv>
        <div className="size">
          <div className="title">
            <div>
              건물 크기
              <p>(1P = 3.3058㎡)</p>
            </div>
          </div>
          <div className="inner">
            <div className="inner-inner">
              <span>공급 면적</span>
              <input
                ref={supplySizePRef}
                name="supplySizeP"
                type="number"
                onChange={e => {
                  PtoM(e, supplySizeMRef);
                  handleSupply(supplySizeMRef.current.value);
                }}
              />
              <span>평</span>
              <input
                ref={supplySizeMRef}
                name="supplySize"
                type="number"
                onChange={e => {
                  handleSupply(e.target.value);
                  MtoP(e, supplySizePRef);
                }}
              />
              <span>㎡</span>
            </div>
            <div className="inner-inner">
              <span>전용 면적</span>
              <input
                ref={exclusiveSizePRef}
                name="exclusiveSizeP"
                type="number"
                onChange={e => {
                  PtoM(e, exclusiveSizeMRef);
                  handleExclusive(exclusiveSizeMRef.current.value);
                }}
              />
              <span>평</span>
              <input
                ref={exclusiveSizeMRef}
                name="exclusiveSizeM"
                type="number"
                onChange={e => {
                  handleExclusive(e.target.value);
                  MtoP(e, exclusiveSizePRef);
                }}
              />
              <span>㎡</span>
            </div>
          </div>
        </div>
        <div className="story">
          <div className="title">건물 층수</div>
          <div className="inner">
            <div>
              <span>건물 층수</span>
              <Select
                name="buildingFloor"
                required
                onChange={e => {
                  InfoDispatch({
                    type: 'UPDATE_BUILDING_FLOOR',
                    building_floor: e.target.value,
                  });
                }}
              >
                <option defaultValue style={{ display: 'none' }}>
                  건물 층수 선택
                </option>
                {totalFloor.map(el => {
                  return <option key={el}>{el}층</option>;
                })}
              </Select>
            </div>
            <div>
              <span>해당 층수</span>
              <Select
                name="currentFloor"
                required
                onChange={e => {
                  if (
                    building_floor.slice(0, -1) * 1 <
                    e.target.value.slice(0, -1) * 1
                  ) {
                    e.target.value = '';
                    alert('건물 층수보다 높을 수 없습니다.');
                    return;
                  }
                  InfoDispatch({
                    type: 'UPDATE_CURRENT_FLOOR',
                    current_floor: e.target.value,
                  });
                }}
              >
                <option defaultValue style={{ display: 'none' }}>
                  해당 층수 선택
                </option>
                {totalFloor.map(el => {
                  return <option key={el}>{el}층</option>;
                })}
              </Select>
            </div>
          </div>
        </div>
      </FlexDiv>
      <RowWrapper>
        <RowHead>난방 종류</RowHead>
        <RowContent>
          <Select
            onChange={e => {
              InfoDispatch({
                type: 'UPDATE_HEAT',
                heat_id: e.target.value * 1,
              });
            }}
          >
            <option defaultValue style={{ display: 'none' }}>
              난방 종류 선택
            </option>
            <option value={1}>중앙 난방</option>
            <option value={2}>지역 난방</option>
            <option value={3}>개별 난방</option>
          </Select>
        </RowContent>
      </RowWrapper>
      <RowWrapper>
        <RowHead>입주 가능일</RowHead>
        <RowContent>
          <FlexDiv>
            <ul className="radioWrapper">
              <li>
                <RadioBtn
                  type="radio"
                  id="즉시입주"
                  value="즉시입주"
                  onChange={e => handleAvailableDate(e)}
                  checked={Info.available_date === '즉시입주'}
                  readOnly
                />
                <Label htmlFor="즉시입주">즉시 입주</Label>
              </li>
              <li>
                <RadioBtn
                  type="radio"
                  id="날짜 협의"
                  value="날짜 협의"
                  checked={Info.available_date === '날짜 협의'}
                  onChange={e => handleAvailableDate(e)}
                  readOnly
                />
                <Label
                  htmlFor="날짜 협의"
                  checked={Info.available_date === '날짜 협의'}
                >
                  날짜 협의
                </Label>
              </li>
              <li>
                <RadioBtn
                  type="radio"
                  id="날짜 선택"
                  value="날짜 선택"
                  checked={Info.available_date === '날짜 선택'}
                  onChange={e => handleAvailableDate(e)}
                  readOnly
                />
                <Label htmlFor="날짜 선택">날짜 선택</Label>
              </li>
            </ul>
          </FlexDiv>
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
const FlexDiv = styled.div`
  display: flex;
  .size,
  .story {
    display: flex;
    .title {
      display: flex;
      justify-content: center;
      width: 200px;
      align-items: center;
      padding: 2rem 0;
      text-align: center;
      font-weight: 700;
      background: #fdfdfd;
      border-right: 1px solid rgb(226, 226, 226);
      border-bottom: 1px solid rgb(226, 226, 226);
      div {
        width: 200px;
        line-height: 1.2;
        p {
          color: #888888;
          font-weight: 300;
        }
      }
    }

    .inner {
      /* flex: 0; */
      width: 100%;
      display: flex;
      flex-direction: column;
      div {
        padding: 1rem;
        border-bottom: 1px solid rgb(226, 226, 226);
      }
      .inner-inner {
        display: flex;
        align-items: center;
        input {
          width: 100px;
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
      }
    }
  }
  .size {
    flex: 1;
    border-right: 1px solid rgb(226, 226, 226);
  }
  .radioWrapper {
    display: flex;
    align-items: center;
  }
`;
const RowHead = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 200px;
  padding: 2rem 0;
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
  padding: 20px;
  border-bottom: 1px solid rgb(226, 226, 226);
`;

const Select = styled.select`
  width: 170px;
  height: 46px;
  margin: 0 16px;
  padding: 0px 8px 0px 10px;
  border: 1px solid rgb(226, 226, 226);
  font-size: 16px;
  align-self: left;
  color: #888888;
  &:focus {
    outline: none;
    border: 1px solid rgb(50, 108, 249);
  }
`;
const RowWrapper = styled.div`
  display: flex;
  &:last-child {
    ${RowHead}, ${RowContent} {
      border-bottom: none;
    }
  }
`;
const RadioBtn = styled.input`
  display: none;
  &:checked + label {
    background: rgb(50, 108, 249);
    border: 1px solid rgb(50, 108, 249);
    color: rgb(255, 255, 255);
  }
`;

const Label = styled.label`
  display: block;
  padding: 1rem;
  margin: 0 1rem;
  border: 1px solid rgb(226, 226, 226);
  border-radius: 3px;
  cursor: pointer;
  &:hover {
    background: rgb(226, 226, 226);
  }
`;

export default ManageFormRoomInfo;
