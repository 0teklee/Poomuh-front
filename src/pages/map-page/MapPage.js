import React, { useContext, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import List from './List';
import Map from './Map';
import SearchBar from './SearchBar';
import Header from '../../components/header/Header';
import { GlobalContextProvider } from './context';
<<<<<<< HEAD
import { RealEstateContext } from './context';
=======
>>>>>>> a05ee4bacd7de78ecc0efef6f76a5f78118988d3

//Context API 사용

function MapPage() {
  return (
    <Container>
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
`;

export default MapPage;
