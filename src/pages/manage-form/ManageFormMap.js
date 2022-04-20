import React, { useContext, useEffect, useRef } from 'react';
import { InfoContext } from './context';

function ManageFormMap({ Address = { Lat: 0, Lng: 0 } }) {
  const container = useRef(null); //지도를 담을 영역의 DOM 레퍼런스
  const { kakao } = window;
  // const [address , ]
  let { Lat, Lng } = Address;
  const options = {
    //지도를 생성할 때 필요한 기본 옵션
    center: new kakao.maps.LatLng(Lat, Lng), //지도의 중심좌표.
    level: 3, //지도의 레벨(확대, 축소 정도)
    // draggable: false,
  };
  const marker = new kakao.maps.Marker({
    position: new kakao.maps.LatLng(Lat, Lng),
  });
  const geocoder = new kakao.maps.services.Geocoder();
  geocoder.addressSearch(Address, function (results, status) {
    if (status === kakao.maps.services.Status.OK) {
      const result = results[0];
      Lat = result.y;
      Lng = result.x;
    }
  });
  useEffect(() => {
    const map = new kakao.maps.Map(container.current, options);
    //지도 생성 및 객체 리턴
    marker.setMap(map);
    return () => {};
  }, [InfoAddress]);
  return (
    <>
      <div
        id="mapDiv"
        ref={container}
        style={{ width: '100%', height: '100%' }}
      />
      <button onClick={() => console.log(Lat, Lng)}> porps 테스트 </button>
    </>
  );
}

export default ManageFormMap;
