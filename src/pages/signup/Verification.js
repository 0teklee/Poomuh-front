import React from 'react';
import styled from 'styled-components';

const Verification = () => {
  return (
    <Wrapper>
      <Heading>본인 인증</Heading>
      <WelcomeMessage>본인인증을 위해 아래 정보를 입력해주세요.</WelcomeMessage>
      <Inputs>
        <div className="inputWrapper">
          <label for="name">이름</label>
          <input
            type="text"
            id="name"
            placeholder="이름 입력"
            className="inputBox"
          />
        </div>

        <div className="idNumWrapper">
          <label for="idNum">주민등록번호</label>
          <div className="idNumInputs">
            <input
              type="text"
              id="firstDigits"
              placeholder="주민번호 앞 6자리"
              className="inputBox"
            />
            <span className="hyphen" />
            <input
              type="text"
              id="secondDigits"
              className="inputBox secondDigits"
            />
            <span>●●●●●●</span>
          </div>
        </div>
      </Inputs>
      <CheckBoxes>
        <label for="selectAll" name="모두 동의" className="selectAll">
          <input type="checkbox" id="selectAll" />
          모두 동의합니다.
        </label>
        <div className="checkList">
          <label
            for="overFourteen"
            name="만 14세 이상 동의"
            className="necessary"
          >
            <input type="checkbox" id="overFourteen" />
            [필수] 만 14세 이상입니다.
          </label>
          <label
            for="serviceAgreed"
            name="서비스 이용약관 동의"
            className="necessary"
          >
            <input type="checkbox" id="serviceAgreed" />
            [필수] 다방 서비스 이용약관 동의
          </label>

          <label for="privateAgreed" name="개인정보 동의" className="necessary">
            <input type="checkbox" id="privateAgreed" />
            [필수] 개인정보 수집 및 이용 동의
          </label>

          <label
            for="receiveAgreed"
            name="마케팅 수신 동의"
            className="optional"
          >
            <input type="checkbox" id="receiveAgreed" />
            [선택] 마케팅 정보 수신에 대한 동의
          </label>
        </div>
      </CheckBoxes>
      <Inputs>
        <div className="inputWrapper">
          <label for="mobileCarrier">통신사</label>
          <select name="통신사 선택" id="mobileCarrier">
            <option value="">통신사 선택</option>
            <option value="SKT">SKT</option>
            <option value="LG">LG U+</option>
            <option value="KT">KT</option>
          </select>
        </div>

        <div className="inputWrapper">
          <label for="phoneNumber">휴대폰번호</label>
          <div className="authWrapper">
            <input
              type="text"
              id="phoneNumber"
              placeholder="-없이 숫자만 입력"
              className="inputBox"
            />
            <AuthButton>인증번호 전송</AuthButton>
          </div>
        </div>

        <div className="inputWrapper">
          <label for="authentication">인증번호</label>
          <div className="authWrapper">
            <input
              type="text"
              id="authentication"
              placeholder="인증번호 입력"
              className="inputBox"
            />
            <AuthButton>인증번호 전송</AuthButton>
          </div>
        </div>
      </Inputs>
      <SuccessButton>
        <span>회원가입 완료</span>
      </SuccessButton>
      <LaterButton>본인인증 다음에 할래요</LaterButton>
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
  margin-bottom: 15px;
  font-size: 12px;
  font-weight: 800;
  .inputWrapper {
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
  }
  .inputBox {
    padding: 10px;
    margin-top: 10px;
    border: 1px solid #f2f2f2;
    border-radius: 5px;
  }
  .inputBox::placeholder {
    font-size: 11px;
    color: #757575;
  }
  .idNumInputs {
    display: flex;
    flex-direction: row;
    align-items: baseline;
    .hyphen {
      margin: 8px;
      width: 10px;
      height: 1px;
      background-color: #dfdfdf;
    }
    .secondDigits {
      width: 10%;
      margin-right: 5px;
    }
    span {
      font-size: 15px;
    }
  }
  .AuthWrapper {
    border: 1px solid red;
  }
`;

const CheckBoxes = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 12px;

  .selectAll {
    font-weight: 800;
    padding-bottom: 15px;
    border-bottom: 1px solid #f8f8f8;
  }
  .checkList {
    display: flex;
    flex-direction: column;
    margin-top: 20px;
    font-weight: 600;
    label {
      margin-bottom: 13px;
    }
  }
`;

const AuthButton = styled.span`
  width: 30%;
  padding: 10px;
  color: white;
  background-color: #dfdfdf;
  text-align: center;
`;

const SuccessButton = styled.div`
  margin-top: 30px;
  padding: 20px 0;
  color: white;
  background-color: #dfdfdf;
  font-size: 13px;
  font-weight: 900;
  text-align: center;
`;

const LaterButton = styled.div`
  margin-top: 15px;
  text-align: center;
  font-size: 11px;
  font-weight: 800;
`;

export default Verification;
