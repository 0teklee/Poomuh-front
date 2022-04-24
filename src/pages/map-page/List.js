import React, { useContext } from 'react';
import styled from 'styled-components';
import { RealEstateContext, RealEstateContextDispatch } from './context';

function List() {
  const RealEstate = useContext(RealEstateContext);
  const RealEstateDispatch = useContext(RealEstateContextDispatch);
  return <div>List</div>;
}

export default List;
