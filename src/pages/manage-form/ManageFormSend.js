import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { BsCheck } from 'react-icons/bs';
import styled from 'styled-components';
import { InfoContext } from './context';

function ManageFormSend() {
  const [agree, setAgree] = useState(false);
  const handleAgree = () => {
    setAgree(prev => !prev);
    console.log(Info);
  };
  const Info = useContext(InfoContext);

  const sendInfo = () => {
    fetch('uri', { method: 'POST', body: JSON.stringify(Info) }).then();
  };
  const navigate = useNavigate();
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
          <input type="button" value="매물등록" />
        </FlexDiv>
      </Input>
    </FlexDiv>
  );
}

const FlexDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
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
