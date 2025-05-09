import React from "react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

import PasswordChange from "./PassWordChange";
import RegisterChange from "./RegisterChange";
import RegisterCheck from "./RegisterCheck";
import MyCafeInfo from "./MyCafeInfo";

const MyPage = () => {
  const [imageSrc, setImageSrc] = useState("/default_profile.png"); // 기본 이미지 경로
  const [activeSection, setActiveSection] = useState("profile"); // 기본적으로 프로필 섹션만 보이게 설정
  const [isOpenDrop, setIsOpenDrop] = useState(null); // 드롭다운 상태

  const [cafes, setCafes] = useState([]); // 카페 정보 상태
  const [waitingCount, setWaitingCount] = useState(0); // 승인 대기 카페 수
  const [approvedCount, setApprovedCount] = useState(0); // 승인 완료 카페 수

  const [users, setUsers] = useState([]);

  // 현재 비밀번호 상태 관리
  const [realPassword, setRealPassword] = useState("12344")

  // 회원정보 비밀번호 확인
  const [isPasswordVerified, setIsPasswordVerified] = useState(false);

  // 사용자 ID와 토큰 가져오기
  const userId = localStorage.getItem("userid");
  const token = localStorage.getItem("token");
  const nickname = localStorage.getItem('nickname');  // 로컬 스토리지에서 닉네임 가져오기

  // 카페 목록 가져오기
  useEffect(() => {
    console.log("현재 사용자 닉네임:", nickname); // 확인용 콘솔 로그
    axios.get("http://localhost:8080/api/cafes", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        console.log("전체 카페 목록:", response.data);  // 전체 카페 목록을 확인

        // 각 카페에서 닉네임을 확인
        response.data.forEach((cafe) => {
          console.log("카페의 닉네임 필드:", cafe.nickname); // 또는 cafe.ownerNickname 등을 확인
        });
          
        // 'userid' 대신 'nickname'을 사용하여 필터링
        const myCafesFiltered = response.data.filter((cafe) => cafe.name === nickname);
        console.log("내 카페 목록:", myCafesFiltered);  // 내 카페 목록
        setCafes(myCafesFiltered);

        // 승인 대기
        const waiting = myCafesFiltered.filter((cafe) => cafe.approvalStatus === "PENDING").length;
        // 승인 완료 카페 수 계산 (APPROVED + REJECTED)
        const approved = myCafesFiltered.filter((cafe) => 
          cafe.approvalStatus === "APPROVED" || cafe.approvalStatus === "REJECTED"
        ).length;
        
        setWaitingCount(waiting);
        setApprovedCount(approved);
        console.log("카페 목록 가져오기 성공:", response.data);
        console.log("승인 대기 카페 수:", waiting);
        console.log("승인 완료 카페 수:", approved);
      })
      .catch((error) => {
        console.error("카페 목록 가져오기 실패:", error);
      });
  }, [nickname]);  // 의존성 배열에 'nickname' 추가


  // 로그인된 사용자 정보 상태로 관리
  const [userInfo, setUserInfo] = useState({
    nickname: "",
    name: "",
    email: "",
    userType: null
  });
  // 로그인된 사용자 정보를 로컬 스토리지에서 가져와 설정
  useEffect(() => {
    const storedNickname = localStorage.getItem("nickname");
    const storedName = localStorage.getItem("name");
    const storedEmail = localStorage.getItem("email");
    const storedUserType = localStorage.getItem("userType");
  
    setUserInfo({
      nickname: storedNickname,
      name: storedName,
      email: storedEmail,
      userType: storedUserType,
    });
  }, []);
  // 회원정보 수정 후 userInfo 업데이트하는 함수
  const updateUserInfo = (updatedUserInfo) => {
    setUserInfo((prevUserInfo) => ({
      ...prevUserInfo,
      ...updatedUserInfo, // 수정된 정보 업데이트
    }));
  
    // 로컬 스토리지에도 업데이트된 값 저장 (필요한 경우)
    localStorage.setItem("name", updatedUserInfo.name);
    localStorage.setItem("nickname", updatedUserInfo.nickname);
    localStorage.setItem("email", updatedUserInfo.email);
  };
  
  
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

