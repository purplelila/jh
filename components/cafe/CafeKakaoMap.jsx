// // CafeKakaoMap.jsx
// import React, { useEffect } from 'react';

// const CafeKakaoMap = ({ address }) => {
//   useEffect(() => {
//     if (!window.kakao || !address) return;

//     const container = document.getElementById('map');
//     const options = {
//       center: new window.kakao.maps.LatLng(33.450701, 126.570667), // 기본 좌표
//       level: 3,
//     };

//     const map = new window.kakao.maps.Map(container, options);

//     // 주소로 좌표를 검색
//     const geocoder = new window.kakao.maps.services.Geocoder();
//     geocoder.addressSearch(address, function (result, status) {
//       if (status === window.kakao.maps.services.Status.OK) {
//         const coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);

//         // 마커 찍기
//         const marker = new window.kakao.maps.Marker({
//           map: map,
//           position: coords,
//         });

//         // 중심좌표 옮기기
//         map.setCenter(coords);
//       }
//     });
//   }, [address]);

//   return (
//     <div
//       id="map"
//       style={{ width: '100%', height: '300px', borderRadius: '12px', marginTop: '10px' }}
//     ></div>
//   );
// };

// export default CafeKakaoMap;
import React, { useEffect } from 'react';

const CafeKakaoMap = ({ address }) => {
  useEffect(() => {
    if (!window.kakao || !address) return;

    const container = document.getElementById('map');
    const options = {
      center: new window.kakao.maps.LatLng(37.5665, 126.9780), // 서울 기본 좌표
      level: 3,
    };

    const map = new window.kakao.maps.Map(container, options);

    const geocoder = new window.kakao.maps.services.Geocoder();
    geocoder.addressSearch(address, (result, status) => {
      if (status === window.kakao.maps.services.Status.OK) {
        const coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);

        new window.kakao.maps.Marker({
          map: map,
          position: coords,
        });

        map.setCenter(coords);
      } else {
        console.log("주소 검색 실패 🥲", address);
      }
    });
  }, [address]);

  return (
    <div
      id="map"
      style={{
        width: '100%',
        height: '300px',
        border: '1px solid #ccc',
        borderRadius: '12px',
        marginTop: '10px',
      }}
    ></div>
  );
};

export default CafeKakaoMap;
