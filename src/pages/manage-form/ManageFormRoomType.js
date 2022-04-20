import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { InfoDispatchContext } from './context';

function ManageFormRoomType() {
  const [selectRoom, setSelectRoom] = useState('원룸');
  const [selectBuilding, setSelectBuilding] = useState('');
  const infoDispatch = useContext(InfoDispatchContext);

  const handleSelectRoom = e => {
    setSelectRoom(e.target.value);
    infoDispatch({ type: 'UPDATE_ROOM_TYPE', roomType: e.target.value });
  };
  const handleSelectBuilding = e => {
    setSelectBuilding(e.target.value);
    infoDispatch({
      type: 'UPDATE_BUILDING_TYPE',
      buildingType: e.target.value,
    });
  };

  return (
    <Wrapper>
      <Title>매물 종류</Title>
      <RowWrapper>
        <RowHead>종류 선택</RowHead>
        <RowSelectBox>
          <UlWrapper>
            <li>
              <RadioBtn
                id="원룸"
                name="원룸"
                value="원룸"
                checked={selectRoom === '원룸'}
                onChange={e => handleSelectRoom(e)}
              />
              <Label htmlFor="원룸">
                <p>원룸</p>
              </Label>
            </li>
            <li>
              <RadioBtn
                id="투룸/쓰리룸"
                name="투룸/쓰리룸"
                value="투룸/쓰리룸"
                checked={selectRoom === '투룸/쓰리룸'}
                onChange={e => handleSelectRoom(e)}
              />
              <Label htmlFor="투룸/쓰리룸">
                <p>투룸/쓰리룸</p>
              </Label>
            </li>
            <li>
              <RadioBtn
                id="빌라"
                name="빌라"
                value="빌라"
                checked={selectRoom === '빌라'}
                onChange={e => handleSelectRoom(e)}
              />
              <Label htmlFor="빌라">
                <p>빌라</p>
              </Label>
            </li>
            <li>
              <RadioBtn
                id="아파트"
                name="아파트"
                value="아파트"
                checked={selectRoom === '아파트'}
                onChange={e => handleSelectRoom(e)}
              />
              <Label htmlFor="아파트">
                <p>아파트</p>
              </Label>
            </li>
          </UlWrapper>
        </RowSelectBox>
      </RowWrapper>
      <RowWrapper>
        <RowHead>건물 유형</RowHead>
        <RowSelectBox>
          <UlWrapper>
            <li>
              <RadioBtn
                id="단독주택"
                name="단독주택"
                value="단독주택"
                checked={selectBuilding === '단독주택'}
                onChange={e => handleSelectBuilding(e)}
              />
              <Label htmlFor="단독주택">
                <p>단독주택</p>
              </Label>
            </li>
            <li>
              <RadioBtn
                id="다가구주택"
                name="다가구주택"
                value="다가구주택"
                checked={selectBuilding === '다가구주택'}
                onChange={e => handleSelectBuilding(e)}
              />
              <Label htmlFor="다가구주택">
                <p>다가구주택</p>
              </Label>
            </li>
            <li>
              <RadioBtn
                id="빌라/연립/다세대"
                name="빌라/연립/다세대"
                value="빌라/연립/다세대"
                checked={selectBuilding === '빌라/연립/다세대'}
                onChange={e => handleSelectBuilding(e)}
              />
              <Label htmlFor="빌라/연립/다세대">
                <p>빌라</p>
              </Label>
            </li>
            <li>
              <RadioBtn
                id="상가주택"
                name="상가주택"
                value="상가주택"
                checked={selectBuilding === '상가주택'}
                onChange={e => handleSelectBuilding(e)}
              />
              <Label htmlFor="상가주택">
                <p>상가주택</p>
              </Label>
            </li>
          </UlWrapper>
        </RowSelectBox>
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
const RowSelectBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 90%;
  border-bottom: 1px solid rgb(226, 226, 226);
`;
const UlWrapper = styled.ul`
  display: flex;
  width: 100%;
`;

const Label = styled.label`
  display: block;
  position: absolute;
  padding: 1rem;
  margin: 0 1rem;
  border: 1px solid rgb(226, 226, 226);
  border-radius: 3px;
  cursor: pointer;
  &:hover {
    background: rgb(226, 226, 226);
  }
`;

const RadioBtn = styled.input.attrs(props => ({
  name: props.name,
  type: 'radio',
}))`
  width: 0px;
  height: 0px;
  opacity: 0;
  position: absolute;
  top: 0px;
  left: 0px;
  &:checked + ${Label} {
    background: rgb(50, 108, 249);
    border: 1px solid rgb(50, 108, 249);
    color: rgb(255, 255, 255);
  }
`;

export default ManageFormRoomType;
