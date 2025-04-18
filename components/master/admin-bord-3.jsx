import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const AdminList = () => {
    const navigate = useNavigate();
  const location = useLocation(); // ✅ 현재 경로 정보 가져오기
  const [openMenu, setOpenMenu] = useState({
    member: false,
    board: false
  });
  
     useEffect(() => {
        setOpenMenu({
          member: location.pathname.includes("/admin/list"),
          board: location.pathname.includes("/admin/Bord"),
        });
      }, [location.pathname]);

  const toggleMenu = (menu) => {
    setOpenMenu((prev) => ({
      ...prev,
      [menu]: !prev[menu]
    }));
  };
  const [activePage, setActivePage] = useState(1);

  const handlePageClick = (page) => {
    setActivePage(page);
  };

  const renderRows = () => {
    const data = [
      { id: 10, title: "admin", author: "실험용",  date : "2025-04-09"},
      { id: 10, title: "admin", author: "실험용",  date : "2025-04-09"},
      { id: 10, title: "admin", author: "실험용",  date : "2025-04-09"},
      { id: 10, title: "admin", author: "실험용",  date : "2025-04-09"},
      { id: 10, title: "admin", author: "실험용",  date : "2025-04-09"}
    ];

    return data.map((item) => (
      <tr key={item.id}>
        <td>{item.id}</td>
        <td>{item.title}</td>
        <td>{item.author}</td>
        <td>{item.date}</td>
        <td>
          <button className="bord3-re-btn">수정</button>{" "}
          <button className="bord3-delete-btn">탈퇴</button>
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
      <div className="mainlist-bord3-content">
        <h1 className="adminbord3-h1">카페연구소 커뮤니티 목록</h1>

        <table className="admin-listboard-table-3">
          <thead>
            <tr>
              <th>번호</th>
              <th>게시물 제목</th>
              <th>작성자</th>
              <th>작성일자</th>
              <th>비고</th>
            </tr>
          </thead>
          <tbody>{renderRows()}</tbody>
        </table>

        <div className="pagination-bord-3">
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
