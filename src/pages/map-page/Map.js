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
  const kakaoMap = mapDOM.current;
  const kakaoClusterer = clustererDOM.current;
  // 첫 마운트시 1번만 지도를 렌더링하고, useRef에 지도와 클러스터러 객체를 저장.
  useEffect(() => {
    mapDOM.current = mapscript();
  }, []);

  // 지도의 좌표 범위를 보내고, 범위 내의 매물을 Context에 받는 fetch 함수
  const sendBoundGetItem = () => {
    // fetch('백엔드에서 좌표 범위 내의 매물을 요청하는 URI로 변경', {
    fetch('data/list.json', {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        LatLng: `${RealEstate.mapBounds}`,
      },
    })
      .then(res => res.json())
      // 에러 핸들링 추후에 수정
      .catch(() => {
        RealEstateDispatch({ type: 'GET_REAL_ESTATE', realEstate: [] });
      })
      .then(data => {
        // 해당 범위 내의 존재하는 매물이 없다면
        // 백엔드 상에서 realEstate에 빈 배열을 보내주도록 할 것.
        RealEstateDispatch({ type: 'GET_REAL_ESTATE', realEstate: data });
      });
  };

  // 지도의 범위가 바뀔 때마다 fetch함수가 실행, Context에 범위 내 매물 저장
  useEffect(() => {
    sendBoundGetItem();
  }, [RealEstate.mapBounds]);

  // 현재 좌표 범위 내의 매물들이 로드 되고 난 후, 클러스터만 다시 렌더링
  // 이슈 :: 클러스터 클릭 시에 어떤 매물들은 Context에 담기고, 어떤 매물들은 담기지 않음.
  // 이유 : 받아온 데이터의 좌표와 그 데이터를 받아 지도에 뿌린 클러스터(안에 포함된 마커들의) 좌표가 다름.
  // 원인 : 좌표 소숫점 14자리부터 데이터의 좌표와 지도상 마커의 좌표가 다름.
  // filter 조건을 toFixed(13)으로 수정
  // 클릭한 클러스터에 해당하는 매물들을 context의 selected에 저장.
  useEffect(() => {
    if (kakaoClusterer) {
      kakaoClusterer.clear();
    }
    if (kakaoMap) {
      const clusterStyle = [
        {
          cursor: 'pointer',
          width: '60px',
          height: '60px',
          lineHeight: '60px',
          fontSize: '14px',
          background: 'rgba(50, 106, 249, 0.8)',
          color: '#fff',
          border: '1px solid rgb(50, 106, 249)',
          textAlign: 'center',
          fontWeight: 'bold',
          borderRadius: '50%',
        },
      ];

      const marker = RealEstate.realEstate.map(el => {
        return new kakao.maps.Marker({
          map: kakaoMap,
          position: new kakao.maps.LatLng(el.lat, el.lng),
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
                  estate.lat.toFixed(12) === qa.Ma.toFixed(12) &&
                  estate.lng.toFixed(12) === qa.La.toFixed(12)
              );
          }),
        });
      });
      clustererDOM.current = clusterer;
      RealEstateDispatch({ type: 'UPDATE_CLUSTERER', clusterer: clusterer });
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