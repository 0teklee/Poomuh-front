import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { UserInfoContext, UserInfoDispatchContext } from './signupContext';

const Verification = ({ setShow }) => {
  //context.js
  const userInfo = useContext(UserInfoContext);
  const userInfoDispatch = useContext(UserInfoDispatchContext);

  //isAgent의 값에 따라 요청 경로 다르게 해주는 상태값
  const [requestedUrl, setRequestedUrl] = useState('');

  //isAgent가 참이면 agent/signup 요청
  useEffect(() => {
    userInfo.isAgent
      ? setRequestedUrl('agents/signup')
      : setRequestedUrl('users/signup');
  }, [userInfo.isAgent]);

  const onSignup = () => {
    console.log('hi');
    fetch(`http://localhost:8000/${requestedUrl}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        is_agent: userInfo.isAgent,
        email: userInfo.email,
        nickname: userInfo.nickname,
        password: userInfo.password,
        username: userInfo.username,
        phone_number: userInfo.phone_number,
      }),
    })
      .then(res => res.json())
      .then(res => console.log(res));
  };

  //전체 선택 관리할 상태값
  const [totalCheckVerif, setTotalCheckVerif] = useState(false);
  const [checksVerif, setChecksVerif] = useState(Array(4).fill(false));
  const [activeBtnVerif, setActiveBtnVerif] = useState(false);

  //이름 유효성
  const [nameError, setNameError] = useState(false);

  //주민번호 유효성
  const [idNum, setIdNum] = useState('');
  const [secDigit, setSecDigit] = useState('');

  //인증 보여줄 상태값 관리
  const [showVerif, setShowVerif] = useState(false);

  //checkbox 모두 체크하는 함수
  const allCheckVerif = () => {
    setChecksVerif(Array(checksVerif.length).fill(!totalCheckVerif));
    setTotalCheckVerif(!totalCheckVerif);
  };

  const clickNext = () => {
    if (activeBtnVerif) {
      setShow('success');
    }
  };

  // context에서 이름 저장
  const onChangeName = e => {
    const nameRegex = /^[a-zA-Zㄱ-힣][a-zA-Zㄱ-힣 ]{0,10}$/;
    if (!e.target.value || nameRegex.test(e.target.value)) setNameError(false);
    else setNameError(true);
    userInfoDispatch({
      type: 'UPDATE_USERNAME',
      username: e.target.value,
    });
  };

  //context에서 전화번호 저장
  const onChangePhoneNum = e => {
    userInfoDispatch({
      type: 'UPDATE_PHONENUM',
      phoneNum: e.target.value,
    });
  };

  //주민번호 앞자리 저장
  const onChangeIdNum = e => {
    const onlyNumRegex = /^[0-9\b -]{0,13}$/;
    if (onlyNumRegex.test(e.target.value)) {
      setIdNum(e.target.value);
    }
  };

  //주민번호 뒷자리 input 넣었는지 관리
  const onChangeSecDigit = e => {
    const onlyNumRegex = /^[0-9\b -]{0,13}$/;
    if (onlyNumRegex.test(e.target.value)) {
      setSecDigit(e.target.value);
    }
  };

  //전체 버튼이 active 되었는지 확인하는 함수
  const checkAllBtnVerif = () => {
    let result = 0;
    for (let i in checksVerif) {
      checksVerif[i] ? result++ : result--;
    }
    return result;
  };

  //필수 체크박스 눌렸는지 확인하는 함수
  const checkRequiredVerif = () => {
    let result = 0;
    for (let i = 0; i < 3; i++) {
      checksVerif[i] ? result++ : result--;
    }
    return result;
  };

  //체크박스 표시하는 함수
  const singleCheck = index => {
    setChecksVerif(prev => {
      const newArr = [...prev];
      newArr[index] = !newArr[index];
      return newArr;
    });
  };

  //체크 개수를 확인해서 전체 체크가 되면 모두 동의 체크하기
  useEffect(() => {
    let checkAllresult = checkAllBtnVerif();
    checkAllresult === 4 ? setTotalCheckVerif(true) : setTotalCheckVerif(false);
    //체크된 필수 사항 개수 구하기
    let requiredResult = checkRequiredVerif();
    if (requiredResult === 3) {
      setShowVerif(true);
      setActiveBtnVerif(true);
    } else setShowVerif(false);
  }, [checksVerif]);

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
            onChange={onChangeName}
          />
        </div>

        <div className="idNumWrapper">
          <label for="idNum">주민등록번호</label>
          <div className="idNumInputs">
            <input
              type="text"
              maxLength={6}
              id="firstDigits"
              placeholder="주민번호 앞 6자리"
              className="inputBox"
              onChange={onChangeIdNum}
              value={idNum}
            />
            <span className="hyphen" />
            <input
              type="text"
              maxLength={1}
              id="secondDigits"
              className="inputBox secondDigits"
              onChange={onChangeSecDigit}
              value={secDigit}
            />
            <span>●●●●●●</span>
          </div>
        </div>
      </Inputs>
      <CheckBoxes>
        <label for="selectAllVerif" name="모두 동의" className="selectAll">
          <input
            type="checkbox"
            id="selectAllVerif"
            checked={totalCheckVerif}
            onChange={allCheckVerif}
          />
          모두 동의합니다.
        </label>
        <div className="checkList">
          <label
            for="overFourteenVerif"
            name="만 14세 이상 동의"
            className="necessary"
          >
            <input
              type="checkbox"
              id="overFourteenVerif"
              checked={checksVerif[0]}
              onChange={() => singleCheck(0)}
            />
            [필수] 개인정보 수집 및 이용 동의
          </label>
          <label
            for="serviceAgreedVerif"
            name="서비스 이용약관 동의"
            className="necessary"
          >
            <input
              type="checkbox"
              id="serviceAgreedVerif"
              checked={checksVerif[1]}
              onChange={() => singleCheck(1)}
            />
            [필수] 다방 서비스 이용약관 동의
          </label>

          <label
            for="privateAgreedVerif"
            name="개인정보 동의"
            className="necessary"
          >
            <input
              type="checkbox"
              id="privateAgreedVerif"
              checked={checksVerif[2]}
              onChange={() => singleCheck(2)}
            />
            [필수] 개인정보 수집 및 이용 동의
          </label>

          <label
            for="receiveAgreedVerif"
            name="마케팅 수신 동의"
            className="optional"
          >
            <input
              type="checkbox"
              id="receiveAgreedVerif"
              checked={checksVerif[3]}
              onChange={() => singleCheck(3)}
            />
            [선택] 마케팅 정보 수신에 대한 동의
          </label>
        </div>
      </CheckBoxes>
      <Inputs>
        <InputContainer showVerif={showVerif}>
          <div className="inputWrapper">
            <label for="mobileCarrier">통신사</label>
            <select
              name="통신사 선택"
              id="mobileCarrier"
              className="selectMobile"
            >
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
                className="inputBox authBox"
                onChange={onChangePhoneNum}
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
                className="inputBox authBox"
              />
              <AuthButton>인증번호 확인</AuthButton>
            </div>
          </div>
        </InputContainer>
      </Inputs>
      <SuccessButton
        onClick={() => {
          clickNext();
          onSignup();
        }}
        activeBtnVerif={activeBtnVerif}
      >
        <span>회원가입 완료</span>
      </SuccessButton>
      <LaterButton
        onClick={() => {
          clickNext();
          onSignup();
        }}
      >
        본인인증 다음에 할래요
      </LaterButton>
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
  .selectMobile {
    margin-top: 10px;
    padding: 10px;
    border: 1px solid #f2f2f2;
    border-radius: 3px;
  }

  .inputBox {
    padding: 10px;
    margin-top: 10px;
    border: 1px solid #f2f2f2;
    border-radius: 3px;
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
  .authWrapper {
    .authBox {
      width: 75%;
    }
  }
`;

const InputContainer = styled.div`
  ${({ showVerif }) => {
    return !showVerif ? `display: none` : null;
  }}
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
  width: 35%;
  padding: 12px;
  margin-left: 5px;
  color: white;
  background-color: #dfdfdf;
  border-radius: 3px;
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
  ${({ activeBtnVerif }) => {
    return activeBtnVerif ? `background-color: #4379fa; cursor:pointer` : null;
  }}
`;

const LaterButton = styled.div`
  margin-top: 15px;
  text-align: center;
  font-size: 11px;
  font-weight: 800;
  cursor: pointer;
`;

export default Verification;
