import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { RealEstateContext, RealEstateContextDispatch } from './context';
// import { IoHeartOutline } from 'react-icons/io5';
// import { FaBeer } from 'react-icons/fa';
function List() {
  const RealEstate = useContext(RealEstateContext);
  const RealEstateDispatch = useContext(RealEstateContextDispatch);
  // const [like, setLike] = useState(false);
  console.log(RealEstate);
  console.log(RealEstateDispatch);
  return (
    <ListWrapper>
      <CardWrapper>
        <Card>
          <ImageWrapper>{/* <FaBeer /> */}</ImageWrapper>
          <InfoWrap>
            <p class="price">전세 2억 6000</p> <br />
            <p class="type">원룸</p>
            <br />
            <p class="description">
              층수, 면적 <br />
              설명타이틀설명타이틀설명타이틀설명타이틀설명타이틀설명타이틀설명타이틀설명타이틀설명타이틀설명타이틀설명타이틀설명타이틀
            </p>
          </InfoWrap>
        </Card>
      </CardWrapper>
    </ListWrapper>
  );
}

export default List;

const ListWrapper = styled.div`
  // background-color: yellow;
  margin-top: 65px;
`;
const CardWrapper = styled.div`
  border: 1px solid transparent;
`;
const Card = styled.div`
  // border: 1px solid blue;
  display: flex;
  justify-content: flex-start;
  margin: 1rem;
`;
const ImageWrapper = styled.img`
  // border: 1px solid blue;
  width: 140px;
  height: 140px;
`;
const InfoWrap = styled.div`
  // border: 1px solid black;
  margin-left: 1rem;
  padding-top: 0.2rem;
  width: 13rem;

  .price {
    font-size: 1.2rem;
    font-weight: bold;
  }
  .type {
    font-size: 0.8rem;
    font-weight: 500;
  }
  .description {
    font-size: 0.9rem;
    font-weight: 350;
    line-height: 1.1rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;
