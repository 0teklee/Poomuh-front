import React, { useEffect, useRef } from 'react';
function ManageFormMap({ Address = { Lat: 0, Lng: 0 } }) {
  // const container = useRef(null); //지도를 담을 영역의 DOM 레퍼런스
  const container = document.getElementById('id');
  const { kakao } = window;
  const { Lat, Lng } = Address;
  const options = {
    //지도를 생성할 때 필요한 기본 옵션
    center: new kakao.maps.LatLng(Lat, Lng), //지도의 중심좌표.
    level: 3, //지도의 레벨(확대, 축소 정도)
    draggable: false,
  };
  // useEffect(() => {
  //   new kakao.maps.Map(container.current, options); //지도 생성 및 객체 리턴
  //   return () => {};
  // }, []);
  const map = new kakao.maps.Map(container, options);
  const geocoder = new kakao.maps.services.Geocoder();
  const marker = new kakao.maps.Marker({
    position: new kakao.maps.LatLng(Lat, Lng),
    map: container,
  });

  return <div id="map" style={{ width: '100%', height: '100%' }} />;
}

export default ManageFormMap;
