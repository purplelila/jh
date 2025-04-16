import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";


const AdminList = () => {
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

  return (
    <div className="admin-bord-3-box">
      {/* 사이드바 */}
      <div className="admin-bord-sidebar-3">
        <h2>관리자 메뉴</h2>
        <ul>
          <li><a href="/admin/1">대시보드</a></li>

          {/* 회원 관리 드롭다운 */}
          <li>
            <div className="bord3-dropdown-header" onClick={() => toggleMenu("member")}>
              회원 관리
            </div>
            {openMenu.member && (
              <ul className="bord3-dropdown-list">
                <li className={location.pathname === "/admin/list-0" ? "active" : ""}>
                  <a href="/admin/list-0"> - 일반회원 목록</a>
                </li>
                <li className={location.pathname === "/admin/list-1" ? "active" : ""}>
                  <a href="/admin/list-1"> - 카페사장 목록</a>
                </li>
              </ul>
            )}
          </li>

          {/* 게시판 관리 드롭다운 */}
          <li>
            <div className="bord3-dropdown-header" onClick={() => toggleMenu("board")}>
              게시판 관리
            </div>
            {openMenu.board && (
              <ul className="bord3-dropdown-list">
                <li className={location.pathname === "/admin/Bord-1" ? "active" : ""}>
                  <a href="/admin/Bord-1"> - 공지사항 목록</a>
                </li>
                <li className={location.pathname === "/admin/Bord-2" ? "active" : ""}>
                  <a href="/admin/Bord-2"> - 자주 묻는 질문 목록</a>
                </li>
                <li className={location.pathname === "/admin/Bord-3" ? "active" : ""}>
                  <a href="/admin/Bord-3"> - 커뮤니티 목록</a>
                </li>
                <li className={location.pathname === "/admin/Bord-4" ? "active" : ""}>
                  <a href="/admin/Bord-4"> - 카페등록 목록</a>
                </li>
              </ul>
            )}
          </li>

          <li><a href="/admin/1">설정</a></li>
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
