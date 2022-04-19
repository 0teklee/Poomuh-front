import React from 'react';
import styled from 'styled-components';

const InputForm = () => {
  return (
    <Wrapper>
      <Heading>회원정보 입력</Heading>
      <WelcomeMessage>
        다방 서비스 이용을 위해 아래 정보를 입력해주세요.
      </WelcomeMessage>
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
          <label for="nickname">닉네임</label>
          <input
            type="text"
            id="nickname"
            placeholder="한글 또는 영문만 가능"
            className="inputBox"
          />
        </div>

        <div className="inputWrapper">
          <label for="password">비밀번호</label>
          <input
            type="password"
            id="password"
            placeholder=" 8자리 이상 영문,숫자,특수문자 포함"
            className="inputBox"
          />
          <input
            type="password"
            id="checkedPassword"
            placeholder="비밀번호 확인"
            className="inputBox"
          />
        </div>
      </Inputs>
      <NextButton>
        <span>확인</span>
      </NextButton>
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
`;

const NextButton = styled.div`
  margin-top: 30px;
  padding: 20px 0;
  color: white;
  background-color: #dfdfdf;
  font-size: 13px;
  font-weight: 900;
  text-align: center;
`;

export default InputForm;
