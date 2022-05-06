import React, { useState, useContext, useEffect } from 'react';
import styled from 'styled-components';
import { InfoDispatchContext, InfoContext } from './context';

function ManageFormRoomType() {
  const [selectBuilding, setSelectBuilding] = useState('');
  const infoDispatch = useContext(InfoDispatchContext);
  const Info = useContext(InfoContext);

  const handleSelectRoom = e => {
    infoDispatch({ type: 'UPDATE_CATEGORY', category_id: e.target.value * 1 });
  };
  useEffect(() => {
    setSelectBuilding('다세대주택');
  }, []);

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
                value={1}
                checked={Info.category_id === 1}
                onChange={e => handleSelectRoom(e)}
              />
              <Label htmlFor="원룸">
                <p>원룸</p>
              </Label>
            </li>
            <li>
              <RadioBtn
                id="빌라"
                name="빌라"
                value={2}
                checked={Info.category_id === 2}
                onChange={e => handleSelectRoom(e)}
              />
              <Label htmlFor="빌라">
                <p>빌라</p>
              </Label>
            </li>
            <li>
              <RadioBtn
                id="오피스텔"
                name="오피스텔"
                value={3}
                checked={Info.category_id === 3}
                onChange={e => handleSelectRoom(e)}
              />
              <Label htmlFor="오피스텔">
                <p>오피스텔</p>
              </Label>
            </li>
            <li>
              <RadioBtn
                id="아파트"
                name="아파트"
                value={4}
                checked={Info.category_id === 4}
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
                onChange={e => setSelectBuilding(e.target.value)}
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
                onChange={e => setSelectBuilding(e.target.value)}
              />
              <Label htmlFor="다가구주택">
                <p>다가구주택</p>
              </Label>
            </li>
            <li>
              <RadioBtn
                id="다세대주택"
                name="다세대주택"
                value="다세대주택"
                checked={selectBuilding === '다세대주택'}
                onChange={e => setSelectBuilding(e.target.value)}
              />
              <Label htmlFor="다세대주택">
                <p>다세대주택</p>
              </Label>
            </li>
            <li>
              <RadioBtn
                id="상가주택"
                name="상가주택"
                value="상가주택"
                checked={selectBuilding === '상가주택'}
                onChange={e => setSelectBuilding(e.target.value)}
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

const RowHead = styled.div`
  width: 150px;
  padding: 2rem;
  text-align: center;
  font-weight: 700;
  background: #fdfdfd;
  border-bottom: 1px solid rgb(226, 226, 226);
  border-right: 1px solid rgb(226, 226, 226);
`;

const RowSelectBox = styled.div`
  width: 90%;
  border-bottom: 1px solid rgb(226, 226, 226);
`;

const RowWrapper = styled.div`
  display: flex;
  &:last-child {
    ${RowHead}, ${RowSelectBox} {
      border-bottom: none;
    }
  }
`;

const UlWrapper = styled.ul`
  display: flex;
  width: 100%;
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

const RadioBtn = styled.input.attrs(props => ({
  name: props.name,
  type: 'radio',
}))`
  width: 0px;
  height: 0px;
  opacity: 0;
  top: 0px;
  left: 0px;
  &:checked + ${Label} {
    background: rgb(50, 108, 249);
    border: 1px solid rgb(50, 108, 249);
    color: rgb(255, 255, 255);
  }
`;

export default ManageFormRoomType;
