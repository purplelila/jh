import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Signup from "./Signup";
import axios from "axios";

const LoginPage = () => {
    const [userid, setUserid] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate(); // 페이지 이동 함수

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        if (userid === "" || password === "") {
          setErrorMessage("아이디 또는 비밀번호를 입력해주세요.");
          return;
        }
    
        try {
            const response = await fetch("http://localhost:8080/api/login", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ userid, password }),
            });
         if (response.ok) {
              const data = await response.json();
              alert(data.message);
        
              // userType에 따라 라우팅
              switch (data.userType) {
                case 0:
                  navigate("/community");
                  break;
                case 1:
                  navigate("/cafelist");
                  break;
                case 3:
                  navigate("/admin/1");
                  break;
                default:
                  navigate("/"); // fallback
              }
            } else {
              const error = await response.text();
              setErrorMessage(error);
            }
          } catch (error) {
            setErrorMessage("서버와 연결할 수 없습니다.");
          }
        };

    return (
        <div className="login-total-box">
            <div className="login-container">
            <h1 className="login-h1">
                Welcome,</h1>
            <h2 className="login-h2" >Cafe Laboratory !
            <img className="login-logo" src="/loginimg.jpg" alt="로고" />
            </h2>
            {/* <h3 className="login-h3">카페연구소 로그인</h3> */}
            <form onSubmit={handleSubmit}>
                <input type="text" id="userid" value={userid} onChange={(e) => setUserid(e.target.value)} placeholder="아이디" required/>
                <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="비밀번호" required/>
                <input type="submit" id="submit" value="로그인" />
                {errorMessage && <div className="lognin-error">{errorMessage}</div>}
            </form>
                <div className="login-pont">
                <Link to="/" id="main-link">메인으로</Link>
                <Link to="/signup" id="signup-link">회원가입</Link>
                </div>
            </div>
        </div>
        
    );
};

export default LoginPage;
