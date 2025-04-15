import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../style/admin/RegisterCheck.css"

const RegisterCheck = ({ realPassword, onSuccess }) => {
    // 사용자 입력값
    const [inputPassword, setInputPassword] = useState("");
      
    const checkPassword = () => {
        if (inputPassword === realPassword) {
        onSuccess();
        } else {
        alert("비밀번호가 틀렸습니다! \n다시 입력해주세요");
        }
    };
      
    return (
        <div className="register-check-container">
          <h2>비밀번호 확인</h2>
          <form className="register-check-password-form" onSubmit={checkPassword}>
            <input
              className="register-check-password-input"
              type="password"
              value={inputPassword}
              onChange={(e) => setInputPassword(e.target.value)}
              placeholder="비밀번호 입력"
            />
            <button
              className="register-check-confirm-button"
              type="submit"
              onClick={checkPassword}
            >
              확인
            </button>
          </form>
        </div>
      );      
};
      

export default RegisterCheck;
