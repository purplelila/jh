import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
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
            const response = await axios.post("http://localhost:8080/api/login", {
              userid,
              password,
            }, {
              headers: {
                "Content-Type": "application/json", // ✅ 이거 꼭 필요해!
              },
              
            });
      
            const data = response.data;
            console.log(data); // 응답 데이터 확인
      
            // ✅ 토큰 저장
            localStorage.setItem("token", data.token);
            localStorage.setItem("userType", data.userType); // 예: userType 저장
            localStorage.setItem("name", data.name);    // username 저장
            localStorage.setItem("email", data.email);  // email 저장

            // ✅ 로그인한 사용자 정보 저장 (예: userType, userid 등)
            if (data.userid) {
                localStorage.setItem("userid", data.userid); // 예: userid 저장
            }

            if (data.nickname) {
              localStorage.setItem("nickname", data.nickname);
              console.log("nickname 저장 완료: ", data.nickname);
            }

            // ✅ JWT가 잘 저장되었는지 콘솔로 확인
                console.log("JWT 토큰: ", localStorage.getItem("token"));
                console.log("사용자 ID: ", localStorage.getItem("userid"));
            
            alert(data.message);
      
            // 🔀 userType에 따라 이동
            switch (data.userType) {
              case 0:
                navigate("/notice");
                break;
              case 1:
                navigate("/cafelist");
                break;
              case 3:
                navigate("/admin/1");
                break;
              default:
                navigate("/");
            }
      
          } catch (error) {
            // ❌ 서버에서 에러 메시지 응답 시 처리
            if (error.response && error.response.data) {
              const serverMsg = error.response.data.message;
          
              // ✅ 조건에 따라 알림 분기
              if (
                serverMsg.includes("비밀번호") ||
                serverMsg.includes("아이디") ||
                serverMsg.includes("로그인") // 혹시 다른 메시지 형태 대비
              ) {
                alert("아이디 / 비밀번호가 틀렸습니다."); // 가장 일반적인 안내
              }
          
              setErrorMessage(serverMsg); // 화면에 메시지도 출력
          
            } else {
              console.error("서버와 연결할 수 없습니다."); // ❗ 콘솔에만 출력
              alert("연결 중입니다. 잠시만 기다려주세요."); // 사용자에게는 부드럽게 안내
            }
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
