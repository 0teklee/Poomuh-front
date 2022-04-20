import React, { useEffect, useRef } from 'react';
import { markerdata } from './markerData';
import {}

function Map() {
  useEffect(() => {
    fetch('지도 마커 GET URL', {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        'LatLng': `${CurrentLatLong}`,
      },
    })
      .then(res => res.json)
      .then(data => dispatch({ type: 'GET_MARKERS' }));
  }, []);
  useEffect(() => {
    mapscript();
  }, []);

  const { kakao } = window;
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

    const marker = markerdata.map(el => {
      return new kakao.maps.Marker({
        map: map,
        position: new kakao.maps.LatLng(el.lat, el.lng),
      });
    });

    // const zoomControl = new kakao.maps.ZoomControl();
    // map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);
    // kakao.maps.event.addListener(map, 'zoom_changed', function () {
    //   const level = map.getLevel();
    //   switch (level) {
    //     case 1 || 2:
    //       clusterer.addMarkers(marker);
    //       return;
    //   }
    // });

    clusterer.addMarkers(marker);
  };

  return (
    <div>
      <div id="map" style={{ width: '100vw', height: '100vh' }} />
    </div>
  );
}

export default Map;
