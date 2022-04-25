import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { IoIosSearch, IoMdRefresh } from 'react-icons/io';
import { BsChevronDown, BsChevronUp } from 'react-icons/bs';
import { RealEstateContext, RealEstateContextDispatch } from './context';
import RoomTypeModal from './RoomTypeModal';
import TradeTypeModal from './TradeTypeModal';

function SearchBar() {
  const RealEstate = useContext(RealEstateContext);
  const RealEstateDispatch = useContext(RealEstateContextDispatch);
  const [roomTypeModal, setRoomTypeModal] = useState(false);
  const [tradeTypeModal, setTradeTypeModal] = useState(false);

  const tradeModalHandler = e => {
    if (e.target !== e.currentTarget) {
      return;
    }
    setTradeTypeModal(prev => !prev);
    setRoomTypeModal(false);
  };

  const roomModalHandler = e => {
    if (e.target !== e.currentTarget) {
      return;
    }
    setRoomTypeModal(prev => !prev);
    setTradeTypeModal(false);
  };

  return (
    <Wrapper>
      <SearchSection>
        <IoIosSearch size="20px" className="icon" />
        <input type="text" />
      </SearchSection>
      <FilterSection>
        <DropDown onClick={roomModalHandler}>
          <span onClick={roomModalHandler}>
            원룸, 투·쓰리룸, 오피스텔·도시형
          </span>
          {roomTypeModal ? (
            <BsChevronUp size="16px" />
          ) : (
            <BsChevronDown size="16px" />
          )}
          {roomTypeModal && (
            <ModalPosition>
              <RoomTypeModal />
            </ModalPosition>
          )}
        </DropDown>
        <DropDown onClick={tradeModalHandler}>
          <span onClick={tradeModalHandler}> 월세, 전세</span>
          {tradeTypeModal ? (
            <BsChevronUp size="16px" />
          ) : (
            <BsChevronDown size="16px" />
          )}
          {tradeTypeModal && (
            <ModalPosition>
              <TradeTypeModal />
            </ModalPosition>
          )}
        </DropDown>
        <Refresh>
          <IoMdRefresh />
        </Refresh>
      </FilterSection>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  flex: 0 0 auto;
  display: flex;
  width: 100%;
  height: 64px;
  border-bottom: 1px solid rgb(205, 205, 205);
  background-color: rgb(255, 255, 255);
  position: absolute;
  top: 10;
  left: 0;
  right: 0;
  z-index: 999;
`;
const SearchSection = styled.div`
  display: flex;
  align-items: center;
  width: 25rem;
  border-right: 1px solid rgb(205, 205, 205);
  .icon {
    flex: 1;
    padding-left: 10px;
  }
  input {
    flex: 4;
    height: 36px;
    border: none;
    font-size: 1rem;
    padding-left: 10px;
    padding-right: 20px;
    &:focus {
      outline: none;
    }
  }
`;
const FilterSection = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  padding: 0.5rem;
  position: relative;
`;

const DropDown = styled.button`
  flex: 0;
  all: unset;
  display: flex;
  align-items: center;
  width: 20%;
  max-width: fit-content;
  padding: 0.5rem;
  margin-right: 8px;
  border: 1px solid rgb(205, 205, 205);
  border-radius: 2px;
  color: rgb(34, 34, 34);
  font-size: 13px;
  font-weight: 700;
  position: relative;
  cursor: pointer;

  &:hover {
    background: rgb(205, 205, 205);
  }

  span {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    margin-right: 5px;
  }
`;
const Refresh = styled.div`
  flex: 1;
  width: 80%;
  text-align: end;
`;
const ModalPosition = styled.div`
  width: 400px;
  position: absolute;
  top: 50px;
  left: 0;
  pointer-events: painted;
`;

export default SearchBar;
