import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { RealEstateContext } from './context';
import { IoMdHeartEmpty, IoMdHeart } from 'react-icons/io';

function ListCard({ data }) {
  const [like, setLike] = useState(data.isLike);
  const navigate = useNavigate();
  const RealEstate = useContext(RealEstateContext);
  const token = localStorage.getItem('access_token');

  const updateLike = () => {
    setLike(like ? false : true);

    //찜 변경 API(회원만 가능) *******************************************************************
    fetch(`http://localhost:8000/favorites/likes/${data.id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        token: token,
      },
    }).then(res => res.json());
  };

  const updateRecentRoom = () => {
    let arr = localStorage.getItem('recentRoom'); //로컬스토리지 값을 불러온다
    if (arr === null) {
      arr = []; //로컬스토리지에 데이터가 없을 경우 새로운 배열을 만든다.
    } else {
      arr = JSON.parse(arr); // 데이터가 있을 경우 JSON 문자열을 자바스크립트 값으로 변환해준다.
      arr.length === 20 ? arr.shift() : (arr = arr); //배열의 길이가 20이 되면 배열 첫 번째 값을 제거한다. 길이가 20 미만이면 변화가 없다.
    }
    arr.push(data.id); //리스트의 매물을 클릭하면 선택한 매물의 id를 배열에 저장한다.
    arr = new Set(arr); //[중복 제거] : 중복된 데이터를 넣지 않는 set 자료형에 arr를 담으면 중복이 제거된다.
    arr = [...arr]; //중복 제거된 set 자료형의 arr를 일반 배열로 변경한다.
    localStorage.setItem('recentRoom', JSON.stringify(arr)); //로컬스토리지에 데이터를 JSON 문자열로 저장한다.
  };

  return (
    <ListWrapper>
      {data.length === 0 ? null : (
        <CardWrapper>
          <Card
            onClick={() => {
              updateRecentRoom();
            }}
          >
            <ImageWrapper>
              <img alt="이미지" src={data.image_url} />

              {/* 좋아요 버튼(API연결) */}
              <Like>
                {data.hasOwnProperty('is_like') ? (
                  like ? (
                    <IoMdHeart color="red" onClick={() => updateLike()} />
                  ) : (
                    <IoMdHeartEmpty
                      color="white"
                      onClick={() => updateLike()}
                    />
                  )
                ) : (
                  <IoMdHeartEmpty
                    color="white"
                    onClick={() => navigate('/login')}
                  />
                )}
              </Like>
            </ImageWrapper>
            <InfoWrapper>
              <p className="price">
                {data.trade_type.length === 1 && data.trade_type[0] === '전세' //배열데이터[월세,전세] or [전세]
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
              <p className="type">{data.category_type}</p>
              <br />
              <p className="description">
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
  cursor: pointer;
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
