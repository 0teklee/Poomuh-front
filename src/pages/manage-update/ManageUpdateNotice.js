import React from 'react';
import styled from 'styled-components';

function ManageFormNotice() {
  return (
    <Wrapper>
      <Item>
        <Text>전/월세 매물만 등록할 수 있습니다.</Text>
        <Text>매매는 미구현 상태입니다</Text>
        <Text>등록된 모든 매물은 내 방 관리에서 확인 가능합니다.</Text>
      </Item>
      <Item>
        <Text>등록한 매물은 30일 간 노출됩니다.</Text>
      </Item>
    </Wrapper>
  );
}

const Wrapper = styled.ul`
  margin-top: 30px;
  margin-bottom: 31px;
  padding: 21px 35px;
  border-radius: 4px;
  border: 1px solid rgb(226, 226, 226);
`;
const Item = styled.li`
  list-style-type: disc;
  margin-top: 3px;
  line-height: 24px;
  font-size: 15px;
  color: rgb(102, 102, 102);
`;
const Text = styled.p``;

export default ManageFormNotice;