// ✨ 마이페이지 - 개인 회원 탈퇴 핸들러
const handleAccountDelete = () => {
  const confirmDelete = window.confirm("정말 탈퇴하시겠습니까?");
  if (!confirmDelete) {
    console.log("회원 탈퇴 취소");
    return;
  }

  axios.delete("http://localhost:8080/api/my-page/delete", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  })
    .then(() => {
      alert("탈퇴가 완료되었습니다!");
      // 로그아웃 처리
      localStorage.clear();
      window.location.href = "/"; // 홈으로 리디렉션
    })
    .catch((error) => {
      console.error("회원 탈퇴 실패:", error);
      alert("탈퇴 중 오류가 발생했습니다.");
    });
};


  const toggleDropdown = (menuName) => {
    setIsOpenDrop((prev) => (prev === menuName? null:menuName)); // 드롭다운 열기/닫기
  };

    

  return (
    <div className="mypage-container">
      {/* Sidebar */}
      <aside className="mypage-sidebar">
        <h2 className="mypage-sidebar-title">My Page</h2>
        
        <ul className="mypage-sidebar-menu">
          <li>
            <a href="/profile" className="mypage-sidebar-item" 
              onClick={(e) => { toggleSection("profile"); e.preventDefault(); toggleDropdown("profile"); }}
            >
              프로필
            </a>
            {isOpenDrop === "profile" && (
              <ul style={{ listStyle: "none" }}>
                <li><a href="#change-password" onClick={() => toggleSection("change-password")} className="mypage-sidebar-item-content">비밀번호 변경</a></li>
                <li><a href="#change-member" onClick={() => toggleSection("change-member")} className="mypage-sidebar-item-content">회원정보 수정</a></li>
              </ul>
            )}
          </li>
          <li>
            <a href="#" className="mypage-sidebar-item" 
              onClick={() => { toggleSection("posts-comments"); toggleDropdown("content"); }}
            >
              내가 쓴 내역
            </a>
            {isOpenDrop === "content" && (
              <ul style={{ listStyle: "none" }}>
                <li><a href="#" onClick={() => toggleSection("#")} className="mypage-sidebar-item-content">내가 쓴 글</a></li>
                <li><a href="#" onClick={() => toggleSection("#")} className="mypage-sidebar-item-content">내가 쓴 댓글</a></li>
              </ul>
            )}
          </li>
          {userInfo.userType === "1" && (
            <li>
              <a href="#my-cafe-info" className="mypage-sidebar-item" 
                onClick={(e) => {
                  e.preventDefault();
                  toggleSection("my-cafe-info");
                }}>
                카페 등록
              </a>
            </li>
          )}
          <li>
            <a href="#" className="mypage-sidebar-item" onClick={() => toggleSection("question")}>
              고객센터
            </a>
          </li>
        </ul>
        <div className="mypage-sidebar-bye-box">
          <button className="mypage-sidebar-button" onClick={() => handleAccountDelete(userId)}>회원 탈퇴</button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="mypage-main-content">
        
        {/* Header Box */}
        <section className="mypage-section" id="profile">
        {activeSection === "profile" && (
          <>
          <div className="mypage-user-info-box">
            <div className="mypage-box-profile">
              <div className="mypage-img-box-box">
                <img className="mypage-img" src={imageSrc} alt="사진" />
                <div>
                  {/* <img className="mypage-img-icon" src="src/pit/img-icon2.png" alt="아이콘" onClick={handleIconClick}/> */}
                  <button className="mypage-change-btn" onClick={handleIconClick}>이미지 변경</button>
                  <input type="file" id="file-input" style={{ display: "none" }} onChange={handleImageChange} />
                </div>
              </div>
            </div>

            <div className="mypage-button-group">
              <div className="mypage-user-info-text">
                <p className="mypage-username">{userInfo.nickname} 님</p>
                <p>{localStorage.getItem("userid")}</p>
                <p>{userInfo.name}</p>
                <p>{userInfo.userType === "1" ? "카페회원" : userInfo.userType === "3" ? "관리자" : "일반회원"}</p>
                <p>{userInfo.email}</p>
              </div>
                <button className="mypage-outline-button"  onClick={() => {setActiveSection("change-member"); alert("회원정보 수정 페이지로 이동합니다.");}}>회원수정</button>
                <button className="mypage-outline-button" onClick={() => {setActiveSection("change-password"); alert("비밀번호변경 페이지로 이동합니다.");}}>비밀번호변경</button>
            </div>
          </div>

          {/* Application Status */}
          <div className="mypage-application-status">
            {userInfo.userType === "1" && (
              <>
                <div className="mypage-status-item">
                  <p className="mypage-label">승인대기</p>
                  <p className="mypage-value">{waitingCount}건</p>
                </div>
                <div className="mypage-status-item">
                  <p className="mypage-label">승인완료</p>
                  <p className="mypage-value">{approvedCount}건</p>
                </div>
              </>
            )}
            
              <div className="mypage-status-item">
                <p className="mypage-label">내가쓴글</p>
                <p className="mypage-value">{}건</p>
              </div> 
              <div className="mypage-status-item">
                <p className="mypage-label">내가쓴댓글</p>
                <p className="mypage-value">{}건</p>
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

        {/* 카페 정보 */}
        {activeSection === "my-cafe-info" && <MyCafeInfo />}

        {/* 회원정보 수정 */}
        {activeSection === "change-member" && (isPasswordVerified ? <RegisterChange updateUserInfo={updateUserInfo}/> : 
        <RegisterCheck 
          realPassword={realPassword} 
          onSuccess={() => setIsPasswordVerified(true)} />
        )}


      </main>
    </div>
  );
};

export default MyPage;

