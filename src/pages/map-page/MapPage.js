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
  //몇번째 페이지인지 알려주는 값
  const [offset, setOffset] = useState(0);
  const [isUser, setIsUser] = useState('');
  //localStorage에 토큰 저장
  const token = localStorage.getItem('access_token');

  //localStorage에 토큰이 있다면 isUser
  if (localStorage.getItem(token)) {
    setIsUser('/users');
  }

  //list에 보여줄 데이터 fetch하기
  const fetchData = async () => {
    setTimeout(async () => {
      await fetch(`http://localhost:8000/estates/scroll${isUser}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          token: token,
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
      console.log('offset>>', offset);
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
    <Container>
      <Header />
      <GlobalContextProvider>
        <Wrapper>
          <SearchBar />
          <MapWrapper>
            <div className="list">
              {estateList.map((data, index) => (
                <List
                  longitude={data.longitude}
                  latitude={data.latitude}
                  key={index}
                />
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
    </Container>
  );
}

const Container = styled.div`
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  overflow: scroll;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

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
