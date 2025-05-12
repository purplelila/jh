import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Sidebar from "./sidebar";

const AdminList = () => {
  const [searchTerm, setSearchTerm] = useState("");   // 검색기능
  const [searchType, setSearchType] = useState("title"); // 기본은 제목 검색
  const [searchTriggered, setSearchTriggered] = useState(false); // 검색 버튼 눌러야 활성화
  const [posts, setPosts] = useState([]); // 게시물 데이터를 저장할 상태
  const [activePage, setActivePage] = useState(1);
  const [totalPages, setTotalPages] = useState(1); // 전체 페이지 수 상태
  const usersPerPage = 10; // 한 페이지에 보여줄 회원 수

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

    // 페이지네이션 계산
    const indexOfLastCafe = activePage * usersPerPage;
    const indexOfFirstCafe = indexOfLastCafe - usersPerPage;
    const currentPosts = posts.slice(indexOfFirstCafe, indexOfLastCafe);

  const handlePageClick = (page) => {
    setActivePage(page);
  };

  // 게시물 목록을 가져오는 함수 (API 요청)
    const token = localStorage.getItem("token");
    const fetchPosts = async () => {
      try {
        const response = await fetch("/api/board", {
          headers: {
            'Authorization': `Bearer ${token}`
        }
        });
        const data = await response.json();
        console.log("받은 게시물 데이터:", data); // ✅ 여기에서 확인
  
        // "공지사항" 카테고리만 필터링
        const filteredPosts = data.filter((post) => post.category === "chat");
  
        // 게시물 데이터를 받아온 후, 내림차순으로 정렬
        const sortedPosts = filteredPosts.sort((a, b) => new Date(b.createDate) - new Date(a.createDate));
  
        setPosts(sortedPosts); // 받은 데이터를 상태에 저장
  
        // 전체 페이지 수 계산 (게시물 수 / 페이지당 게시물 수)
        setTotalPages(Math.ceil(sortedPosts.length / usersPerPage));
      } catch (error) {
        console.error("게시물 데이터를 불러오는 데 실패했습니다:", error);
      }
    };
  
    useEffect(() => {
      fetchPosts(); // 컴포넌트가 처음 렌더링될 때 게시물 데이터를 가져옴
    }, []);
  
    const renderRows = () => {
      let filteredPosts = posts;
  
      // 검색 필터링 적용
      if (searchTriggered && searchTerm.trim() !== "") {
        filteredPosts = posts.filter((post) => {
          const valueToSearch = searchType === "title" ? post.title : post.nickname;
          return valueToSearch.toLowerCase().includes(searchTerm.toLowerCase());
        });
      }
      return currentPosts.map((item, index) => (
        <tr key={item.id}>
          <td>{posts.length - ((activePage - 1) * usersPerPage + index)}</td>
          <td>{item.title}</td>
          <td>{item.nickname}</td>
          <td>
              {
                new Date(item.createDate).getFullYear() + '-' + 
                ('0' + (new Date(item.createDate).getMonth() + 1)).slice(-2) + '-' + 
                ('0' + new Date(item.createDate).getDate()).slice(-2)
              }
          </td>
        <td>
          <button className="bord3-re-btn">수정</button>{" "}
          <button className="bord3-delete-btn">탈퇴</button>
        </td>
      </tr>
    ));
  };

  // 글쓰기
  const handleWriteClick = () => {
    navigate("/chat/add"); // ← 실제 경로로 수정
  };


      // 검색
      useEffect(() => {
        setSearchTriggered(false); // 검색어 바꾸면 검색 버튼 다시 눌러야 작동함
      }, [searchTerm, searchType]);

  return (
    <div className="admin-board">
    {/* 사이드바 */}
        <div className="sidebar-allbox-main">
          <Sidebar />
        </div>

      {/* 메인 컨텐츠 */}
      <div className="mainlist-bord3-content">
        <h1 className="adminbord3-h1">카페연구소 커뮤니티 목록</h1>

        <div className="admin-4-search-container">
          <select className="admin-4-search-select" value={searchType}  onChange={(e) => setSearchType(e.target.value)}>
            <option value="title">게시물 제목</option>
            <option value="name">작성자</option>
          </select>
          <input type="text" className="admin-4-search-input" placeholder="검색어를 입력하세요" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/>
          <button className="admin-4-search-btn" onClick={() => {setSearchTriggered(true); setActivePage(1);}}>
            검색
          </button>
        </div>

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

          {/* 글쓰기 버튼 추가 */}
          <div className="write-button-container">
            <button className="admin-write-btn" onClick={handleWriteClick}>글쓰기</button>
          </div>

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
