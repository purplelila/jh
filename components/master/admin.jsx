import React, { useState, useEffect }from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";


const Admin = () => {
  const navigate = useNavigate();
  const [openMenu, setOpenMenu] = useState({
    member: false,
    board: false
  });

  const [pendingCafes, setPendingCafes] = useState([]);
  const [isAuthorized, setIsAuthorized] = useState(null);

    // ✅ 관리자 인증 체크
    useEffect(() => {
      const token = localStorage.getItem("token");
      const userType = parseInt(localStorage.getItem("userType"));
    
      if (!token || userType !== 3) {
        alert("관리자 페이지입니다. 로그인 해주세요.");
        setIsAuthorized(false); // ❗ 비인가일 때 false로 설정
        navigate("/login");
      } else {
        console.log("✅ 관리자 권한 확인 완료");
        setIsAuthorized(true); // ✅ 인가되었을 때 true로 설정
      }
    }, [navigate]);



    // 승인 대기 중인 카페 목록 불러오기
    useEffect(() => {
      if (isAuthorized) {
        const token = localStorage.getItem("token");
        axios.get("http://localhost:8080/cafes/pending", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
          .then((response) => {
            console.log(response.data);
            if (Array.isArray(response.data)) {
              setPendingCafes(response.data); // 응답이 배열일 경우 상태 업데이트
            } else {
              console.error("카페 목록은 배열이어야 합니다.");
              setPendingCafes([]); // 배열이 아니면 빈 배열로 설정
            }
          })
          .catch((error) => {
            console.error("카페 목록을 불러오는 데 실패했습니다.", error);
            setPendingCafes([]); // 실패 시 빈 배열로 설정
          });
      }
    }, [isAuthorized]);
  
    // 카페 승인 처리
    const approveCafe = (cafeId) => {
      const token = localStorage.getItem("token"); // ✅ 토큰 가져오기
      axios.post(`http://localhost:8080/cafes/${cafeId}/approve`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then(() => {
          alert("카페가 승인되었습니다.");
          setPendingCafes(pendingCafes.filter(cafe => cafe.id !== cafeId));
        })
        .catch((error) => {
          console.error("카페 승인에 실패했습니다.", error);
          alert("카페 승인에 실패했습니다.");
        });
    };
  
    // 카페 거절 처리
    const rejectCafe = (cafeId) => {
      const token = localStorage.getItem("token"); // ✅ 토큰 가져오기
      axios.post(`http://localhost:8080/cafes/${cafeId}/reject`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then(() => {
          alert("카페가 거절되었습니다.");
          setPendingCafes(pendingCafes.filter(cafe => cafe.id !== cafeId));
        })
        .catch((error) => {
          console.error("카페 거절에 실패했습니다.", error);
          alert("카페 거절에 실패했습니다.");
        });
    };



    if (isAuthorized === false) {
      return null; // 비인가일 때는 아무것도 안 보여줌
    }
    
    if (isAuthorized === null) {
      return (
        <div style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          fontSize: "1.5rem"
        }}>
          🔒 관리자 권한 확인 중...
        </div>
      );
    }
  const toggleMenu = (menu) => {
    setOpenMenu((prev) => ({
      ...prev,
      [menu]: !prev[menu],
    }));
  };

  const logoutCheck = () => {
    const confirmLogout = window.confirm("로그아웃 하시겠습니까?");
    if (confirmLogout) {
      alert("로그아웃 되었습니다.");
      // 필요하다면 로그아웃 처리 추가 (예: localStorage.clear())
      navigate("/"); // 메인 페이지로 이동
    }
  };

  return (
    <div className="admin-board">
      {/* 사이드바 */}
      <div className="sidebar">
          <h2 className="sidebar-h2">관리자 메뉴
            <Link to="/">
             <FontAwesomeIcon icon={faHouse} className="sidebar-icon"/>
            </Link>
          </h2>
          <ul className="sidebar-ul">
            <li className="sidebar-li-a"><a href="/admin/1">대시보드</a></li>

            {/* 회원 관리 드롭다운 */}
            <li>
              <div className="dropdown-header" onClick={() => toggleMenu("member")}>
                회원 관리
              </div>

              {openMenu.member && (
                <ul className="dropdown-list">
                  <li><a href="/admin/list-0"> - 일반회원 목록</a></li>
                  <li><a href="/admin/list-1"> - 카페사장 목록</a></li>
                </ul>
              )}
            </li>

            {/* 게시판 관리 드롭다운 */}
            <li>
              <div className="dropdown-header" onClick={() => toggleMenu("board")}>
                게시판 관리
              </div>
              {openMenu.board && (
                <ul className="dropdown-list">
                  <li><a href="/admin/Bord-1"> - 공지사항 목록</a></li>
                  <li><a href="/admin/Bord-2">- 자주 묻는 질문 목록</a></li>
                  <li><a href="/admin/Bord-3">- 커뮤니티 목록</a></li>
                  <li><a href="/admin/Bord-4">- 카페등록 목록</a></li>
                </ul>
              )}
            </li>

            <li><a href="/admin/1">설정</a></li>
            <li className="sidebar-logout">
            <button className="sidebar-logout-btn" onClick={logoutCheck}>로그아웃</button>
            </li>
          </ul>
        </div>

      {/* 메인 컨텐츠 */}
      <div className="main-content">
        <h1 className="main-h1">카페연구소 관리자 대시보드</h1>
        <div className="dashboard-cards">
          <div className="card-card-1">
            <h3>전체 회원</h3>
            <p>1,250명</p>
          </div>
          <div className="card-card-2">
            <h3>신규 가입</h3>
            <p>25명</p>
          </div>
        </div>
            <h1 className="admin-h1">승인대기목록</h1>
        <table className="board-table">
          <thead>
            <tr className="tr-total-middle">
              <th>번호</th>
              <th>카페이름</th>
              <th>작성자</th>
              <th>등록일</th>
              <th>비고</th>
            </tr>
          </thead>
          <tbody>
            {pendingCafes.map((cafe) => (
              <tr key={cafe.id} className="list-tr">
                <td>{cafe.id}</td>
                <td>{cafe.title}</td>
                <td>{cafe.name}</td>
                <td>{cafe.regDate}</td>
                <td>
                  <button onClick={() => approveCafe(cafe.id)}>승인</button>
                  <button className="delete-btn" onClick={() => rejectCafe(cafe.id)}>
                    거절
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="pagination">
          <button className="prev-btn">이전</button>
          <span className="active">1</span>
          <span>2</span>
          <span>3</span>
          <button className="next-btn">이후</button>
        </div>
      </div>
    </div>
  );
};

export default Admin;