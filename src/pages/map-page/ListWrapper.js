import React, { useContext, useEffect, useRef, useState } from 'react';
import { RealEstateContext } from './context';
import styled from 'styled-components';
import List from './List';

const ListWrapper = () => {
  const RealEstate = useContext(RealEstateContext);
  const [estateList, setEstateList] = useState([]);
  const [scrollHelper, setScrollHelper] = useState(0);
  const target = useRef(null);
  //몇번째 페이지인지 알려주는 값
  const [offset, setOffset] = useState(0);
  const [isUser, setIsUser] = useState('');
  //localStorage에 토큰 저장
  const token = localStorage.getItem('access_token');
  const tradeTypeFilter = RealEstate.tradeTypeFilter;

  const tradeTypeQuery = Object.entries(tradeTypeFilter)
    .filter(el => el[1] === true)
    .map(el => el[0])
    .toString();

  //localStorage에 토큰이 있다면 isUser에 '/users'저장
  useEffect(() => {
    token ? setIsUser('/users') : setIsUser('');
    fetch('/data/scrollList.json')
      .then(res => res.json())
      .then(data => {
        setEstateList(data);
      });
  }, []);

  //list에 보여줄 데이터 fetch하기
  const fetchData = async () => {
    setTimeout(async () => {
      //http://localhost:8000/estates/scroll?tradeType=${tradeType}&search=${search}
      await fetch(`/data/scrollList.json`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          token: token,
          offset: offset,
        },
      })
        .then(res => res.json())
        .then(data => {
          setEstateList(estateList.concat(data));
          setScrollHelper(0);
        });
    }, 700);
  };

  //스크롤이 마지막에 도착하면 scrollHelper를 truthy로 변경
  const handleObserver = async ([entry], observer) => {
    if (entry.isIntersecting) {
      setScrollHelper(1);
      setOffset(prev => prev++);
    }
  };

  //scrollHelper값이 0->1로 바뀌면 fetch
  useEffect(() => {
    fetchData();
  }, [scrollHelper]);

  useEffect(() => {
    let observer;
    if (target.current) {
      observer = new IntersectionObserver(handleObserver, { threshold: 0.4 });
      observer.observe(target.current);
    }
  }, []);

  return (
    <>
      {/* {RealEstate.selected.length === 0
        ? estateList.map((data, index) => {
            <List data={data} key={index} />;
          })
        : RealEstate.selected.map((data, index) => (
            <List data={data} key={index} />
          ))} */}
      {estateList.map((data, index) => {
        <div>HiHiHiHi</div>;
        // <List data={data} key={index} />;
      })}
      <Target>
        <div ref={target} className="targetElement">
          <p>hi</p>
        </div>
      </Target>
    </>
  );
};
const Target = styled.div`
  .targetElement {
    border: 1px solid pink;
  }
`;

export default ListWrapper;
