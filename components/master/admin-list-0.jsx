import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Sidebar from "./sidebar";

const AdminList = () => {
  const [users, setUsers] = useState([]); // ← 서버에서 받아올 회원 데이터
  const [isAuthorized, setIsAuthorized] = useState(null); // ← 이거 추가!!
  const navigate = useNavigate();
  const [activePage, setActivePage] = useState(1);
  const [totalPages, setTotalPages] = useState(1); // 전체 페이지 수 상태
  const usersPerPage = 10; // 한 페이지에 보여줄 회원 수
  const [editingUserId, setEditingUserId] = useState(null);
  const [editedUserType, setEditedUserType] = useState(null);

  const handlePageClick = (page) => {
    setActivePage(page);
  };

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
  
  useEffect(() => {
    if (isAuthorized === false) {
      alert("정상적인 접근경로가 아닙니다.");
      navigate("/login"); // navigate는 따로!
    }
  }, [isAuthorized, navigate]);
  useEffect(() => {
    axios.get("http://localhost:8080/api/users?userType=0")
      .then((response) => {
        setUsers(response.data); // 회원 리스트 저장
        // 전체 회원 수로 총 페이지 수 계산
        const totalUsers = response.data.length;
        const totalPagesCalculated = Math.ceil(totalUsers / usersPerPage); // 전체 페이지 수 계산
        setTotalPages(totalPagesCalculated); // 총 페이지 수 상태 업데이트
      })
      .catch((error) => {
        console.error("회원 데이터를 불러오지 못했습니다.", error);
        alert("회원 데이터를 불러오지 못했습니다."); // 오류 메시지 표시
      });
  }, []);


  // 수정 또는 저장 핸들러
  const handleEditClick = (item) => {
    if (editingUserId === item.userid) {
      // 저장 버튼 클릭 시
      axios
        .put(`http://localhost:8080/api/users/${item.userid}`, {
          ...item,
          userType: editedUserType,
        })
        .then((response) => {
          alert("수정되었습니다.");
  
          // 👉 userType이 바뀌었으면 그에 맞는 목록으로 이동
          setEditingUserId(null);
          setEditedUserType(null);
  
          // 필터링된 userType으로 다시 호출 (예: 0은 일반회원, 1은 카페사장)
          axios
            .get(`http://localhost:8080/api/users?userType=${editedUserType}`)
            .then((res) => {
              setUsers(res.data);
  
              // 페이지 관련 값도 다시 계산
              const totalUsers = res.data.length;
              const totalPagesCalculated = Math.ceil(totalUsers / usersPerPage);
              setTotalPages(totalPagesCalculated);
              setActivePage(1); // 첫 페이지로 이동
            });
        })
        .catch((error) => {
          console.error("수정 실패", error);
          alert("수정 중 오류가 발생했습니다.");
        });
    } else {
      // 수정 버튼 클릭 시
      setEditingUserId(item.userid);
      setEditedUserType(item.userType);
    }
  };

    // ✨ 삭제 핸들러 추가
    const handleDelete = (userid) => {
      const confirmDelete = window.confirm("정말 탈퇴시키시겠습니까?");
      if (confirmDelete) {
        axios.delete(`http://localhost:8080/api/users/${userid}`)
          .then(() => {
            alert("탈퇴 처리되었습니다.");
            // 탈퇴 후 회원 목록에서 해당 회원을 제거
            const updatedUsers = users.filter((user) => user.userid !== userid);
            setUsers(updatedUsers);
    
            // 새로운 전체 페이지 수 계산
            const totalUsers = updatedUsers.length;
            const totalPagesCalculated = Math.ceil(totalUsers / usersPerPage);
            setTotalPages(totalPagesCalculated);
    
            // 현재 페이지가 총 페이지 수보다 클 경우, 마지막 페이지로 이동
            if (activePage > totalPagesCalculated) {
              setActivePage(totalPagesCalculated); // 마지막 페이지로 설정
            }
          })
          .catch((error) => {
            console.error("삭제 실패", error);
            alert("삭제 중 오류가 발생했습니다.");
          });
      }
    };

    const renderRows = () => {
      // 현재 페이지에 맞는 회원 리스트 추출
      const startIndex = (activePage - 1) * usersPerPage;
      const endIndex = startIndex + usersPerPage;
      const usersOnCurrentPage = users.slice().reverse().slice(startIndex, endIndex); // reverse()로 순서 반전
    
      return usersOnCurrentPage.map((item, index) => (
        <tr key={index}>
          <td>{users.length - (startIndex + index)}</td>
          <td>{item.userid}</td>
          <td>{item.username}</td>
          <td>{item.email}</td>
          <td>{item.nickname}</td>
          <td>
            {editingUserId === item.userid ? (
            <select value={editedUserType} onChange={(e) => setEditedUserType(parseInt(e.target.value))}>
              <option value={0}>일반회원</option>
              <option value={1}>카페사장</option>
            </select>
            ) : item.userType === 0 ? ( "일반회원") : item.userType === 1 ? ("카페사장") : ("관리자")}
          </td>
          <td> {new Date(item.createdAt).getFullYear()}-
               {('0' + (new Date(item.createdAt).getMonth() + 1)).slice(-2)}-
               {('0' + new Date(item.createdAt).getDate()).slice(-2)}
          </td>
          <td>
          <button className="list-rem-btn" onClick={() => handleEditClick(item)} >
            {editingUserId === item.userid ? "저장" : "변경"}
            </button>{" "}
            <button className="list-delete-btn" onClick={() => handleDelete(item.userid)}>탈퇴</button>
          </td>
        </tr>
      ));
    };

  return (
    <div className="admin-board">
         {/* 사이드바 */}
         <div className="sidebar-allbox-main">
      <Sidebar />
     </div>

      {/* 메인 컨텐츠 */}
      <div className="mainlist-content">
        <h1 className="adminlist-h1">카페연구소 일반회원 관리 목록</h1>

        <table className="admin-listboard-table">
          <thead>
            <tr>
              <th>번호</th>
              <th>아이디</th>
              <th>이름</th>
              <th>이메일</th>
              <th>닉네임</th>
              <th>회원분류</th>
              <th>가입일자</th>
              <th>비고</th>
            </tr>
          </thead>
          <tbody>{renderRows()}</tbody>
        </table>

        <div className="pagination">
          <button className="prev-btn"   disabled={activePage === 1} onClick={() => handlePageClick(activePage - 1)} ><i class="fas fa-angle-left"></i>  </button>
          {[...Array(totalPages)].map((_, index) => (
              <span
                key={index}
                className={activePage === index + 1 ? "active" : ""}
                onClick={() => handlePageClick(index + 1)}
              >
                {index + 1}
              </span>
          ))}
          <button className="next-btn" disabled={activePage === totalPages} onClick={() => handlePageClick(activePage + 1)}><i class="fas fa-angle-right"></i></button>
        </div>
      </div>
    </div>
  );
};

export default AdminList;
