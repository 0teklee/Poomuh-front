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
        <SearchBar />
        <Wrapper>
          <List />
          <Map />
        </Wrapper>
      </GlobalContextProvider>
    </div>
  );
}

const Wrapper = styled.div`
  display: flex;
`;

export default MapPage;
