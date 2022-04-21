import React, { useEffect, useRef, useContext } from 'react';
import { markerdata } from './markerData';
import { RealEstateContext, RealEstateContextDispatch } from './context';

function Map() {
  const RealEstate = useContext(RealEstateContext);
  const RealEstateDispatch = useContext(RealEstateContextDispatch);
  const { kakao } = window;
  let container = document.getElementById('map');
  let options = {
    center: new kakao.maps.LatLng(37.624915253753194, 127.15122688059974), //지도의 중심좌표.
    level: 7, //지도의 레벨(확대, 축소 정도)
  };

  // 지도의 좌표 범위를 보내는 fetch 함수
  const sendBounds = coords => {
    console.log(coords);
    // fetch('범위 내의 매물 GET URL', {
    //   method: 'GET',
    //   headers: {
    //     'Content-type': 'application/json',
    //   },
    //   body: {
    //     LatLng: `${coords}`,
    //   },
    // })
    //   .then(res => res.json)
    //   .then(data => MarkerDispatch({ type: 'GET_MARKERS', getMarkers: data }));
  };

  // 바뀐 좌표 범위 내부의 매물을 받아오는 fetch함수
  useEffect(() => {
    fetch('백엔드에서 좌표 범위 내의 매물을 요청하는 URI', { method: 'GET' })
      .then(res => res.json())
      .then(data =>
        RealEstateDispatch({ type: 'GET_REAL_ESTATE', realEstate: data })
      )
      .then(
        RealEstate.realEstate.map(el => {
          return new kakao.maps.Marker({
            position: new kakao.maps.LatLng(el.lat, el.lng),
          });
        })
      );
  }, [RealEstate.mapBounds]);

  useEffect(() => {
    sendBounds(RealEstate.mapBounds);
  }, [RealEstate.mapBounds]);

  useEffect(() => {
    mapscript();
  }, []);

  const mapscript = () => {
    let container = document.getElementById('map');
    let options = {
      center: new kakao.maps.LatLng(37.624915253753194, 127.15122688059974), //지도의 중심좌표.
      level: 7, //지도의 레벨(확대, 축소 정도)
    };
    const map = new kakao.maps.Map(container, options);
    const clusterer = new kakao.maps.MarkerClusterer({
      map: map,
      averageCenter: true,
      minLevel: 2,
      minClusterSize: 1,
    });

    // markerdata == Mock Data
    // const marker = RealEstate.map(el => {
    const marker = markerdata.map(el => {
      return new kakao.maps.Marker({
        map: map,
        position: new kakao.maps.LatLng(el.lat, el.lng),
      });
    });

    clusterer.addMarkers(marker);
    kakao.maps.event.addListener(map, 'zoom_changed', () => {
      const bounds = map.getBounds();
      RealEstateDispatch({ type: 'GET_BOUNDS', getBounds: bounds });
    });
    kakao.maps.event.addListener(map, 'dragend', () => {
      const bounds = map.getBounds();
      RealEstateDispatch({ type: 'GET_BOUNDS', getBounds: bounds });
    });
    kakao.maps.addListener(map, , () => {
      map.setMarkerPosition()
    })
  };
  return (
    <div>
      <div id="map" style={{ width: '100vw', height: '100vh' }} />
    </div>
  );
}

export default Map;
