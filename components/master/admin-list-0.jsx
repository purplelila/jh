import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";

const AdminList = () => {
    const navigate = useNavigate();
  const location = useLocation();
  const [users, setUsers] = useState([]); // ← 서버에서 받아올 회원 데이터
  const [openMenu, setOpenMenu] = useState({
    member: false,
    board: false,
  });

  // 현재 경로에 따라 메뉴 자동으로 펼치기
  useEffect(() => {
    setOpenMenu({
      member: location.pathname.includes("/admin/list"),
      board: location.pathname.includes("/admin/Bord"),
    });
  }, [location]);

  useEffect(() => {
    axios.get("http://localhost:8080/api/users?userType=0")
      .then((response) => {
        setUsers(response.data); // 회원 리스트 저장
      })
      .catch((error) => {
        setError("회원 데이터를 불러오지 못했습니다.");
        console.error(error);
      });
  }, []);

  const toggleMenu = (menu) => {
    setOpenMenu((prev) => ({
      ...prev,
      [menu]: !prev[menu],
    }));
  };

  const [activePage, setActivePage] = useState(1);
  const handlePageClick = (page) => {
    setActivePage(page);
  };

  const renderRows = () => {
    return users.map((item, index) => (
      <tr key={index}>
        <td>{users.length - index}</td>
        <td>{item.userid}</td>
        <td>{item.username}</td>
        <td>{item.email}</td>
        <td>{item.nickname}</td>
        <td>{item.userType === 0 ? '일반회원' : item.userType === 1 ? '카페사장' : '관리자'}</td>
        <td> {new Date(item.createdAt).getFullYear()}-
             {('0' + (new Date(item.createdAt).getMonth() + 1)).slice(-2)}-
             {('0' + new Date(item.createdAt).getDate()).slice(-2)}
        </td>
        <td>
          <button className="list-rem-btn">수정</button>{" "}
          <button className="list-delete-btn">탈퇴</button>
        </td>
      </tr>
    ));
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
          <button className="prev-btn">이전</button>
          {[1, 2, 3].map((page) => (
            <span
              key={page}
              className={activePage === page ? "active" : ""}
              onClick={() => handlePageClick(page)}
            >
              {page}
            </span>
          ))}
          <button className="next-btn">이후</button>
        </div>
      </div>
    </div>
  );
};

export default AdminList;
