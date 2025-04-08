import { useEffect } from "react"

export default function CafeKakaoMap({address}) {

    useEffect(()=> {
        console.log("CafeKakaoMap address:", address);  // 주소 확인
        const mapScript = document.createElement('script');
        mapScript.async = true;
        // mapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=50cbdf5940384b2ece2ac87d38ed7296`;
        document.head.appendChild(mapScript);

        const onLoadKakaoMap = () => {
            window.kakao.maps.load(() => {
            const mapContainer = document.getElementById('map');
            const mapOption = {
                center: new window.kakao.maps.LatLng(0, 0), // 지도의 중심좌표 (경도 & 위도)
                level: 3, // 지도의 확대 레벨
            };
            const map = new window.kakao.maps.Map(mapContainer, mapOption);
    
            // 주소로 좌표 검색
            const geocoder = new window.kakao.maps.services.Geocoder();
    
            geocoder.addressSearch(address, function (result, status) {
                if (status === window.kakao.maps.services.Status.OK) {
                    const latitude = result[0].y        // 위도
                    const longitude = result[0].x        // 경도
                    const coords = new window.kakao.maps.LatLng(latitude, longitude );
                    // 해당 좌표로 지도 이동
                    map.setCenter(coords);
                    
                    // 마커 표시
                    const marker = new window.kakao.maps.Marker({
                        map: map,
                        position: coords,
                    });
                    marker.setMap(map);
                }else{
                    // 주소 변환 실패 시 지정한 위치로 지도 이동
                    const defaultCoords = new window.kakao.maps.LatLng(35.170685, 129.069799); // 양정인력개발센터 좌표
                    map.setCenter(defaultCoords);

                    // 마커 표시
                    const marker = new window.kakao.maps.Marker({
                        map: map,
                        position: defaultCoords,
                    });
                    marker.setMap(map);
                }
            });
            });
        };
    
        mapScript.onload = onLoadKakaoMap;
    
        }, [address]);
  
    return( 
        <>
        <div id="map" style={{ width: "100%", height: "200px" }}></div>
        </>
    )
  }