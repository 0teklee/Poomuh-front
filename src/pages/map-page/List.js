import React, { useContext, useRef } from 'react';
import { useCallback } from 'react';
import styled from 'styled-components';
import { RealEstateContext } from './context';
import ListCard from './ListCard';

function List() {
  const RealEstate = useContext(RealEstateContext);
  const { kakao } = window;
  const { map } = RealEstate;

  let circle = useRef(
    new kakao.maps.Circle({
      center: new kakao.maps.LatLng(0, 0), // 원의 중심좌표 입니다
      radius: 50, // 미터 단위의 원의 반지름입니다
      strokeWeight: 0, // 선의 두께입니다
      strokeColor: '#E8630A', // 선의 색깔입니다
      strokeOpacity: 1, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
      strokeStyle: 'dashed', // 선의 스타일 입니다
      fillColor: '#E8630A', // 채우기 색깔입니다
      fillOpacity: 0.5, // 채우기 불투명도 입니다
    })
  );

  const mouseOnEstate = useCallback(
    (latitude, longitude) => {
      let position = new kakao.maps.LatLng(latitude, longitude);
      circle.current.setPosition(position);
      circle.current.setMap(map);
    },
    [kakao.maps.LatLng, map]
  );

  const mouseOutEstate = () => {
    circle.current.setMap(null);
  };

  return (
    <ListWrapper>
      <CardWrapper>
        {RealEstate.selected.length === 0
          ? RealEstate.realEstate.map(data => (
              <div
                key={data.id}
                onMouseEnter={() => {
                  mouseOnEstate(data.latitude, data.longitude);
                }}
                onMouseLeave={() => mouseOutEstate()}
              >
                <ListCard data={data} />
              </div>
            ))
          : RealEstate.selected.map(data => (
              <div
                key={data.id}
                onMouseEnter={() => {
                  mouseOnEstate(data.latitude, data.longitude);
                }}
                onMouseLeave={() => mouseOutEstate()}
              >
                <ListCard data={data} />
              </div>
            ))}
      </CardWrapper>
    </ListWrapper>
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
