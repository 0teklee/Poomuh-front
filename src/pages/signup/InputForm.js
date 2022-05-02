import React, { useContext, useRef, useState } from 'react';
import { useEffect } from 'react';
import styled from 'styled-components';
import { UserInfoContext, UserInfoDispatchContext } from './signupContext';

const InputhtmlForm = ({ setShow }) => {
  //context 사용
  const userInfo = useContext(UserInfoContext);
  const userInfoDispatch = useContext(UserInfoDispatchContext);

  const [emailError, setEmailError] = useState(false);

  const [nicknameError, setNickNameError] = useState(false);

  const [pwdhtmlForCheck, SetPwdhtmlForCheck] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [passwordCheckError, setPasswordCheckError] = useState(false);

  //버튼 활성화 값 관리
  const [activeBtnInput, setActiveBtnInput] = useState(false);

  //비밀번호 값 관리 useRef
  const passwordCheckInput = useRef();
  const passwordInput = useRef();

  //이메일
  const email = userInfo.email;
  //닉네임
  const nickname = userInfo.nickname;

  //input값이 모두 들어있는지 확인하는 함수
  const isFilledAll = () => {
    if (
      email &&
      nickname &&
      pwdhtmlForCheck &&
      !emailError &&
      !nicknameError &&
      !passwordError &&
      !passwordCheckError
    ) {
      setActiveBtnInput(true);
    } else {
      setActiveBtnInput(false);
    }
  };

  //input값 바뀔 때 마다 확인하기
  useEffect(() => {
    isFilledAll();
  }, [email, nickname, pwdhtmlForCheck]);

  //다음 버튼으로 넘어가는 함수
  const clickNext = () => {
    if (activeBtnInput) {
      setShow('verif');
    }
  };

  //이메일 유효성 검사 및 값 담기
  const onChangeEmail = e => {
    const emailRegex =
      /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
    if (!e.target.value || emailRegex.test(e.target.value))
      setEmailError(false);
    else setEmailError(true);
    userInfoDispatch({
      type: 'UPDATE_EMAIL',
      email: e.target.value,
    });
  };

  //닉네임 유효성 검사 및 값 담기
  const onChangeNickName = e => {
    const nicknameRegex = /^[a-zA-Zㄱ-힣][a-zA-Zㄱ-힣 ]{0,10}$/;
    if (!e.target.value || nicknameRegex.test(e.target.value))
      setNickNameError(false);
    else setNickNameError(true);
    userInfoDispatch({
      type: 'UPDATE_NICKNAME',
      nickname: e.target.value,
    });
  };

  //비밀번호 유효성 검사 및 값 담기
  const onChangePassword = e => {
    const passwordRegex = /(?=.*[a-zA-Z]{2,20}).{8,20}$/;
    if (!e.target.value || passwordRegex.test(e.target.value))
      setPasswordError(false);
    else setPasswordError(true);
  };

  //비밀번호 확인 검사
  const checkPassword = e => {
    let result =
      passwordInput.current.value === passwordCheckInput.current.value;
    if (
      !passwordCheckInput.current.value ||
      passwordInput.current.value === passwordCheckInput.current.value
    ) {
      setPasswordCheckError(false);
    } else setPasswordCheckError(true);
    SetPwdhtmlForCheck(e.target.value);
  };

  //비밀번호 값 담기
  const setPassword = e => {
    if (!passwordCheckError) {
      userInfoDispatch({
        type: 'UPDATE_PASSWORD',
        password: e.target.value,
      });
    }
  };

  return (
    <Wrapper>
      <Heading>회원정보 입력</Heading>
      <WelcomeMessage>
        다방 서비스 이용을 위해 아래 정보를 입력해주세요.
      </WelcomeMessage>
      <Inputs>
        <div className="inputWrapper">
          <label htmlFor="email">아이디</label>
          <input
            type="text"
            id="email"
            placeholder="이메일 주소 입력"
            className="inputBox"
            onChange={onChangeEmail}
          />
          {emailError && (
            <div class="checkValid">이메일 형식을 확인해주세요.</div>
          )}
        </div>

        <div className="inputWrapper">
          <label htmlFor="nickname">닉네임</label>
          <input
            type="text"
            id="nickname"
            placeholder="한글 또는 영문만 가능"
            className="inputBox"
            onChange={onChangeNickName}
          />
          {nicknameError && (
            <div class="checkValid">닉네임 형식을 지켜주세요</div>
          )}
        </div>

        <div className="inputWrapper">
          <label htmlFor="password">비밀번호</label>
          <input
            type="password"
            id="password"
            placeholder=" 8자리 이상 영문,숫자,특수문자 포함"
            className="inputBox"
            name="password"
            ref={passwordInput}
            onChange={onChangePassword}
          />
          {passwordError && (
            <div className="checkValid">
              비밀번호는 문자,숫자,특수문자를 포함하여 8~20자 이내로 입력하세요.
            </div>
          )}
          <input
            type="password"
            id="checkedPassword"
            placeholder="비밀번호 확인"
            className="inputBox"
            name="passwordCheck"
            ref={passwordCheckInput}
            onChange={e => {
              setPassword(e);
              checkPassword(e);
            }}
          />
          {passwordCheckError && (
            <div class="checkValid">비밀번호가 일치하지 않습니다.</div>
          )}
        </div>
      </Inputs>
      <NextButton onClick={clickNext} activeBtnInput={activeBtnInput}>
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
  .checkValid {
    margin-top: 10px;
    color: #e41732;
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
  border-radius: 2px;
  transition: 0.15s;
  ${({ activeBtnInput }) => {
    return activeBtnInput
      ? `background-color: #4379fa; cursor:pointer;      
      :hover {
      background-color: #0039bf;
    }`
      : null;
  }};
`;

export default InputhtmlForm;
