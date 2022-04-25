import React, { useState } from 'react';
import styled from 'styled-components';
import { IoMdHeartEmpty, IoMdHeart } from 'react-icons/io';

function RecentRoomCard({ data }) {
  const [like, setLike] = useState(false);

  const LikeHandler = () => {
    setLike(!like);
  };
  //하트 누르면 해당 페이지로 데이터 이동해야함
  console.log(data);

  return (
    <Wrapper>
      <ImageWrapper>
        <Image alt="image" src={data.image}></Image>
        <Like onClick={LikeHandler}>
          {like === false ? (
            <IoMdHeartEmpty color="black" />
          ) : (
            <IoMdHeart color="red" />
          )}
        </Like>
      </ImageWrapper>
      <ContentWrapper>
        <Type>{data.category_type}</Type>
        <Price>
          {data.trade_type === '월세'
            ? `${data.trade_type} ${data.price_deposit}/${data.price_monthly}`
            : `${data.trade_type} ${data.price_main}`}
        </Price>
        <Informations>
          {data.current_floor}, {data.supply_size}m2 <br />
          {data.description_title}
        </Informations>
      </ContentWrapper>
    </Wrapper>
  );
}
const Wrapper = styled.div`
  margin-bottom: 20px;
  width: 280px;
  margin-bottom: 4rem;
  // height: 342px;
  cursor: pointer;
`;
const ImageWrapper = styled.div`
  position: relative;
  width: 280px;
  height: 186px;
  border-radius: 3px;
  overflow: hidden;
  border: 1px solid black;
`;
const ContentWrapper = styled.div`
  width: 100%;
  display: inline-block;
  overflow: hidden;
`;

const Image = styled.img`
  object-fit: cover;
  width: 100%;
  transition: all 0.2s ease-in-out;
  :hover {
    filter: brightness(70%);
  }
`;

const Like = styled.div`
  position: absolute;
  top: 5px;
  right: 5px;
  color: ${props => props.color};
  font-size: 1.5rem;
`;

const Type = styled.div`
  margin-top: 1.2rem;
  font-weight: 500;
  font-size: 0.9rem;
`;
const Price = styled.div`
  margin-top: 0.8rem;
  font-weight: bold;
  font-size: 1.3rem;
`;
const Informations = styled.div`
  white-space: nowrap;
  margin-top: 0.5rem;
  line-height: 1.2rem;
  font-weight: 300;
  font-size: 0.9rem;
`;
export default RecentRoomCard;
