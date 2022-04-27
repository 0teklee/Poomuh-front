import React, { useContext } from 'react';
import styled from 'styled-components';
import { RealEstateContext } from './context';
import ListCard from './ListCard';

function List() {
  const RealEstate = useContext(RealEstateContext);
  const { kakao } = window;
  const { map } = RealEstate;

  let circle = new kakao.maps.Circle({
    center: new kakao.maps.LatLng(0, 0), // 원의 중심좌표 입니다
    radius: 50, // 미터 단위의 원의 반지름입니다
    strokeWeight: 0, // 선의 두께입니다
    strokeColor: '#E8630A', // 선의 색깔입니다
    strokeOpacity: 1, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
    strokeStyle: 'dashed', // 선의 스타일 입니다
    fillColor: '#E8630A', // 채우기 색깔입니다
    fillOpacity: 0.5, // 채우기 불투명도 입니다
  });

  const mouseOnEstate = (latitude, longitude) => {
    let position = new kakao.maps.LatLng(latitude, longitude);
    circle.setPosition(position);
    circle.setMap(map);
  };

  const mouseOutEstate = () => {
    circle.setMap(null);
  };

  return (
    // <Wrapper>
    <ListWrapper>
      <CardWrapper>
        {RealEstate.selected.length === 0
          ? RealEstate.realEstate.map(data => (
              <div
                onMouseEnter={() => {
                  mouseOnEstate(data.latitude, data.longitude);
                }}
                onMouseLeave={() => mouseOutEstate()}
                key={data.id}
              >
                <ListCard
                  data={data}
                  onMouseEnter={mouseOnEstate}
                  onMouseLeave={mouseOutEstate}
                />
              </div>
            ))
          : RealEstate.selected.map(data => (
              <div
                onMouseEnter={() => {
                  mouseOnEstate(data.latitude, data.longitude);
                }}
                onMouseLeave={() => mouseOutEstate()}
                key={data.id}
              >
                <ListCard
                  data={data}
                  onMouseEnter={mouseOnEstate}
                  onMouseLeave={mouseOutEstate}
                />
              </div>
            ))}
      </CardWrapper>
    </ListWrapper>
    // </Wrapper>
  );
}

const Wrapper = styled.div``;

const ListWrapper = styled.div`
  margin-top: 65px;
  // background-color: yellow;
  // margin-top: 65px;
`;
const CardWrapper = styled.div`
  border: 1px solid transparent;
  position: relative;

  // background-color: yellow;
`;

export default List;
