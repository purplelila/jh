import React, { useState, useEffect  } from "react";
import "../../style/admin/RegisterChange.css"; 

const RegisterChange = ({updateUserInfo}) => {
  const [name, setName] = useState("");
  const [nickname, setNickname] = useState("");
  const [email1, setEmail1] = useState("");
  const [email2, setEmail2] = useState("");
  // const [emailAgree, setEmailAgree] = useState("예");

// 로그인한 회원 정보 상태
const [userData, setUserData] = useState({
  name: "",
  nickname: "",
  email: "",
  userType: null
});


// JWT 토큰을 이용하여 사용자 정보 가져오기
useEffect(() => {
  const token = localStorage.getItem("token"); // JWT 토큰 가져오기
  if (token) {
    fetch("http://localhost:8080/api/user", {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`, // JWT 토큰을 Authorization 헤더에 포함
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("서버 응답 데이터:", data);  // 응답 데이터를 확인
        // 서버로부터 받은 사용자 정보로 상태 업데이트
        setUserData({
          nickname: localStorage.getItem("nickname"),
          name: localStorage.getItem("name"),
          email: localStorage.getItem("email"),
          userType: localStorage.getItem("userType"),
        });
        setName(data.name);
        setNickname(data.nickname);
        const emailParts = data.email.split("@");
        setEmail1(emailParts[0]);
        setEmail2(emailParts[1]);
      })
      .catch((error) => {
        console.error("사용자 정보를 가져오는 데 실패했습니다:", error);
      });
    }
  }, []);

  // 수정된 회원 정보 서버에 전송
  const handleSubmit = () => {
    const token = localStorage.getItem("token"); // JWT 토큰 가져오기
    const updatedUserData = { name, nickname, email: `${email1}@${email2}` };

    fetch("http://localhost:8080/api/user/update", {
      method: "PUT",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedUserData), // 수정된 정보 보내기
    })
      .then((response) => response.json())
      .then((data) => {
        alert("회원 정보가 수정되었습니다.");

      console.log("회원정보 업데이트 호출됨:", {
        name,
        nickname,
        email: `${email1}@${email2}`,
      });
        // 부모 컴포넌트의 userInfo 업데이트
        updateUserInfo({
          name,
          nickname,
          email: `${email1}@${email2}`,
        });


        window.location.href = "/mypage";
      })
      .catch((error) => {
        console.error("회원 정보 수정 실패:", error);
        alert("회원 정보 수정에 실패했습니다.");
      });
  };

  
  
  const handleCancel = () => {
    const confirmCancel = window.confirm("입력하신 내용이 초기화됩니다. 정말 취소하시겠습니까?");
    if (confirmCancel) {
      window.location.href = "/mypage";  // 이동하고 싶은 경로로 변경 가능
    }
  };
  
  

  return (
    <div className="register-edit-wrapper">
      <h2>내 정보 수정</h2>
      <form className="register-edit-form" onSubmit={(e) => e.preventDefault()}>
        {/* 아이디 (고정) */}
        <label className="register-edit-form-label">아이디</label>
        <input className="register-edit-form-input" type="text" value={localStorage.getItem("userid")} disabled />

        {/* 이름 */}
        <label className="register-edit-form-label">이름</label>
        <input className="register-edit-form-input" type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="실명을 입력해주세요" />

        {/* 회원 */}
        <label className="register-edit-form-label">회원</label>
        <div>
          <input className="register-edit-form-input" type="text" value={userData.userType === "1" ? "카페회원" : "일반회원"} disabled />
          <p className="register-edit-grade-p">*회원 등급 변경은 고객센터에 문의해주세요</p>
        </div>



        {/* 닉네임 */}
        <label className="register-edit-form-label">닉네임</label>
        <div className="register-edit-form-nickname">
          <input className="register-edit-form-input" type="text" value={nickname} onChange={(e) => setNickname(e.target.value)} placeholder="닉네임을 입력해주세요" />
          <button type="button" className="register-edit-nickname-btn">중복확인</button>
        </div>


        {/* 이메일 */}
        <label className="register-edit-form-label">이메일</label>
        <div className="register-edit-email">
          <input className="register-edit-form-input" type="text" value={email1} onChange={(e) => setEmail1(e.target.value)} />
          <span>@</span>
          <select className="register-edit-form-select" value={email2} onChange={(e) => setEmail2(e.target.value)}>
            <option value="naver.com">naver.com</option>
            <option value="gmail.com">gmail.com</option>
          </select>
        </div>

        {/* <div className="register-edit-email-check">
          이메일 수신 동의:
          <input type="radio" value="예" checked={emailAgree === "예"} onChange={() => setEmailAgree("예")} /> 예&nbsp;
          <input type="radio" value="아니오" checked={emailAgree === "아니오"} onChange={() => setEmailAgree("아니오")} /> 아니오
        </div> */}

        {/* 버튼 */}
        <div className="register-edit-button-group">
          <button type="button" className="register-edit-button-group-edit" onClick={handleSubmit}>수정</button>
          <button type="button" className="register-edit-button-group-cancel" onClick={handleCancel}>취소</button>
        </div>
      </form>
    </div>
  );
};

export default RegisterChange;


