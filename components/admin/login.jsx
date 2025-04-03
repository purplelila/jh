import React, { useState } from "react";

const LoginPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const returnToCafe = () => {
        window.location.href = '#'; // 원하는 링크로 변경
    };
  
    const navigateToComm = () => {
        window.location.href = '#'; // 원하는 링크로 변경
    };

    const handleSubmit = (event) => {
        event.preventDefault(); // 기본 폼 제출 방지

        if (username === "" || password === "") {
            setErrorMessage("아이디 또는 비밀번호를 확인해주세요.");
        } else {
            setErrorMessage("");
            alert("로그인 성공하셨습니다.");
            // 로그인 후 처리
        }
    };

    return (
        <div className="login-total-box">
            <div className="login-container">
            <h1 className="login-h1">
            {/* <img className="login-logo2" src="src/pit/logo2.png" alt="로고" /> */}
                Welcome,</h1>
            <h2 className="login-h2" >Cafe Laboratory !
            <img className="login-logo" src="loginimg.jpg" alt="로고" />
            </h2>
            {/* <h3 className="login-h3">카페연구소 로그인</h3> */}
            <form onSubmit={handleSubmit}>
                <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="아이디" required/>
                <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="비밀번호" required/>
                <input type="submit" id="submit" value="로그인" />
                {errorMessage && <div className="lognin-error">{errorMessage}</div>}
            </form>
                <div className="login-pont">
                    <a href="/" id="main-link">
                        메인으로
                    </a>
                    <a href="/signup" id="signup-link">
                        회원가입
                    </a>
                </div>
            </div>
        </div>
        
    );
};

export default LoginPage;