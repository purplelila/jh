import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import '../../style/admin/PasswordChange.css'

const PasswordChange = ({realPassword}) => {
    const navigate = useNavigate();

// 비밀번호 눈 아이콘 토글을 위한 상태
  const [currentPasswordVisible, setCurrentPasswordVisible] = useState(false);
  const [newPasswordVisible, setNewPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

// 입력한 실제 값 저장하기 위한 상태
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

// 에러 메시지 상태
    const [currentErrorMessage, setCurrentErrorMessage] = useState("");
    const [confirmErrorMessage, setConfirmErrorMessage] = useState("");

// 커서 이동
    const currentPasswordRef = useRef(null);
    const confirmPasswordRef = useRef(null);


  const handleSubmit = (e) => {
    e.preventDefault()

    if (currentPassword !== realPassword) {
        alert("현재 비밀번호가 일치하지 않습니다.");
        setCurrentErrorMessage("현재 비밀번호가 일치하지 않습니다.")
        currentPasswordRef.current.focus()
        return;
      }

    if (newPassword !== confirmPassword) {
        alert("입력하신 새 비밀번호와 일치하지 않습니다.");
        setConfirmErrorMessage("입력하신 새 비밀번호와 일치하지 않습니다.")
        confirmPasswordRef.current.focus()
        return;
      }
  
      const confirm = window.confirm("정말 비밀번호를 변경하시겠습니까?");
      if (confirm) {
        alert("비밀번호가 변경되었습니다.");
        navigate("/profile");
      }

  }

  return (
    <div className="mypage-password-change">
      <h2 className="mypage-password-change-h2">비밀번호 변경</h2>
      <form className="mypage-password-form" onSubmit={handleSubmit}>
        <div className="password-input-with-icon">
          <label>현재 비밀번호</label>
          <input type={currentPasswordVisible ? "text" : "password"} placeholder="현재 비밀번호 입력" value={currentPassword} 
            onChange={(e)=> {setCurrentPassword(e.target.value); setCurrentErrorMessage("");}}
            className={currentErrorMessage ? "password-input-error" : ""}
            ref={currentPasswordRef}
          />
          <i className={`fa-solid ${currentPasswordVisible ? "fa-eye-slash" : "fa-eye"}`} onClick={() => setCurrentPasswordVisible(prev => !prev)}></i>
          {currentErrorMessage && <p className="password-error-text">{currentErrorMessage}</p>}
        </div>

        <div className="password-input-with-icon">
          <label>새 비밀번호</label>
          <input type={newPasswordVisible ? "text" : "password"} placeholder="10~20자의 영문 대문자, 특수문자를 포함" value={newPassword} onChange={(e)=> setNewPassword(e.target.value)}/>
          <i className={`fa-solid ${newPasswordVisible ? "fa-eye-slash" : "fa-eye"}`} onClick={() => setNewPasswordVisible(prev => !prev)}></i>
        </div>

        <div className="password-input-with-icon">
          <label>새 비밀번호 확인</label>
          <input type={confirmPasswordVisible ? "text" : "password"} placeholder="비밀번호를 한번 더 입력해주세요" value={confirmPassword} 
            onChange={(e)=> {setConfirmPassword(e.target.value); setConfirmErrorMessage("");}}
            className={confirmErrorMessage ? "password-input-error" : ""}
            ref={confirmPasswordRef}
          />
          <i className={`fa-solid ${confirmPasswordVisible ? "fa-eye-slash" : "fa-eye"}`} onClick={() => setConfirmPasswordVisible(prev => !prev)}></i>
          {confirmErrorMessage && <p className="password-error-text">{confirmErrorMessage}</p>}
        </div>

        <button type="submit" className="mypage-password-change-form">변경하기</button>
      </form>
    </div>
  );
};

export default PasswordChange;
