import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import PasswordChange from "./PassWordChange";
import RegisterChange from "./RegisterChange";
import RegisterCheck from "./RegisterCheck";


const MyPage = () => {
  const [imageSrc, setImageSrc] = useState("/default_profile.png"); // 기본 이미지 경로
  const [activeSection, setActiveSection] = useState("profile"); // 기본적으로 프로필 섹션만 보이게 설정
  const [isOpenDrop, setIsOpenDrop] = useState(null); // 드롭다운 상태

  // 현재 비밀번호 상태 관리
  const [realPassword, setRealPassword] = useState("12344")

  // 회원정보 비밀번호 확인
  const [isPasswordVerified, setIsPasswordVerified] = useState(false);


  const toggleSection = (section) => {
    setActiveSection(section);
      if (section === "change-member") {
    setIsPasswordVerified(false); // 섹션 이동 시 인증 초기화
  }
    window.scrollTo({ top: 0, behavior: 'smooth' }); // 스크롤을 부드럽게 맨 위로
  };  

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageSrc(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleIconClick = () => {
    document.getElementById("file-input").click();
  };

  const deleteAccount = () => {
    const confirmDelete = window.confirm("정말 탈퇴하시겠습니까?");
    if (confirmDelete) {
      console.log("회원 탈퇴");
      alert("탈퇴되셨습니다.");
    } else {
      console.log("회원 탈퇴 취소");
    }
  };


const toggleDropdown = (menuName) => {
  setIsOpenDrop((prev) => (prev === menuName? null:menuName)); // 드롭다운 열기/닫기
};

  return (
    <div className="mypage-total-box">
      {/* 사이드바 */}
      <div className="mypage-sidebar">
        <h2 className="mypage-sidebar-title">My Page</h2>

        <div className="mypage-img-box">
          <div className="mypage-sidebar-img-profile">
            <img className="mypage-img-2" src={imageSrc} alt="사진" />
          </div>
          <p className="mypage-wecl-p">비비빅님,</p>
          <h2 className="mypage-wecl-h2">환영합니다 !</h2>
        </div>

        <ul className="mypage-sidebar-menu">                                                                {/* 기본 동작 차단 */}
          <li><a href="/profile" className="mypage-sidebar-item" onClick={(e) => {toggleSection("profile"); e.preventDefault(); toggleDropdown("profile");} } >프로필</a></li>
            {isOpenDrop === "profile" && (
              <ul style={{listStyle:"none"}}>
                <li><a href="#change-password" onClick={() => toggleSection("change-password")} className="mypage-sidebar-item-content"> 비밀번호 변경</a></li>
                <li><a href="#change-member" onClick={() => toggleSection("change-member")} className="mypage-sidebar-item-content"> 회원정보 수정</a></li>
              </ul>
            )}
          <li><a href="#" className="mypage-sidebar-item" onClick={() => {toggleSection("posts-comments"); toggleDropdown("content");}}>내가 쓴 내역</a></li>
            {isOpenDrop === "content" && (
                <ul style={{listStyle:"none"}}>
                  <li><a href="#" onClick={() => toggleSection("#")} className="mypage-sidebar-item-content"> 내가 쓴 글</a></li>
                  <li><a href="#" onClick={() => toggleSection("#")} className="mypage-sidebar-item-content"> 내가 쓴 댓글</a></li>
                </ul>
              )}
          <li><a href="#" className="mypage-sidebar-item" onClick={() => toggleSection("cafelist")}>카페정보 수정</a></li>
          <li><a href="#" className="mypage-sidebar-item" onClick={() => toggleSection("question")}>고객센터</a></li>
        </ul>
        <div className="mypage-bye-box">
              <button className="mypage-btn-bye" onClick={deleteAccount}> 회원 탈퇴 </button>
        </div>
      </div>

      {/* 본문 영역 */}
      <div className="mypage-content">
        <section className="mypage-section"  id="profile">
          {activeSection === "profile" && (
            <>
            {/* 왼쪽 부분 */}
            <div className="mypage-box-profile">
              <div className="mypage-img-box-box">
                <img className="mypage-img" src={imageSrc} alt="사진" />
                <div>
                  <img className="mypage-img-icon" src="src/pit/img-icon2.png" alt="아이콘" onClick={handleIconClick}/>
                  <input type="file" id="file-input" style={{ display: "none" }} onChange={handleImageChange} />
                </div>
                <p className="mypage-img-box-p">비비빅 님! 환영합니다!</p>
              </div>
            </div>
            <div className="mypage-emy-box"></div>
            {/* 오른쪽 부분 */}
            <div className="mypage-box-profile-2">
              <div className="mypage-p-total-box">
                  <div className="mypage-p-box">
                    <p className="mypage-p">아이디 : hotdog</p>
                  </div>
                  <hr className="mypage-hr" />
                  <div className="mypage-ddr-box">
                    <p className="mypage-p-name"> 이름 : 빅말차</p>
                  </div>
                  <hr className="mypage-hr" />
                  <div className="mypage-ddr-box">
                    <p className="mypage-p-grade"> 회원 : 일반회원</p>
                  </div>
                  <hr className="mypage-hr" />
                  <div className="mypage-pwd-box">
                    <p className="mypage-p-pwd"> 비밀번호 : {realPassword} </p>
                  </div>
                  <hr className="mypage-hr" />
                  <div className="mypage-bri-box">
                  <p className="mypage-p-bri">  생년월일 : 2025-03-28 </p>
                  </div>
                  <hr className="mypage-hr" />
                  <div className="mypage-ddr-box">
                    <p className="mypage-p-gender"> 성별 : 남</p>
                  </div>
              </div>
            </div>  
            </>
          )}
        </section>
        

        {activeSection === "posts-comments" && (
          <div className="mypage-posts" id="posts">
            <h2 className="mypage-h2">내가 쓴 글</h2>
            <div className="mypage-posts-list">...</div>
            <hr />
            <h2 className="mypage-h2">내가 쓴 댓글</h2>
            <div className="mypage-comments-list">...</div>
          </div>
        )}

        {activeSection === "cafelist" && (
          <div className="mypage-comments" id="comments">
            <h2 className="mypage-h2">카페 정보</h2>
            <div className="mypage-comments-list">...</div>
          </div>
        )}

        {/* 비밀번호 변경 */}
        {activeSection === "change-password" && <PasswordChange realPassword={realPassword}/>}


        {/* 회원정보 수정 */}
        {activeSection === "change-member" && (isPasswordVerified ? <RegisterChange /> : <RegisterCheck 
        realPassword={realPassword} 
        onSuccess={() => setIsPasswordVerified(true)} />
        )}




      </div>
    </div>
  );
};

export default MyPage;