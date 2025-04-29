import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./sidebar";
import axios from "axios";

const Admin = () => {
  const navigate = useNavigate();
  const [totalMembers, setTotalMembers] = useState(0);
  const [newMembersToday, setNewMembersToday] = useState(0);
  const [isAuthorized, setIsAuthorized] = useState(null);
  const [pendingCafes, setPendingCafes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCafes, setTotalCafes] = useState(0);
  const cafelistPerPage = 5;
  
  const startIndex = (currentPage - 1) * cafelistPerPage;
  const paginatedCafes = pendingCafes.slice(startIndex, startIndex + cafelistPerPage);

  // 관리자 인증 체크
  useEffect(() => {
    const token = localStorage.getItem("token");
    const userType = parseInt(localStorage.getItem("userType"));

    if (!token || userType !== 3) {
      setIsAuthorized(false);
    } else {
      setIsAuthorized(true);
    }
  }, []);

  // 권한 없으면 로그인 페이지로 이동
  useEffect(() => {
    if (isAuthorized === false) {
      alert("정상적인 접근경로가 아닙니다.");
      navigate("/login");
    }
  }, [isAuthorized, navigate]);

  // 승인 대기 카페 목록 불러오기 (최신순 정렬)
  useEffect(() => {
    if (isAuthorized) {
      const token = localStorage.getItem("token");
      axios
        .get("http://localhost:8080/cafes/pending", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          if (Array.isArray(response.data)) {
            const sortedCafes = response.data.sort((a, b) => new Date(b.regDate) - new Date(a.regDate));
            setPendingCafes(sortedCafes);
            const totalCafes = sortedCafes.length;
            setTotalPages(Math.ceil(totalCafes / cafelistPerPage));
            setTotalCafes(totalCafes);
          } else {
            console.error("카페 목록은 배열이어야 합니다.");
            setPendingCafes([]);
          }
        })
        .catch((error) => {
          console.error("카페 목록을 불러오는 데 실패했습니다.", error);
          setPendingCafes([]);
        });
    }
  }, [isAuthorized]);

  // pendingCafes가 바뀌면 페이지 수 재계산
  useEffect(() => {
    const totalCafes = pendingCafes.length;
    const newTotalPages = Math.ceil(totalCafes / cafelistPerPage) || 1;
    setTotalPages(newTotalPages);

    if (currentPage > newTotalPages) {
      setCurrentPage(newTotalPages);
    }
  }, [pendingCafes, currentPage]);

  // 전체 회원 수, 오늘 가입 회원 수 가져오기
  useEffect(() => {
    if (isAuthorized) {
      const token = localStorage.getItem("token");

      axios
        .get("http://localhost:8080/api/users/count", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          setTotalMembers(response.data);
        })
        .catch((error) => {
          console.error("전체 회원 수를 불러오는 데 실패했습니다.", error);
        });

      axios
        .get("http://localhost:8080/api/users/count-today", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          setNewMembersToday(response.data);
        })
        .catch((error) => {
          console.error("오늘 가입한 회원 수를 불러오는 데 실패했습니다.", error);
        });
    }
  }, [isAuthorized]);

  // 카페 승인 처리
  const approveCafe = (cafeId) => {
    const token = localStorage.getItem("token");
    axios
      .post(`http://localhost:8080/cafes/${cafeId}/approve`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        alert("카페가 승인되었습니다.");
        setPendingCafes((prevCafes) => prevCafes.filter((cafe) => cafe.id !== cafeId));
      })
      .catch((error) => {
        console.error("카페 승인에 실패했습니다.", error);
        alert("카페 승인에 실패했습니다.");
      });
  };

  // 카페 거절 처리
  const rejectCafe = (cafeId) => {
    const token = localStorage.getItem("token");
    axios
      .post(`http://localhost:8080/cafes/${cafeId}/reject`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        alert("카페가 거절되었습니다.");
        setPendingCafes((prevCafes) => prevCafes.filter((cafe) => cafe.id !== cafeId));
      })
      .catch((error) => {
        console.error("카페 거절에 실패했습니다.", error);
        alert("카페 거절에 실패했습니다.");
      });
  };

  // 페이지 이동 처리
  const handlePageClick = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="admin-board">
      {/* 사이드바 */}
      <div className="sidebar-allbox">
        <Sidebar />
      </div>

      {/* 메인 컨텐츠 */}
      <div className="main-content">
        <h1 className="main-h1">카페연구소 관리자 대시보드</h1>
        <div className="dashboard-cards">
          <div className="card-card-1">
            <h3>전체 회원</h3>
            <p>{totalMembers !== null ? `${totalMembers}명` : "로딩중..."}</p>
          </div>
          <div className="card-card-2">
            <h3>신규 가입</h3>
            <p>{newMembersToday !== null ? `${newMembersToday}명` : "로딩중..."}</p>
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
            {Array.isArray(pendingCafes) && pendingCafes.length > 0 ? (
              paginatedCafes.map((cafe, index) => (
                <tr key={cafe.id} className="list-tr">
                  <td>{totalCafes - (startIndex + index)}</td>
                  <td>{cafe.title}</td>
                  <td>{cafe.name}</td>
                  <td>{cafe.regDate}</td>
                  <td>
                    <button onClick={() => approveCafe(cafe.id)}>승인</button>
                    <button className="delete-btn" onClick={() => rejectCafe(cafe.id)}>거절</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">대기 중인 카페가 없습니다.</td>
              </tr>
            )}
          </tbody>
        </table>

        <div className="pagination">
          <button
            className="prev-btn"
            disabled={currentPage === 1}
            onClick={() => handlePageClick(currentPage - 1)}
          >
            이전
          </button>
          {[...Array(totalPages)].map((_, index) => (
            <span
              key={index}
              className={currentPage === index + 1 ? "active" : ""}
              onClick={() => handlePageClick(index + 1)}
            >
              {index + 1}
            </span>
          ))}
          <button
            className="next-btn"
            disabled={currentPage === totalPages}
            onClick={() => handlePageClick(currentPage + 1)}
          >
            이후
          </button>
        </div>
      </div>
    </div>
  );
};

export default Admin;
