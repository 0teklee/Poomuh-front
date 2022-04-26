import React, { useEffect, useRef, useContext, useMemo } from 'react';
import { markerdata } from './markerData';
import { RealEstateContext, RealEstateContextDispatch } from './context';

function Map() {
  const RealEstate = useContext(RealEstateContext);
  const RealEstateDispatch = useContext(RealEstateContextDispatch);
  const { kakao } = window;
  const mapContainer = useRef('');
  // 지도 객체, 클러스터러를 담을 ref
  const mapDOM = useRef('');
  const clustererDOM = useRef('');
  const markerDOM = useRef('');
  const kakaoMap = mapDOM.current;
  const kakaoClusterer = clustererDOM.current;
  // 첫 마운트시 1번만 지도를 렌더링하고, useRef에 지도와 클러스터러 객체를 저장.
  useEffect(() => {
    mapDOM.current = mapscript();
  }, []);

  // 지도의 좌표 범위를 보내고, 범위 내의 매물을 Context에 받는 fetch 함수
  const sendBoundGetItem = () => {
    // fetch('백엔드에서 좌표 범위 내의 매물을 요청하는 URI로 변경', {
    fetch('data/realEstate.json', {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        LatLng: `${RealEstate.mapBounds}`,
      },
    })
      .then(res => res.json())
      // 에러 핸들링 추후에 수정
      .catch(err => {
        RealEstateDispatch({ type: 'GET_REAL_ESTATE', realEstate: [] });
      })
      .then(data => {
        // 해당 범위 내의 존재하는 매물이 없다면
        // 백엔드 상에서 realEstate에 빈 배열을 보내주도록 할 것.
        if (
          Object.values(RealEstate.roomTypeFilter).filter(
            filter => filter.isOn === true
          ).length < 4
        ) {
          const filteredData = data.filter(estate =>
            Object.values(RealEstate.roomTypeFilter).find(
              filter => filter.roomType === estate.roomType && filter.isOn
            )
          );
          RealEstateDispatch({
            type: 'GET_REAL_ESTATE',
            realEstate: filteredData,
          });
          return;
        } else {
          RealEstateDispatch({ type: 'GET_REAL_ESTATE', realEstate: data });
        }
      });
  };

  // 지도의 범위가 바뀔 때마다 fetch함수가 실행, Context에 범위 내 매물 저장
  useEffect(() => {
    sendBoundGetItem();
  }, [RealEstate.mapBounds, RealEstate.roomTypeFilter]);

  // 현재 좌표 범위 내의 매물들이 로드 되고 난 후, 클러스터만 다시 렌더링

  useEffect(() => {
    if (kakaoClusterer) {
      kakaoClusterer.clear();
    }
    const clusterStyle = RealEstate.clustererStyle;

    if (kakaoMap) {
      const marker = RealEstate.realEstate.map(el => {
        return new kakao.maps.Marker({
          map: kakaoMap,
          position: new kakao.maps.LatLng(el.latitude, el.longitude),
        });
      });

      const clusterer = new kakao.maps.MarkerClusterer({
        map: kakaoMap,
        averageCenter: true,
        minLevel: 1,
        minClusterSize: 1,
        disableClickZoom: true,
        gridSize: 200,
        styles: clusterStyle,
      });
      clusterer.addMarkers(marker);

      kakao.maps.event.addListener(clusterer, 'clusterover', cluster => {
        const overlay = cluster.getClusterMarker().getContent();
        overlay.style.background = '#fff';
        overlay.style.color = 'rgb(50, 106, 249)';
      });
      kakao.maps.event.addListener(clusterer, 'clusterout', cluster => {
        const overlay = cluster.getClusterMarker().getContent();
        overlay.style.background = 'rgba(50, 106, 249, 0.8)';
        overlay.style.color = '#fff';
      });
      kakao.maps.event.addListener(clusterer, 'clusterclick', cluster => {
        RealEstateDispatch({
          type: 'GET_SELECTED_ESTATE',
          selected: RealEstate.realEstate.filter(estate => {
            return cluster
              .getMarkers()
              .map(x => x.getPosition())
              .find(
                qa =>
                  estate.latitude.toFixed(12) === qa.Ma.toFixed(12) &&
                  estate.longitude.toFixed(12) === qa.La.toFixed(12)
              );
          }),
        });
      });
      clustererDOM.current = clusterer;
      RealEstateDispatch({ type: 'UPDATE_CLUSTERER', clusterer: clusterer });
      markerDOM.current = marker;
      RealEstateDispatch({ type: 'UPDATE_MARKER', marker: marker });
    }
  }, [RealEstate.realEstate]);

  const mapscript = () => {
    let container = mapContainer.current;
    let options = {
      center: new kakao.maps.LatLng(37.624915253753194, 127.15122688059974),
      level: 4,
      maxLevel: 7,
    };
    const map = new kakao.maps.Map(container, options);

    const zoomControl = new kakao.maps.ZoomControl();
    map.addControl(zoomControl, kakao.maps.ControlPosition.BOTTOMRIGHT);

    kakao.maps.event.addListener(map, 'zoom_changed', () => {
      RealEstateDispatch({ type: 'GET_BOUNDS', getBounds: map.getBounds() });
    });
    kakao.maps.event.addListener(map, 'dragend', () => {
      RealEstateDispatch({ type: 'GET_BOUNDS', getBounds: map.getBounds() });
    });
    RealEstateDispatch({ type: 'UPDATE_MAP', map: map });
    return map;
  };
  return (
    <div>
      <div
        id="map"
        ref={mapContainer}
        style={{ width: '100%', height: '90vh' }}
      />
    </div>
  );
}

export default Map;
