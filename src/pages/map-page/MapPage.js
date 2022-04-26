import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import List from './List';
import Map from './Map';
import SearchBar from './SearchBar';
import Header from '../../components/header/Header';
import { GlobalContextProvider } from './context';
//Context API 사용

function MapPage() {
  const [estateList, setEstateList] = useState([]);
  const [scrollHelper, setScrollHelper] = useState(0);
  const target = useRef(null);

  //list에 보여줄 데이터 fetch하기
  const fetchData = async () => {
    setTimeout(async () => {
      await fetch('data/scrollList.json')
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
    }
  };

  //클릭 이벤트를 주면 원의 중심 좌표를 context에서 바꾼다

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
    return () => observer && observer.disconnenct(); //useEffct 함수에서 return은 새로 또 useEffect 하기 전에 이거 또 하는 것
  }, []);

  return (
    <div>
      <Header />
      <GlobalContextProvider>
        <Wrapper>
          <SearchBar />
          <MapWrapper>
            <div className="list">
              {estateList.map(data => (
                <List longitude={data.longitude} latitude={data.latitude} />
              ))}
              <div ref={target} className="targetElement">
                <p>hi</p>
              </div>
            </div>
            <div className="map">
              <Map />
            </div>
          </MapWrapper>
        </Wrapper>
      </GlobalContextProvider>
    </div>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 90vh;
`;

const MapWrapper = styled.div`
  display: flex;
  flex: 1;
  .list {
    width: 25rem;
    border-right: 1px solid rgb(205, 205, 205);
    max-height: 750px;
    overflow-y: scroll;
  }
  .map {
    flex: 1;
    background: white;
  }
  .targetElement {
    border: 1px solid pink;
  }
`;

export default MapPage;
