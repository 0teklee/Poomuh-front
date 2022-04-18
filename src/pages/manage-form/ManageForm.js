import React from 'react';
import styled from 'styled-components';
// import Header from '../../components/header/Header';

function ManageForm() {
  return (
    <Wrapper>
      {/* <Header /> */}
      <Title>방내놓기</Title>
    </Wrapper>
  );
}

const Wrapper = styled.section``;
const Title = styled.h1`
  font-size: 2rem;
  text-align: center;
`;
export default ManageForm;
