import React, { useContext, useState } from 'react';
import { useEffect } from 'react';
import styled from 'styled-components';
import { UserInfoContext, UserInfoDispatchContext } from './signupContext';

const CheckForSignUp = ({ setShow }) => {
  //context 사용
  const userInfo = useContext(UserInfoContext);
  const userInfoDispatch = useContext(UserInfoDispatchContext);

  //전체 선택 관리할 상태값
  const [totalCheck, setTotalCheck] = useState(false);
  const [checks, setChecks] = useState(Array(4).fill(false));
  const [activeBtnCheck, setActiveBtnCheck] = useState(false);

  //중개사 확인 값 담기
  const onChangeAgent = e => {
    if (e.target.checked) {
      userInfoDispatch({
        type: 'UPDATE_ISAGENT',
        isAgent: e.target.checked,
      });
    } else if (!e.target.checked) {
      userInfoDispatch({
        type: 'UPDATE_ISAGENT',
        isAgent: e.target.checked,
      });
    }
  };

  const allCheck = () => {
    setChecks(Array(checks.length).fill(!totalCheck));
    setTotalCheck(!totalCheck);
  };

  const clickNext = () => {
    if (activeBtnCheck) {
      setShow('input');
    }
  };

  //전체 버튼이 active 되었는지 확인하는 함수
  const checkAllBtn = () => {
    let result = 0;
    for (let i in checks) {
      checks[i] ? result++ : result--;
    }
    return result;
  };

  //필수 체크박스 눌렸는지 확인하는 함수
  const checkRequired = () => {
    let result = 0;
    for (let i = 0; i < 3; i++) {
      checks[i] ? result++ : result--;
    }
    return result;
  };

  const individualCheck = index => {
    setChecks(prev => {
      const newArr = [...prev];
      newArr[index] = !newArr[index];
      return newArr;
    });
  };

  //체크 개수를 확인해서 전체 체크가 되면 모두 동의 체크하기
  useEffect(() => {
    let checkAllresult = checkAllBtn();
    checkAllresult === 4 ? setTotalCheck(true) : setTotalCheck(false);
    let requiredResult = checkRequired();
    requiredResult === 3 ? setActiveBtnCheck(true) : setActiveBtnCheck(false);
  }, [checks]);

  return (
    <Wrapper>
      <Heading>회원가입</Heading>
      <WelcomeMessage>
        환영합니다! 푸망 서비스 이용약관에 동의해주세요.
      </WelcomeMessage>
      <CheckBoxes>
        <label for="selectAll" name="모두 동의" className="selectAll">
          <input
            type="checkbox"
            id="selectAll"
            checked={totalCheck}
            onChange={allCheck}
          />
          모두 동의합니다.
        </label>
        <div className="checkList">
          <label
            for="overFourteen"
            name="만 14세 이상 동의"
            className="necessary"
          >
            <input
              type="checkbox"
              id="overFourteen"
              checked={checks[0]}
              onChange={() => individualCheck(0)}
            />
            [필수] 만 14세 이상입니다.
          </label>
          <label
            for="serviceAgreed"
            name="서비스 이용약관 동의"
            className="necessary"
          >
            <input
              type="checkbox"
              id="serviceAgreed"
              checked={checks[1]}
              onChange={() => individualCheck(1)}
            />
            [필수] 다방 서비스 이용약관 동의
          </label>

          <label for="privateAgreed" name="개인정보 동의" className="necessary">
            <input
              type="checkbox"
              id="privateAgreed"
              checked={checks[2]}
              onChange={() => individualCheck(2)}
            />
            [필수] 개인정보 수집 및 이용 동의
          </label>

          <label
            for="receiveAgreed"
            name="마케팅 수신 동의"
            className="optional"
          >
            <input
              type="checkbox"
              id="receiveAgreed"
              checked={checks[3]}
              onChange={() => individualCheck(3)}
            />
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

        <AgentCheckBox>
          <label for="forAgent" name="중개사 가입">
            <input type="checkbox" id="forAgent" onChange={onChangeAgent} />
            중개인으로 가입하시겠습니까?
          </label>
        </AgentCheckBox>
      </SubDescription>
      <NextButton onClick={clickNext} activeBtnCheck={activeBtnCheck}>
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

const AgentCheckBox = styled.div`
  margin-top: 25px;
  color: #9fb4ff;
  :hover {
    color: #4379fa;
  }
  label:hover {
    cursor: pointer;
  }
  text-align: center;
  font-weight: 700;
  font-size: 13px;
`;

const NextButton = styled.div`
  margin-top: 30px;
  padding: 20px 0;
  color: white;
  background-color: #dfdfdf;
  font-size: 13px;
  font-weight: 900;
  text-align: center;
  :hover {
    cursor: pointer;
  }
  ${({ activeBtnCheck }) => {
    return activeBtnCheck ? `background-color: #4379fa` : null;
  }}
`;
export default CheckForSignUp;
