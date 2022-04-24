import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import List from './List';
import Map from './Map';
import SearchBar from './SearchBar';
//Context API 사용

function MapPage() {
  return (
    <div>
      <SearchBar />
      <Wrapper>
        <List />
        <Map />
      </Wrapper>
    </div>
  );
}

const Wrapper = styled.div`
  display: flex;
`;

export default MapPage;
