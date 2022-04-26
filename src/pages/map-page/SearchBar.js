import React, { useContext, useEffect, useState, useRef, useMemo } from 'react';
import styled from 'styled-components';
import { IoIosSearch, IoMdRefresh } from 'react-icons/io';
import { BsChevronDown, BsChevronUp } from 'react-icons/bs';
import { RealEstateContext, RealEstateContextDispatch } from './context';
import RoomTypeModal from './RoomTypeModal';
import TradeTypeModal from './TradeTypeModal';
import SearchModal from './SearchModal';

function SearchBar() {
  const RealEstate = useContext(RealEstateContext);
  const RealEstateDispatch = useContext(RealEstateContextDispatch);
  const [roomTypeModal, setRoomTypeModal] = useState(false);
  const [tradeTypeModal, setTradeTypeModal] = useState(false);
  const [searchModal, setSearchModal] = useState({
    searchText: '',
    isOn: false,
    addressModalOn: false,
    estateModalOn: false,
    searchResult: '',
    addressResult: [],
  });

  const { kakao } = window;
  const geocoder = new kakao.maps.services.Geocoder();
  // 주소 검색 콜백 함수
  const geoSearch = (result, status) => {
    if (status === kakao.maps.services.Status.OK) {
      setSearchModal({ ...searchModal, addressResult: result });
      return;
    }
  };
  const tradeModalHandler = e => {
    if (e.target !== e.currentTarget) {
      return;
    }
    setTradeTypeModal(prev => !prev);
    setRoomTypeModal(false);
    setSearchModal({ ...searchModal, isOn: false });
  };

  const roomModalHandler = e => {
    if (e.target !== e.currentTarget) {
      return;
    }
    setRoomTypeModal(prev => !prev);
    setTradeTypeModal(false);
    setSearchModal({ ...searchModal, isOn: false });
  };

  const CloseHandler = () => {
    setRoomTypeModal(false);
    setTradeTypeModal(false);
    setSearchModal({ ...searchModal, isOn: false });
  };

  const useOutSideRef = () => {
    const ref = useRef('');
    useEffect(() => {
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          CloseHandler();
        }
      }
      document.addEventListener('click', handleClickOutside);
      return () => {
        document.removeEventListener('click', handleClickOutside);
      };
    });
    return ref;
  };
  const outerRef = useOutSideRef('');

  const searchTextHandler = ({ target }) => {
    if (2 <= target.value.length) {
      setSearchModal({ ...searchModal, isOn: true, searchText: target.value });
      setTradeTypeModal(false);
      setRoomTypeModal(false);
      // 검색 시 주소 검색 결과 배열 state 추가
      geocoder.addressSearch(target.value, geoSearch);
    } else {
      setSearchModal({
        ...searchModal,
        isOn: false,
        searchText: null,
        addressResult: [],
      });
    }
  };

  // 매물 검색 fetch
  const getSearchResult = () => {
    // fetch('검색 URI/endpoint/search=`${searchModal.searchText}', {
    fetch('data/searchResult.json', {
      method: 'GET',
      headers: new Headers({
        'Content-type': 'application/json',
        // 한국어 검색어를 헤더에 넣어서 non ISO-8859-1 code point 에러 발생.
        // 쿼리 스트링으로 대체
        // search: `${searchModal.searchText}`,
      }),
    })
      .then(res => res.json())
      .then(data => setSearchModal({ ...searchModal, searchResult: data }))
      .catch(err => {
        setSearchModal({ ...searchModal, searchResult: false });
      });
  };

  // 매물 검색 업데이트 useEffect
  useEffect(() => {
    if (!searchModal.searchText || searchModal.searchText.length < 2) {
      return;
    }
    getSearchResult();
  }, [searchModal.searchText]);

  useEffect(() => {}, []);

  return (
    <div ref={outerRef}>
      <Wrapper>
        <SearchSection>
          <IoIosSearch size="20px" className="icon" />
          <input type="text" onChange={searchTextHandler} />
          {searchModal.isOn ? (
            <ModalPosition>
              <SearchModal
                result={searchModal.searchResult}
                addressResult={searchModal.addressResult}
              />
            </ModalPosition>
          ) : null}
        </SearchSection>
        <FilterSection>
          <DropDown onClick={roomModalHandler}>
            <span id="roomModalBtn" onClick={roomModalHandler}>
              원룸, 투·쓰리룸, 오피스텔·도시형
            </span>
            {roomTypeModal ? (
              <BsChevronUp size="16px" onClick={roomModalHandler} />
            ) : (
              <BsChevronDown size="16px" onClick={roomModalHandler} />
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
              <BsChevronUp size="16px" onClick={tradeModalHandler} />
            ) : (
              <BsChevronDown size="16px" onClick={tradeModalHandler} />
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
    </div>
  );
}
const Outer = styled.div``;

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  height: 64px;
  border-bottom: 1px solid rgb(205, 205, 205);
  background-color: rgb(255, 255, 255);
  position: absolute;
  top: 10;
  left: 0;
  right: 0;
  z-index: 9999;
`;

const SearchSection = styled.div`
  display: flex;
  position: relative;
  width: 25rem;
  align-items: center;
  border-right: 1px solid rgb(205, 205, 205);

  .icon {
    flex: 1;
    padding-left: 10px;
  }
  input {
    flex: 5;
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
  padding: 0.5rem 0 0.5rem 0.5rem;
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
  text-align: end;
  position: relative;
  right: 10px;
`;

const ModalPosition = styled.div`
  position: absolute;
  top: 50px;
  left: 0;
  pointer-events: painted;
`;
export default SearchBar;
