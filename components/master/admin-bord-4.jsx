import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import Sidebar from "./sidebar";


const AdminList = () => {
  const navigate = useNavigate();
  const location = useLocation(); // 현재 경로 정보 가져오기
  const [pendingCafes, setPendingCafes] = useState([]);
  const [isAuthorized, setIsAuthorized] = useState(null);
  const [activePage, setActivePage] = useState(1);
  const [totalPages, setTotalPages] = useState(1); // 전체 페이지 수 상태
  const usersPerPage = 10; // 한 페이지에 보여줄 회원 수

  // ✅ 관리자 인증 체크
   useEffect(() => {
    const token = localStorage.getItem("token");
    const userType = parseInt(localStorage.getItem("userType"));
      
    if (!token || userType !== 3) {
      setIsAuthorized(false); // 상태만 설정
    } else {
      console.log("✅ 관리자 권한 확인 완료");
      setIsAuthorized(true);
        }
  }, []);



  // 승인 대기 중인 카페 목록 불러오기
  useEffect(() => {
    if (isAuthorized) {
      fetchPendingCafes(); // 카페 목록을 처음 불러옵니다.
    }
  }, [isAuthorized, activePage]);

  // 서버에서 카페 목록 불러오기
  const fetchPendingCafes = () => {
    const token = localStorage.getItem("token");
    axios.get("http://localhost:8080/cafes/", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((response) => {
        if (Array.isArray(response.data)) {
          setPendingCafes(response.data); // 응답이 배열일 경우 상태 업데이트
          setTotalPages(Math.ceil(response.data.length / usersPerPage)); // 전체 페이지 수 계산
        } else {
          console.error("카페 목록은 배열이어야 합니다.");
          setPendingCafes([]); // 배열이 아니면 빈 배열로 설정
        }
      })
      .catch((error) => {
        console.error("카페 목록을 불러오는 데 실패했습니다.", error);
        setPendingCafes([]); // 실패 시 빈 배열로 설정
      });
  };
  
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
          // 서버에서 승인이 반영되었으므로 해당 카페만 클라이언트에서 업데이트
          setPendingCafes(prevCafes =>
            prevCafes.map(cafe =>
              cafe.id === cafeId ? { ...cafe, approvalStatus: 'APPROVED' } : cafe
            )
          );
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
          
          // 서버에서 거절이 반영되었으므로 해당 카페만 클라이언트에서 업데이트
          setPendingCafes(prevCafes =>
            prevCafes.map(cafe =>
              cafe.id === cafeId ? { ...cafe, approvalStatus: 'REJECTED' } : cafe
            )
          );
        })
        .catch((error) => {
          console.error("카페 거절에 실패했습니다.", error);
          alert("카페 거절에 실패했습니다.");
        });
    };

  // 미리보기
  const handleView = (id) => {
    navigate(`/cafedetail/${id}`);
  };

  const handlePageClick = (page) => {
    setActivePage(page);
  };

  const renderRows = () => {
    // 카페를 최신순(내림차순)으로 정렬
    const sortedCafes = [...pendingCafes].sort((a, b) => new Date(b.regDate) - new Date(a.regDate));

    const indexOfLastCafe = activePage * usersPerPage;
    const indexOfFirstCafe = indexOfLastCafe - usersPerPage;
    const currentCafes = sortedCafes.slice(indexOfFirstCafe, indexOfLastCafe);

    return currentCafes.map((cafe, index) => (
      <tr key={cafe.id}>
        <td>{pendingCafes.length - (index + (activePage - 1) * usersPerPage)}</td>
        <td>{cafe.title}</td>
        <td>{cafe.name}</td>
        <td>{cafe.regDate}</td>
        <td>
        <button onClick={() => handleView(cafe.id)}>미리보기</button>
        </td>
        <td>
          {cafe.approvalStatus === 'PENDING' ? '대기' : 
          cafe.approvalStatus === 'APPROVED' ? '승인' : 
          cafe.approvalStatus === 'REJECTED' ? '거절' : ''}
        </td>
        <td>
          {cafe.approvalStatus === 'PENDING' && (
            <>
              <button onClick={() => approveCafe(cafe.id)}>승인</button>{" "}
              <button className="delete-btn" onClick={() => rejectCafe(cafe.id)}>거절</button>
            </>
          )}
        </td>
      </tr>
    ));
  };

  return (
    <div className="admin-board">
         {/* 사이드바 */}
         <div className="sidebar-allbox">
      <Sidebar />
    </div>

    {/* 메인 컨텐츠 */}
    <div className="mainlist-content">
        <h1 className="adminlist-h1">카페연구소 카페등록 목록</h1>

        <table className="admin-listboard-table">
          <thead>
            <tr>
              <th>번호</th>
              <th>카페이름</th>
              <th>작성자</th>
              <th>등록일자</th>
              <th>미리보기</th>
              <th>상태</th>
              <th>비고</th>
            </tr>
          </thead>
          <tbody>{renderRows()}</tbody>
        </table>

        <div className="pagination">
        <button className="prev-btn"   disabled={activePage === 1} onClick={() => handlePageClick(activePage - 1)} >이전</button>
          {[...Array(totalPages)].map((_, index) => (
              <span
                key={index}
                className={activePage === index + 1 ? "active" : ""}
                onClick={() => handlePageClick(index + 1)}
              >
                {index + 1}
              </span>
          ))}
          <button className="next-btn" disabled={activePage === totalPages} onClick={() => handlePageClick(activePage + 1)}>이후</button>
        </div>
      </div>
    </div>
  );
};

export default AdminList;
