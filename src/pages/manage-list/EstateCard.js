import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';
const EstateCard = () => {
  const navigate = useNavigate();

  //token 가져오기
  const token = localStorage.getItem('access_token');

  const [estates, setEstates] = useState([]);

  //매물 삭제
  const deleteEstate = id => {
    setEstates(estates.filter(el => el.estateInfo.id !== id));
    fetch(`http://localhost:8000/estates/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        token: token,
      },
    })
      .then(res => res.json())
      .then(res => console.log(res));
  };

  //list 가져오기
  useEffect(() => {
    fetch('http://localhost:8000/estates/agents/list', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        token: token,
      },
    })
      .then(res => res.json())
      .then(data => {
        setEstates(data);
      });
  }, []);

  //날짜 형태 변경하는 함수
  const formatDate = createdDate => {
    const moment = require('moment');
    const date = moment(createdDate).format('YYYY-MM-DD');
    return date;
  };

  return (
    <Wrapper>
      {estates.map(data => {
        return (
          <CardBox key={data.estateInfo.id}>
            <EstateBox>
              <EstateDeadline>
                <div className="estateNum">
                  <p>매물번호 {data.estateInfo.id}</p>
                </div>
                <div className="adInfo">
                  <p className="advertising">광고중</p>
                  <p className="expirationDate">광고종료 D-29</p>
                </div>
              </EstateDeadline>
              <EstateInfo>
                <div className="imgWrapper">
                  <img src="" alt="매물 사진" />
                </div>
                <div className="infoWrapper">
                  <p className="type">{data.estateInfo.categories.type}</p>
                  {data.estateInfo.price_main && (
                    <p className="price">
                      전세
                      {data.estateInfo.price_main}
                    </p>
                  )}
                  {data.estateInfo.price_monthly &
                  (
                    <p className="price">
                      월세
                      {data.estateInfo.price_deposit} /{' '}
                      {data.estateInfo.price_monthly}
                    </p>
                  )}
                </div>
              </EstateInfo>
            </EstateBox>
            <DescriptionBox>
              <Description>
                <div className="descBox" />
              </Description>
              <Buttons>
                <div className="buttonDiv">
                  <div className="registerDate">
                    <p>
                      등록일{' '}
                      <span className="date">
                        {formatDate(data.estateInfo.created_at)}
                      </span>
                    </p>
                    <p>
                      조회수 <span className="count">1</span>
                    </p>
                    <p>
                      찜 <span className="count">{data.likes._count}</span>
                    </p>
                  </div>
                  <div className="buttons">
                    <button
                      onClick={() =>
                        navigate(`/manage/form/${data.estateInfo.id}`)
                      }
                    >
                      수정
                    </button>
                    <button
                      onClick={() => {
                        const isDelete = window.confirm('삭제하시겠습니까?');
                        if (isDelete) {
                          deleteEstate(data.estateInfo.id);
                        }
                      }}
                    >
                      삭제
                    </button>
                    <button>광고 종료</button>
                    <button>거래 완료</button>
                  </div>
                </div>
              </Buttons>
            </DescriptionBox>
          </CardBox>
        );
      })}
    </Wrapper>
  );
};

const Wrapper = styled.section`
  width: 100%;
  margin-bottom: 50px;
`;

const CardBox = styled.section`
  display: flex;
  flex-wrap: nowrap;
  width: 100%;
  margin-bottom: 15px;
  border: 1px solid rgb(226, 226, 226);
`;

const EstateBox = styled.section`
  display: flex;
  flex-wrap: nowrap;
  width: 50%;
  border: 1px solid rgb(226, 226, 226);
`;

const DescriptionBox = styled.section`
  display: flex;
  flex-wrap: nowrap;
  width: 50%;
  border: 1px solid rgb(226, 226, 226);
`;

const EstateDeadline = styled.div`
  width: 40%;
  text-align: center;
  font-size: 14px;
  font-weight: 500;
  border-right: 1px solid rgb(226, 226, 226);

  .estateNum {
    width: 70%;
    margin: 30px auto 10px;
    padding-bottom: 15px;
    border-bottom: 1.5px solid rgb(226, 226, 226);
    text-align: center;
  }

  .adInfo {
    margin-bottom: 20px;
    line-height: 20px;
    .advertising {
      color: #1564f9;
      font-size: 15px;
    }
    .expirationDate {
      color: #62a6ff;
      font-size: 13px;
    }
  }
`;

const EstateInfo = styled.div`
  display: flex;
  flex-wrap: nowrap;
  width: 70%;

  .imgWrapper {
    margin: auto 10px;
    width: 50%;
    height: 70%;
    border: 1px solid rgb(226, 226, 226);
  }

  .infoWrapper {
    margin: auto 10px;
    width: 40%;
    height: 70%;
    font-size: 18px;
    font-weight: 700;
    line-height: 25px;
    .status {
      font-size: 14px;
      font-weight: 400;
    }
  }
`;

const Description = styled.div`
  width: 50%;
  border-right: 1px solid rgb(226, 226, 226);

  .descBox {
    margin: 20px auto;
    width: 80%;
    height: 65%;
    border: 1px solid rgb(226, 226, 226);
  }
`;

const Buttons = styled.div`
  width: 50%;
  font-size: 13px;
  display: flex;
  justify-content: center;
  align-items: center;

  .registerDate {
    display: flex;
    flex-wrap: nowrap;
    justify-content: center;
    color: #666666;
    p:nth-child(-n + 2) {
      padding-right: 5px;
      margin-right: 5px;
      border-right: 1px solid rgb(226, 226, 226);

      .count {
        color: rgb(21, 100, 249);
      }
    }
  }

  .buttons {
    margin-top: 20px;
    button {
      padding: 10px 10px;
      background-color: white;
      border: 1px solid rgb(226, 226, 226);
      :hover {
        cursor: pointer;
        background-color: rgb(204, 204, 204);
      }
    }
  }
`;
export default EstateCard;
