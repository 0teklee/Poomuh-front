import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { RealEstateContext, RealEstateContextDispatch } from './context';
import { IoMdHeartEmpty, IoMdHeart } from 'react-icons/io';

function List({ longitude, latitude }) {
  const RealEstate = useContext(RealEstateContext);
  const RealEstateDispatch = useContext(RealEstateContextDispatch);
  const [like, setLike] = useState(false);
  const LikeHandler = () => {
    setLike(!like);
  };
  //호버 이벤트를 주면 해당 매물의 위도,경도로 원의 중심 좌표를 context에서 바꾼다.
  const mouseOnEstate = () => {
    RealEstateDispatch({ type: 'UPDATE_ESTATELOG', estateLog: longitude });
    RealEstateDispatch({ type: 'UPDATE_ESTATELAT', estateLat: latitude });
  };

  // console.log(RealEstate);
  // console.log(RealEstateDispatch);
  // console.log(RealEstate.selected[0]);
  // console.log(RealEstate.selected[0].description_title);
  return (
    <ListWrapper onMouseEnter={mouseOnEstate}>
      <CardWrapper>
        <Card>
          <ImageWrapper>
            <Like onClick={LikeHandler}>
              {like === false ? (
                <IoMdHeartEmpty color="black" />
              ) : (
                <IoMdHeart color="red" />
              )}
            </Like>
          </ImageWrapper>
          <InfoWrap>
            {RealEstate.selected.length === 0 ? null : (
              <>
                <p class="price">전세 2억 6000</p> <br />
                <p class="type">원룸</p>
                <br />
                <p class="description">
                  {RealEstate.selected[0].current_floor}, &nbsp;
                  {RealEstate.selected[0].supply_size}
                  <br />
                  {RealEstate.selected[0].description_title}
                </p>
              </>
            )}
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
const ImageWrapper = styled.div`
  border: 1px solid blue;
  position: relative;
  width: 140px;
  height: 140px;
`;
const Like = styled.div`
  position: absolute;
  top: 5px;
  right: 5px;
  color: ${props => props.color};
  font-size: 1.5rem;
  cursor: pointer;
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
