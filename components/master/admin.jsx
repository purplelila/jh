import React, { useState } from "react";
import { Link } from "react-router-dom";


const Admin = () => {
  const [openMenu, setOpenMenu] = useState({
    member: false,
    board: false
  });

  const toggleMenu = (menu) => {
    setOpenMenu((prev) => ({
      ...prev,
      [menu]: !prev[menu],
    }));
  };

  return (
    <div className="admin-board">
      {/* 사이드바 */}
      <div className="sidebar">
          <h2>관리자 메뉴</h2>
          <ul>
            <li><a href="/admin/1">대시보드</a></li>

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
            {[10, 9, 8].map((num) => (
              <tr key={num} className="list-tr">
                <td>{num}</td>
                <td>게시판 제목 {num}</td>
                <td>관리자</td>
                <td>2024-03-{20 - (10 - num)}</td>
                <td>
                  <button>승인</button>
                  <button className="delete-btn">거절</button>
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
