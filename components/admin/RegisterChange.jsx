import React, { useState } from "react";
import "../../style/admin/RegisterChange.css"; 

const RegisterChange = () => {
  const [name, setName] = useState("");
  const [nickname, setNickname] = useState("");
  const [birthYear, setBirthYear] = useState("");
  const [birthMonth, setBirthMonth] = useState("");
  const [birthDay, setBirthDay] = useState("");
  const [gender, setGender] = useState("");
  const [email1, setEmail1] = useState("");
  const [email2, setEmail2] = useState("");
  const [emailAgree, setEmailAgree] = useState("예");

  const handleSubmit = () => {
    alert("회원 정보가 수정되었습니다.");
  };
  
  const handleCancel = () => {
    const confirmCancel = window.confirm("입력하신 내용이 초기화됩니다. 정말 취소하시겠습니까?");
    if (confirmCancel) {
      window.location.href = "/profile";  // 이동하고 싶은 경로로 변경 가능
    }
  };
  

  return (
    <div className="register-edit-wrapper">
      <h2>내 정보 수정</h2>
      <form className="register-edit-form" onSubmit={(e) => e.preventDefault()}>
        {/* 아이디 (고정) */}
        <label className="register-edit-form-label">아이디</label>
        <input className="register-edit-form-input" type="text" value="hotdog" disabled />

        {/* 이름 */}
        <label className="register-edit-form-label">이름</label>
        <input className="register-edit-form-input" type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="실명을 입력해주세요" />

        {/* 회원 */}
        <label className="register-edit-form-label">회원</label>
        <div>
          <input className="register-edit-form-input" type="text" value="일반" disabled />
          <p className="register-edit-grade-p">*회원 등급 변경은 고객센터에 문의해주세요</p>
        </div>



        {/* 닉네임 */}
        <label className="register-edit-form-label">닉네임</label>
        <div className="register-edit-form-nickname">
          <input className="register-edit-form-input" type="text" value={nickname} onChange={(e) => setNickname(e.target.value)} placeholder="닉네임을 입력해주세요" />
          <button type="button" className="register-edit-nickname-btn">중복확인</button>
        </div>

        {/* 생년월일 */}
        <label className="register-edit-form-label">생년월일</label>
        <div className="register-edit-form-birth">
          <select className="register-edit-form-select" value={birthYear} onChange={(e) => setBirthYear(e.target.value)}>
            <option value="">년</option>
            {[...Array(100)].map((_, i) => (
              <option key={i}>{2025 - i}</option>
            ))}
          </select>
          <select className="register-edit-form-select" value={birthMonth} onChange={(e) => setBirthMonth(e.target.value)}>
            <option value="">월</option>
            {[...Array(12)].map((_, i) => (
              <option key={i + 1}>{String(i + 1).padStart(2, "0")}</option>
            ))}
          </select>
          <select className="register-edit-form-select" value={birthDay} onChange={(e) => setBirthDay(e.target.value)}>
            <option value="">일</option>
            {[...Array(31)].map((_, i) => (
              <option key={i + 1}>{String(i + 1).padStart(2, "0")}</option>
            ))}
          </select>
        </div>

        {/* 성별 */}
        <label className="register-edit-form-label">성별</label>
        <div className="register-edit-gender-check">
          <label><input type="radio" name="gender" value="남" checked={gender === "남"} onChange={() => setGender("남")} /> 남</label>&nbsp;&nbsp;
          <label><input type="radio" name="gender" value="여" checked={gender === "여"} onChange={() => setGender("여")} /> 여</label>
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

        <div className="register-edit-email-check">
          이메일 수신 동의:
          <input type="radio" value="예" checked={emailAgree === "예"} onChange={() => setEmailAgree("예")} /> 예&nbsp;
          <input type="radio" value="아니오" checked={emailAgree === "아니오"} onChange={() => setEmailAgree("아니오")} /> 아니오
        </div>

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


