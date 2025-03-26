import React from 'react';
import './Cafemain.css'; // CSS 파일을 임포트
import { useNavigate } from 'react-router-dom';


const Cafemain = () => {

  const navigate = useNavigate();

  const navigateToCafe = () => {
    navigate('/cafelist'); // 원하는 링크로 변경
  };

  const navigateToComm = () => {
    navigate('/community'); // CommunityPage로 이동 (예시: /community)
  };

  return (
    <div className="main-total-box">
      <section className="main-box">
        <div className="cafe" onClick={navigateToCafe}>
          <div className="cafe-font">
            <h3>CAFE STORE</h3> <hr />
            <p>스토어</p>
          </div>
        </div>
        <div className="comm" onClick={navigateToComm}>
          <div className="comm-font">
            <h3>COMMUNITY</h3> <hr />
            <p>소통창</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Cafemain;
