import React, { useContext, useEffect, useRef, useState } from 'react';
import { useCallback } from 'react';
import styled from 'styled-components';
import { RealEstateContext } from './context';
import ListCard from './ListCard';

function List() {
  const RealEstate = useContext(RealEstateContext);
  const { kakao } = window;
  const { map } = RealEstate;

  //무한 스크롤
  const [estateList, setEstateList] = useState([]);
  const [scrollHelper, setScrollHelper] = useState(0);
  const target = useRef(null);
  const [isUser, setIsUser] = useState('');
  //몇번째 페이지인지 알려주는 값
  const [offset, setOffset] = useState(0);
  // //localStorage에 토큰 저장
  const token = localStorage.getItem('access_token');
  const tradeTypeFilter = RealEstate.tradeTypeFilter;
  const tradeType = Object.entries(tradeTypeFilter)
    .filter(el => el[1] === true)
    .map(el => el[0])
    .toString();
  //list에 보여줄 데이터 fetch하기
  const header = {
    'Content-Type': 'application/json',
    offset: offset,
    LatLng: `${RealEstate.mapBounds.ha},${RealEstate.mapBounds.oa},${RealEstate.mapBounds.qa},${RealEstate.mapBounds.pa}`,
  };

  useEffect(() => {
    if (token) {
      header.token = token;
      setIsUser('users');
    }
  }, []);

  const fetchData = async () => {
    setTimeout(async () => {
      await fetch(
        `http://localhost:8000/estates/scroll/${isUser}?tradeType=${tradeType}`,
        {
          method: 'GET',
          headers: header,
        }
      )
        .then(res => res.json())
        .then(data => {
          if (data.map.length < 4) {
            setEstateList(estateList.concat(data.map));
            setScrollHelper(1);
          } else {
            setEstateList(estateList.concat(data.map));
            setScrollHelper(0);
          }
          setOffset(prev => prev + 1);
        });
    }, 700);
  };

  //스크롤이 마지막에 도착하면 scrollHelper를 truthy로 변경
  const handleObserver = async ([entry], observer) => {
    if (entry.isIntersecting) {
      setScrollHelper(1);
    }
  };

  useEffect(() => {
    setEstateList([]);
    fetchData();
  }, [RealEstate.mapBounds]);

  //scrollHelper값이 0->1로 바뀌면 fetch
  useEffect(() => {
    if (scrollHelper === 1) {
      fetchData();
    }
  }, [scrollHelper]);

  useEffect(() => {
    let observer;
    if (target.current) {
      observer = new IntersectionObserver(handleObserver, { threshold: 0.2 });
      observer.observe(target.current);
    }
  }, []);

  let circle = useRef(
    new kakao.maps.Circle({
      center: new kakao.maps.LatLng(0, 0), // 원의 중심좌표 입니다
      radius: 50, // 미터 단위의 원의 반지름입니다
      strokeWeight: 0, // 선의 두께입니다
      strokeColor: '#E8630A', // 선의 색깔입니다
      strokeOpacity: 1, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
      strokeStyle: 'dashed', // 선의 스타일 입니다
      fillColor: '#E8630A', // 채우기 색깔입니다
      fillOpacity: 0.5, // 채우기 불투명도 입니다
    })
  );

  const mouseOnEstate = useCallback(
    (latitude, longitude) => {
      let position = new kakao.maps.LatLng(latitude, longitude);
      circle.current.setPosition(position);
      circle.current.setMap(map);
    },
    [kakao.maps.LatLng, map]
  );

  const mouseOutEstate = () => {
    circle.current.setMap(null);
  };

  return (
    <Wrapper>
      {estateList.map((data, index) => {
        return (
          <CardWrapper key={index}>
            <div
              onMouseEnter={() => {
                mouseOnEstate(data.latitude, data.longitude);
              }}
              onMouseLeave={mouseOutEstate}
            >
              <ListCard data={data} />
            </div>
          </CardWrapper>
        );
      })}
      <div ref={target} className="targetElement" />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  .targetElement {
    height: 10px;
    border: 1px solid white;
  }
`;

const CardWrapper = styled.div`
  border: 1px solid transparent;
  position: relative;
`;

export default List;
