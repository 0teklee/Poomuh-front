import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

function NavBar({ select }) {
  return (
    <NavWrapper>
      <NavRecent to="/favorite/recent-room" select={select}>
        <Button>최근 본 방</Button>
      </NavRecent>
      <NavPreempt to="/favorite/preempt-room" select={select}>
        <Button>찜한 방</Button>
      </NavPreempt>
    </NavWrapper>
  );
}

const NavWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 48px;
  margin: 0px auto;
`;
const Button = styled.button`
  all: unset;
  flex-grow: 1;
`;
const NavRecent = styled(Link)`
  all: unset;
  display: block;
  width: 100%;
  padding-bottom: 1rem;
  text-align: center;
  font-weight: ${props => (props.select === 'recent' ? '400' : '500')};
  color: ${props =>
    props.select === 'recent' ? '#000' : 'rgb(202, 202, 202)'};
  border-bottom: ${props => (props.select === 'recent' ? '2px' : '1px')} solid
    ${props => (props.select === 'recent' ? '#000' : 'rgb(202, 202, 202)')};
  cursor: pointer;
`;
const NavPreempt = styled(Link)`
  all: unset;
  display: block;
  width: 100%;
  padding-bottom: 1rem;
  text-align: center;
  font-weight: ${props => (props.select === 'preempt' ? '400' : '500')};
  color: ${props =>
    props.select === 'preempt' ? '#000' : 'rgb(202, 202, 202)'};
  border-bottom: ${props => (props.select === 'preempt' ? '2px' : '1px')} solid
    ${props => (props.select === 'preempt' ? '#000' : 'rgb(202, 202, 202)')};

  cursor: pointer;
`;

export default NavBar;
