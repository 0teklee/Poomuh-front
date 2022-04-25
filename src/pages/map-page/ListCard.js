import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { RealEstateContext } from './context';
import { IoMdHeartEmpty, IoMdHeart } from 'react-icons/io';

function ListCard({ data }) {
  const [like, setLike] = useState(false);
  const RealEstate = useContext(RealEstateContext);
  const navigate = useNavigate();
  const LikeHandler = () => {
    setLike(!like);
  };

  // 로그인돼있는 경우 'isLike : 1' => data.isLike == true
  // 로그아웃 돼있는 경우 '' => data.isLike ===null
  // 로그인된 상태에서 하트 클릭시 DB 값 변경

  // 남은기능 : 지도페이지 첫 접속 시 화면 영역의 매물이 나오도록
  // 하트 클릭시 1. 좋아요 상태 유지 =>  목데이터에 isLike 추가?
  // 하트 클릭시 2. 관심목록에 데이터 전송

  return (
    <ListWrapper>
      {data.length === 0 ? null : (
        <CardWrapper>
          <Card>
            <ImageWrapper>
              <img alt="이미지" src={data.image_url} />
              {/* <Like>
                {data.isLike ? (
                  <IoMdHeart color="red" />
                ) : (
                  <IoMdHeartEmpty color="white" />
                )}
              </Like> */}
            </ImageWrapper>
            <InfoWrapper>
              <p class="price">
                {data.tradeTypes.length === 1 && data.tradeTypes[0] === '전세' //배열데이터[1(월세),2(전세)]
                  ? `전세 ${Math.floor(data.price_main / 10000)}억${
                      Math.floor(data.price_main) -
                        Math.floor(data.price_main / 10000) * 10000 ===
                      0
                        ? ''
                        : Math.floor(data.price_main) -
                          Math.floor(data.price_main / 10000) * 10000
                    }`
                  : `월세
                    ${data.price_deposit}/${data.price_monthly}`}
              </p>
              <br />
              <p class="type">{data.category_type}</p>
              <br />
              <p class="description">
                {`${data.current_floor},
              ${data.supply_size}`}
                m<sup>2</sup>
                <br />
                {data.description_title}
              </p>
            </InfoWrapper>
          </Card>
        </CardWrapper>
      )}
    </ListWrapper>
  );
}

const ListWrapper = styled.div`
  border-bottom: 1px solid rgb(231, 231, 231);
  transition: 0.3s;
  :hover {
    background-color: #f0f4fa;
  }
`;
const CardWrapper = styled.div`
  border: 1px solid transparent;
`;
const Card = styled.div`
  display: flex;
  justify-content: flex-start;
  margin: 1rem;
`;
const ImageWrapper = styled.div`
  position: relative;
  width: 140px;
  height: 140px;
  overflow: hidden;
  border-radius: 3px;
  text-align: center;
  img {
    object-fit: cover;
    width: 100%;
    height: 100%;
  }
`;
const Like = styled.div`
  position: absolute;
  top: 5px;
  right: 5px;
  color: ${props => props.color};
  font-size: 1.5rem;
  cursor: pointer;
`;
const InfoWrapper = styled.div`
  margin-left: 1rem;
  padding-top: 0.5rem;
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
  sup {
    font-size: 0.5rem;
  }
`;

export default ListCard;
