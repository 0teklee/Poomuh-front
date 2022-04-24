import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import List from './List';
import Map from './Map';
import SearchBar from './SearchBar';
import Header from '../../components/header/Header';
import { GlobalContextProvider } from './context';
//Context API 사용

function MapPage() {
  return (
    <div>
      <Header />
      <GlobalContextProvider>
        <Wrapper>
          <SearchBar />
          <MapWrapper>
            <div className="list">
              <List />
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
  background: red;
`;

const MapWrapper = styled.div`
  display: flex;
  flex: 1;
  .list {
    width: 20rem;
    border-right: 1px solid rgb(205, 205, 205);
  }
  .map {
    flex: 1;
    background: white;
  }
`;

export default MapPage;
