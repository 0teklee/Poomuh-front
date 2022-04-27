import React, { useContext } from 'react';
import styled from 'styled-components';
import { RealEstateContext } from './context';
import ListCard from './ListCard';

function List({ longitude, latitude }) {
  const RealEstate = useContext(RealEstateContext);
  const { kakao } = window;
  const { map } = RealEstate;

  let circle = new kakao.maps.Circle({
    center: new kakao.maps.LatLng(latitude, longitude), // 원의 중심좌표 입니다
    radius: 50, // 미터 단위의 원의 반지름입니다
    strokeWeight: 0, // 선의 두께입니다
    strokeColor: '#E8630A', // 선의 색깔입니다
    strokeOpacity: 1, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
    strokeStyle: 'dashed', // 선의 스타일 입니다
    fillColor: '#E8630A', // 채우기 색깔입니다
    fillOpacity: 0.5, // 채우기 불투명도 입니다
  });

  const mouseOnEstate = () => {
    let position = new kakao.maps.LatLng(latitude, longitude);
    circle.setPosition(position);
    circle.setMap(map);
  };

  const mouseOutEstate = () => {
    circle.setMap(null);
  };

  return (
    <Wrapper>
      <ListWrapper onMouseEnter={mouseOnEstate} onMouseLeave={mouseOutEstate}>
        <CardWrapper>
          <ListWrapper
            onMouseEnter={mouseOnEstate}
            onMouseLeave={mouseOutEstate}
          >
            <CardWrapper>
              {RealEstate.selected.length === 0
                ? RealEstate.realEstate.map(data => (
                    <ListCard key={data.id} data={data} />
                  ))
                : RealEstate.selected.map(data => (
                    <ListCard key={data.id} data={data} />
                  ))}
            </CardWrapper>
          </ListWrapper>
        </CardWrapper>
      </ListWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  margin-top: 45px;
`;
const ListWrapper = styled.div`
  // background-color: yellow;
  // margin-top: 65px;
`;
const CardWrapper = styled.div`
  border: 1px solid transparent;
`;

export default List;
