import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();
  const token = localStorage.getItem('access_token');
  const userType = localStorage.getItem('user_type');

  const Logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user_type');
    window.location.reload();
  };
  return (
    <Wrapper>
      <LogoWrapper onClick={() => navigate('/')}>
        <HeaderLogo src="../images/logo_header.png" />
      </LogoWrapper>
      <MenuWrapper>
        <Link onClick={() => navigate('/search')}>지도</Link>
        {userType === 'agent' ? (
          ''
        ) : (
          <Link onClick={() => navigate('/favorites/recent-room')}>
            관심목록
          </Link>
        )}
        {userType === 'user' ? null : (
          <Link
            onClick={() => {
              !token ? navigate('/login') : navigate('/manage/form');
            }}
          >
            방내놓기
          </Link>
        )}
        {token ? (
          <Button onClick={() => Logout()}>
            <Login>로그아웃</Login>
          </Button>
        ) : (
          <>
            <Button onClick={() => navigate('/login')}>
              <Login>로그인</Login>
            </Button>
            <Button onClick={() => navigate('/signup')}>
              <SignUp>회원가입</SignUp>
            </Button>
          </>
        )}
      </MenuWrapper>
    </Wrapper>
  );
}

export default Header;

const Wrapper = styled.div`
  font-family: 'Spoqa Han Sans', -apple-system, sans-serif;
  width: 100%;
  height: 4.5rem;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid rgb(231, 231, 231);
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
