import React from 'react';
import styled from 'styled-components';

const CheckForSignUp = () => {
  return (
    <Wrapper>
      <Heading>회원가입</Heading>
      <WelcomeMessage>
        환영합니다! 푸망 서비스 이용약관에 동의해주세요.
      </WelcomeMessage>
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
      <SubDescription>
        <p>만 14세 이상 회원 가입 가능합니다.</p>
        <p>
          해당 내용은 <span className="highlight">이용약관 및 정책</span>에서도
          확인이 가능합니다.
        </p>
      </SubDescription>
      <NextButton>
        <span>동의하고 진행하기</span>
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
  font-size: 13px;
  font-weight: 700;
`;

const CheckBoxes = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 13px;

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

const SubDescription = styled.div`
  font-size: 12px;
  line-height: 15px;
  color: #9f9f9f;
  .highlight {
    color: #4379fa;
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
export default CheckForSignUp;
