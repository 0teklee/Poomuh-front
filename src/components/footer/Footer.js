import React from 'react';
import styled from 'styled-components';

function Footer() {
  return (
    <FooterContainer>
      <p>Footer</p>
    </FooterContainer>
  );
}

export default Footer;

const FooterContainer = styled.div`
  background-color: gray;
`;
