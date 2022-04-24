import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

function ManageForm({ select }) {
  return (
    <ComponentNav>
      <FormLink to="/manage/form" select={select}>
        <ComponentButton>방내놓기</ComponentButton>
      </FormLink>
      <ListLink to="/manage/list" select={select}>
        <ComponentButton>내 방관리</ComponentButton>
      </ListLink>
    </ComponentNav>
  );
}

const ComponentNav = styled.ul`
  display: flex;
  flex: 0 0 auto;
  justify-content: center;
  align-items: center;
  height: 48px;
  margin: 0px auto;
`;
const ComponentButton = styled.li`
  all: unset;
  flex-grow: 1;
`;
const FormLink = styled(Link)`
  all: unset;
  display: block;
  width: 100%;
  padding-bottom: 1rem;
  text-align: center;
  font-weight: ${props => (props.select === 'form' ? '700' : '')};
  color: ${props => (props.select === 'form' ? '#000' : 'rgb(232, 232, 232)')};
  border-bottom: 1px solid
    ${props => (props.select === 'form' ? '#000' : 'rgb(232, 232, 232)')};
  cursor: pointer;
`;

const ListLink = styled(Link)`
  all: unset;
  display: block;
  width: 100%;
  padding-bottom: 1rem;
  text-align: center;
  font-weight: ${props => (props.select === 'list' ? '700' : '')};
  color: ${props => (props.select === 'list' ? '#000' : 'rgb(232, 232, 232)')};
  border-bottom: 1px solid
    ${props => (props.select === 'list' ? '#000' : 'rgb(232, 232, 232)')};
  cursor: pointer;
`;

export default ManageForm;
