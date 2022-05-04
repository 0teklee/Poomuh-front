import React, { useContext, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { InfoContext, InfoDispatchContext } from './context';

function ManageFormDetail() {
  const InfoDispatch = useContext(InfoDispatchContext);
  const Info = useContext(InfoContext);
  const detailTitleRef = useRef('');
  const detailContentRef = useRef('');

  const handleTitle = e => {
    InfoDispatch({ type: 'UPDATE_DETAIL_TITLE', detail_title: e.target.value });
  };
  const handleContent = e => {
    InfoDispatch({
      type: 'UPDATE_DETAIL_CONTENT',
      detail_content: e.target.value,
    });
  };

  useEffect(() => {
    if (detailTitleRef.current && detailContentRef.current) {
      detailTitleRef.current.value = Info.description_title;
      detailContentRef.current.value = Info.description_detail;
    }
  }, []);
  return (
    <Wrapper>
      <Title>상세정보</Title>
      <RowWrapper>
        <RowHead>제목</RowHead>
        <RowContent>
          <input
            className="title"
            placeholder="예 ) 신논현역 도보 5분거리, 혼자 살기 좋은 방입니다."
            onChange={handleTitle}
            maxLength={50}
            ref={detailTitleRef}
          />
        </RowContent>
      </RowWrapper>
      <RowWrapper>
        <RowHead>상세 설명</RowHead>
        <RowContent>
          <textarea
            className="description"
            placeholder="[상세설명 작성 주의사항]
            - 매물 정보와 관련없는 홍보성 정보는 입력할 수 없습니다.
            - 매물등록규정에 위반되는 금칙어는 입력할 수 없습니다.
            위 주의사항 위반시 임의로 매물 삭제 혹은 서비스 이용이 제한될 수 있습니다."
            onChange={handleContent}
            ref={detailContentRef}
          />
        </RowContent>
      </RowWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  width: 100%;
  margin-bottom: 50px;
  border-radius: 4px;
  box-shadow: rgb(0 0 0 / 5%) 0px 1px 5px 0px;
  border: 1px solid rgb(226, 226, 226);
  background-color: rgb(255, 255, 255);
  overflow: hidden;
`;
const Title = styled.h1`
  padding: 1rem;
  border-bottom: 1px solid rgb(226, 226, 226);
  font-size: 1.2rem;
  font-weight: 700;
  text-align: center;
`;

const RowHead = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 11%;
  padding: 2rem;
  text-align: center;
  font-weight: 700;
  background: #fdfdfd;
  border-right: 1px solid rgb(226, 226, 226);
  border-bottom: 1px solid rgb(226, 226, 226);
  &:last-child {
    border-bottom: 0px solid #fff;
  }
`;
const RowContent = styled.div`
  flex: 1;
  width: 80%;
  padding: 20px;
  border-bottom: 1px solid rgb(226, 226, 226);
  textarea,
  input {
    width: -webkit-fill-available;
    border: 1px solid rgb(226, 226, 226);
    color: rgb(76, 76, 76);
    font-size: 14px;
    &::placeholder {
      line-height: 2;
      color: #888888;
    }
    resize: none;
  }
  textarea:focus,
  input:focus {
    outline: none;
    border: 1px solid rgb(50, 108, 249);
  }
  .title {
    height: 46px;
    padding: 0px 16px;
    line-height: 46px;
  }
  .description {
    height: 230px;
    padding: 12px 16px;
  }
`;

const RowWrapper = styled.div`
  display: flex;
  &:last-child {
    ${RowHead}, ${RowContent} {
      border-bottom: none;
    }
  }
`;

export default ManageFormDetail;
