import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { UserInfoContext } from './signupContext';

const Success = () => {
  const userInfo = useContext(UserInfoContext);
  const user = userInfo.nickname;
  const navigate = useNavigate();

  return (
    <Wrapper>
      <Heading>가입완료</Heading>
      <Contents>
        <span>{user}님</span>
        <span>환영합니다.</span>
      </Contents>
      <SuccessButton onClick={() => navigate('/login')}>
        <span>확인</span>
      </SuccessButton>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  width: 35%;
  margin: 30px auto;
  padding: 60px;
  border: 1px solid #f6f6f6;
`;

const Heading = styled.h1`
  padding-bottom: 25px;
  border-bottom: 1px solid #f8f8f8;
  font-size: 28px;
  font-weight: 900;
`;

const Contents = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 30px;
  font-size: 13px;
  font-weight: 700;
  text-align: center;
  letter-spacing: 1px;
`;
const SuccessButton = styled.div`
  margin-top: 30px;
  padding: 20px 0;
  color: white;
  background-color: #316df9;
  font-size: 13px;
  font-weight: 900;
  text-align: center;
  :hover {
    cursor: pointer;
  }
`;

export default Success;
