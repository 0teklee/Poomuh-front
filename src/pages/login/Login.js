import React from 'react';
import styled from 'styled-components';
function Login() {
  return (
    <Wrapper>
      <Heading>로그인</Heading>
      <WelcomeMessage>푸망 서비스 이용을 위해 로그인해주세요.</WelcomeMessage>
      <Inputs>
        <div className="inputWrapper">
          <label for="email">아이디</label>
          <input
            type="text"
            id="email"
            placeholder="이메일 주소 입력"
            className="inputBox"
          />
        </div>

        <div className="inputWrapper">
          <label for="password">비밀번호</label>
          <input
            type="password"
            id="password"
            placeholder="비밀번호 입력"
            className="inputBox"
          />
        </div>
        <label for="remembetId" className="rememberId">
          <input type="checkbox" id="rememberId" />
          아이디 저장
        </label>
      </Inputs>
      <LoginButton>
        <span>로그인</span>
      </LoginButton>
      <div className="agentLogin">중개사 로그인</div>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  width: 35%;
  margin: 30px auto;
  padding: 60px;
  border: 1px solid #f6f6f6;
  .agentLogin {
    margin-top: 20px;
    font-size: 11px;
    font-weight: 700;
    text-align: center;
  }
`;

const Heading = styled.h1`
  padding-bottom: 25px;
  border-bottom: 1px solid #f8f8f8;
  font-size: 28px;
  font-weight: 900;
`;

const WelcomeMessage = styled.h3`
  padding-top: 30px;
  margin-bottom: 30px;
  font-size: 12px;
  font-weight: 700;
`;

const Inputs = styled.div`
  font-size: 12px;
  font-weight: 800;
  .inputWrapper {
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
  }
  .inputBox {
    padding: 10px;
    margin-top: 5px;
    border: 1px solid #f2f2f2;
    border-radius: 5px;
  }
  .inputBox::placeholder {
    font-size: 11px;
    color: #757575;
  }

  .rememberId {
    color: #757575;
    font-weight: 600;
  }
`;

const LoginButton = styled.div`
  margin-top: 30px;
  padding: 20px 0;
  color: white;
  background-color: #326cf9;
  font-size: 13px;
  font-weight: 900;
  text-align: center;
`;
export default Login;
