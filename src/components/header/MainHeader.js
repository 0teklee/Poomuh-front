import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';

function Header() {
  // const [name, setName] = useState('');
  const navigate = useNavigate();
  // const params = useParams();

  // console.log(params);

  return (
    <Wrapper>
      <LogoWrapper onClick={() => navigate('/')}>
        <HeaderLogo src="images/logo_main_header.png" />
      </LogoWrapper>
      <MenuWrapper>
        <Link onClick={() => navigate('/search')}>지도</Link>
        <Link onClick={() => navigate('/favorite')}>관심목록</Link>
        <Link onClick={() => navigate('/manage/form')}>방내놓기</Link>
        <Button onClick={() => navigate('/login')}>
          <Login>로그인</Login>
        </Button>
        <Button onClick={() => navigate('/signup')}>
          <SignUp>회원가입</SignUp>
        </Button>
      </MenuWrapper>
    </Wrapper>
  );
}

export default Header;

const Wrapper = styled.div`
  width: 100%;
  height: 9rem;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid rgb(231, 231, 231);
  background-color: #326ce9;
`;
const LogoWrapper = styled.div`
  width: 4.5rem;
  height: 100%;
  margin-left: 1rem;
  :hover {
    cursor: pointer;
  }
`;
const HeaderLogo = styled.img`
  width: 100%;
  margin-top: 0.8rem;
`;
const MenuWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: auto 0;
  width: 80%;
`;
const Link = styled.p`
  margin: auto 1.5rem;
  :hover {
    color: #326cf9;
    cursor: pointer;
  }
`;
const Button = styled.button`
  margin-right: 1rem;
  padding: 0.5rem;
  border: 1px solid rgb(231, 231, 231);
  border-radius: 3px;
  background-color: white;
  font-weight: bold;
  :hover {
    cursor: pointer;
    background-color: #fafafa;
  }
`;
const Login = styled.p`
  width: 5rem;
`;
const SignUp = styled.p`
  width: 5rem;
`;
