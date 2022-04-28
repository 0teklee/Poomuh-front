import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { IoMdHeartEmpty, IoMdHeart } from 'react-icons/io';

function RecentRoomCard({ data }) {
  const [like, setLike] = useState(data.is_like);
  const navigate = useNavigate();
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

  return (
    <>
      {data.length === 0 ? null : (
        <Wrapper>
          <ImageWrapper>
            <Image alt="image" src={data.image_url}></Image>
            <Like>
              {token ? (
                like ? (
                  <IoMdHeart color="red" onClick={() => updateLike()} />
                ) : (
                  <IoMdHeartEmpty color="white" onClick={() => updateLike()} />
                )
              ) : (
                <IoMdHeartEmpty
                  color="white"
                  onClick={() => navigate('/login')}
                />
              )}
              {/* {data.hasOwnProperty('is_like') ? (
                like ? (
                  <IoMdHeart color="red" onClick={() => updateLike()} />
                ) : (
                  <IoMdHeartEmpty color="white" onClick={() => updateLike()} />
                )
              ) : (
                <IoMdHeartEmpty
                  color="white"
                  onClick={() => navigate('/login')}
                />
              )} */}
            </Like>
          </ImageWrapper>
          <ContentWrapper>
            <Type>{data.category_type}</Type>
            <Price>
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
            </Price>
            <Informations>
              {`${data.current_floor},
              ${data.exclusive_size}`}
              m<sup>2</sup>
              <br />
              {data.description_title}
            </Informations>
          </ContentWrapper>
        </Wrapper>
      )}
    </>
  );
}

const Wrapper = styled.div`
  margin-bottom: 20px;
  width: 280px;
  margin-bottom: 4rem;
  cursor: pointer;
`;
const ImageWrapper = styled.div`
  position: relative;
  width: 280px;
  height: 186px;

  img {
    object-fit: cover;
    width: 100%;
    height: 100%;
    border-radius: 3px;
  }
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
  margin-top: 0.5rem;
  line-height: 1.2rem;
  font-weight: 300;
  font-size: 0.9rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  sup {
    font-size: 0.5rem;
  }
`;
export default RecentRoomCard;
