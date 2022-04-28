import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { BsCheck } from 'react-icons/bs';
import styled from 'styled-components';
import { InfoContext } from './context';

function ManageFormSend() {
  const [agree, setAgree] = useState(false);
  const handleAgree = () => {
    setAgree(prev => !prev);
  };
  const Info = useContext(InfoContext);
  const token = localStorage.getItem('access_token');
  const navigate = useNavigate();
  // 로그인 한 상태라면 로컬스토리지의 로그인 정보를 함께 전달/
  const sendInfo = () => {
    fetch('http://localhost:8000/estates', {
      method: 'POST',
      body: JSON.stringify(Info),
      token: token,
    }).then();
  };

  const verify = () => {
    const {
      address,
      address_ho,
      room_type,
      building_type,
      supply_size,
      exclusive_size,
      building_floor,
      current_floor,
      price_main,
      price_deposit,
      price_monthly,
      heat_id,
      available_date,
      description_title,
      description_detai,
      trade_id,
    } = Info;
    if (
      !address ||
      !address_ho ||
      !room_type ||
      !building_type ||
      !supply_size ||
      !exclusive_size ||
      !building_floor ||
      !current_floor ||
      !price_main ||
      !(price_deposit && price_monthly) ||
      !heat_id ||
      !available_date ||
      !description_title ||
      !description_detai ||
      !trade_id
    ) {
      alert('모든 정보를 입력해주세요');
      return;
    }
    sendInfo();
  };

  return (
    <FlexDiv>
      <Input>
        <div className="inputCheckbox" onClick={handleAgree}>
          <input id="inputAgree" type="checkbox" checked={agree} readOnly />
          <label htmlFor="inputAgree" onClick={handleAgree}>
            <BsCheck size="20px" color="#fff" />
          </label>
          <p className="notice">
            매물관리규정을 확인하였으며, 입력한 정보는 실제 매물과 다름이
            없습니다.
          </p>
        </div>
        <FlexDiv>
          <input
            type="button"
            value="취소"
            onClick={() => navigate('/manage/list')}
          />
          <input type="button" value="매물등록" onClick={() => verify()} />
        </FlexDiv>
      </Input>
    </FlexDiv>
  );
}

const FlexDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 50px;
`;
const Input = styled.div`
  .inputCheckbox {
    margin: 15px 0px;
    position: relative;
    cursor: pointer;
    input[type='checkbox'] {
      display: none;
    }
    .notice {
      display: inline-block;
      margin-left: 30px;
    }
    label {
      border: 1px solid rgb(226, 226, 226);
      position: absolute;
      bottom: -5px;
      cursor: pointer;
    }
    input[type='checkbox']:checked + label {
      background: rgb(50, 108, 249);
    }
  }
  input[type='button'] {
    all: unset;
    padding: 1rem;
    margin: 0 1rem;
    border: 1px solid rgb(226, 226, 226);
    border-radius: 3px;
    cursor: pointer;
  }
  input[type='button']:last-child {
    background: rgb(50, 108, 249);
    color: #fff;
  }
`;
export default ManageFormSend;
