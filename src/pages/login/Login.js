import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Header from '../../components/header/Header';
function Login() {
  const navigate = useNavigate();
  const onLogin = () => {
    console.log('requestedUrl', requestedUrl);
    fetch(`http://localhost:8000/${requestedUrl}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then(res => res.json())
      .then(res => {
        console.log(res.accessToken);
        localStorage.setItem('access_token', res.accessToken);
      });
  };

  //중개인 로그인 관리를 위한 상태값
  const [requestedUrl, setRequestedUrl] = useState('users');

  //로그인 처리를 위해 보낼 이메일과 비밀번호
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  //로그인 버튼 활성화 관리를 위한 상태값
  const [activeBtn, setActiveBtn] = useState(false);

  //아이디, 비밀번호 값 관리 useRef
  const idInput = useRef();
  const pwdInput = useRef();

  //email 값 저장
  const onChangeEmail = e => {
    setEmail(e.target.value);
  };

  //password 값 저장
  const onChangePassWord = e => {
    setPassword(e.target.value);
  };

  //버튼 활성화 비활성화
  const sendUserInfo = () => {
    if (idInput.current.value && pwdInput.current.value) {
      setActiveBtn(true);
    } else setActiveBtn(false);
  };

  //중개인 체크 확인하기
  const onClickAgent = e => {
    if (e.target.checked) {
      setRequestedUrl('agents');
    } else setRequestedUrl('users');
    console.log(requestedUrl);
  };

  useEffect(() => {
    sendUserInfo();
  }, [email, password]);

  return (
    <>
      <Header />
      <Wrapper>
        <Heading>로그인</Heading>
        <WelcomeMessage>푸망 서비스 이용을 위해 로그인해주세요.</WelcomeMessage>
        <Inputs>
          <div className="inputWrapper">
            <label htmlFor="email">아이디</label>
            <input
              type="text"
              id="email"
              placeholder="이메일 주소 입력"
              className="inputBox"
              onChange={onChangeEmail}
              ref={idInput}
            />
          </div>

          <div className="inputWrapper">
            <label htmlFor="password">비밀번호</label>
            <input
              type="password"
              id="password"
              placeholder="비밀번호 입력"
              className="inputBox"
              onChange={onChangePassWord}
              ref={pwdInput}
            />
          </div>
          <label htmlFor="remembetId" className="rememberId">
            <input type="checkbox" id="rememberId" />
            아이디 저장
          </label>
        </Inputs>
        <LoginButton onClick={onLogin} activeBtn={activeBtn}>
          <span>로그인</span>
        </LoginButton>
        <AgentCheckBox>
          <label htmlFor="forAgent" name="중개사 가입">
            <input type="checkbox" id="forAgent" onClick={onClickAgent} />
            중개인으로 로그인하기
          </label>
        </AgentCheckBox>
      </Wrapper>
    </>
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
  background-color: #dfdfdf;
  font-size: 13px;
  font-weight: 900;
  text-align: center;
  ${({ activeBtn }) => {
    return activeBtn ? `background-color: #4379fa; cursor:pointer` : null;
  }}
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
export default Login;
