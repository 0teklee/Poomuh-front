import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

function MainHeader() {
  const navigate = useNavigate();

  return (
    <Wrapper>
      <Header>
        <LogoWrapper onClick={() => navigate('/')}>
          <HeaderLogo src="images/logo_main_header.png" />
        </LogoWrapper>
        <MenuWrapper>
          <Link onClick={() => navigate('/search')}>지도</Link>
          <Link onClick={() => navigate('/favorites/recent-room')}>
            관심목록
          </Link>
          <Link onClick={() => navigate('/manage/form')}>방내놓기</Link>
          <Button onClick={() => navigate('/login')}>
            <Login>로그인</Login>
          </Button>
          <Button onClick={() => navigate('/signup')}>
            <SignUp>회원가입</SignUp>
          </Button>
        </MenuWrapper>
      </Header>
      <Search>
        <Title>어떤 방을 찾으세요?</Title>
        <NavigateWrapper>
          <SearchRoom>원룸</SearchRoom>
          <SearchRoom>오피스텔</SearchRoom>
          <SearchRoom>아파트</SearchRoom>
        </NavigateWrapper>
      </Search>
    </Wrapper>
  );
}

export default MainHeader;

const Wrapper = styled.div`
  font-family: 'Spoqa Han Sans', -apple-system, sans-serif;
  height: 60vh;
  background-image: linear-gradient(
    134deg,
    rgb(19, 183, 207) -5%,
    rgb(54, 91, 180) 56%,
    rgb(54, 91, 180) 56%
  );
`;
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
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
  color: white;
`;
const Link = styled.p`
  margin: auto 1.5rem;
  color: white;
  :hover {
    font-weight: bold;
    cursor: pointer;
  }
`;
const Button = styled.button`
  margin-right: 1rem;
  padding: 0.5rem;
  border: 1px solid rgb(231, 231, 231);
  border-radius: 3px;
  background-color: transparent;
  font-weight: bold;
  color: white;
  transition: 0.3s;
  :hover {
    cursor: pointer;
    background-color: #5285ff;
  }
`;
const Login = styled.p`
  width: 5rem;
`;
const SignUp = styled.p`
  width: 5rem;
`;

const Search = styled.div`
  margin: 8rem 3rem;
`;
const Title = styled.h1`
  font-size: 2.5rem;
  color: white;
`;
const NavigateWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  padding-top: 2rem;
`;
const SearchRoom = styled.p`
  color: white;
  font-size: 1.2rem;
  margin-right: 3rem;
  padding-bottom: 0.3rem;
  border-bottom: 2px solid white;
  :hover {
    font-weight: bold;
    cursor: pointer;
  }
`;
