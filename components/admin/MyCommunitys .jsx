import React, { useState, useEffect, useParams } from "react";
import { useNavigate } from "react-router-dom"; // useNavigate import
import "../../style/admin/MyCommunitys.css"; 
import axios from "axios";

const MyCommunitys = () => {
  const [myPosts, setMyPosts] = useState([]);
  const [myComments, setMyComments] = useState([]);

  const token = localStorage.getItem("token");
  const nickname = localStorage.getItem("nickname");

  const navigate = useNavigate(); // navigate 훅 사용

  // 작성 시간 통일
  const formatDate = (dateString) => {
    const date = new Date(dateString);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  };

  // 내가 쓴 글 가져오기
  useEffect(() => {
    axios.get("/api/board", {
      headers: { Authorization: `Bearer ${token}` },
    }).then((res) => {
      console.log("전체 글 데이터:", res.data);
      const myPosts = res.data.filter(post => post.nickname === nickname);
      setMyPosts(myPosts);
    })
    .catch((err) => {
      console.error("게시글 불러오기 실패", err);
    });
  }, [token, nickname]);

  // 내가 쓴 댓글 가져오기
  useEffect(() => {
    if (!nickname || !token) {
      console.log("nickname 또는 token이 없음:", nickname, token);
      return;
    }

    axios.get("/api/comments/user", {
      params: { nickname },
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => {
      console.log("내 댓글 목록:", res.data);
      setMyComments(res.data);
    })
    .catch((err) => {
      console.error("내 댓글 불러오기 실패", err);
    });
  }, [nickname, token]);

  // 게시글 상세보기로 새 창으로 이동
  const handlePostDetail = (postId) => {
    window.open(`/chat/${postId}`, "_blank"); // 새 창에서 게시글 상세보기 페이지로 이동
  };

  // 댓글 상세보기로 새 창으로 이동
  const handleCommentDetail = (postId) => {
    window.open(`/chat/${postId}`, "_blank"); // 새 창에서 댓글이 속한 게시글 상세보기 페이지로 이동
  };

  return (
    <>
    <div className="mypage-content">
      <h2 className="mypage-h2">내가 쓴 게시글</h2>
      <table>
        <thead>
          <tr>
            <th>번호</th>
            <th>제목</th>
            <th>작성일</th>
            <th>상세보기</th>
          </tr>
        </thead>
        <tbody>
          {myPosts.map((post, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{post.title}</td>
              <td>{formatDate(post.createDate)}</td>
              <td>
                <button onClick={() => handlePostDetail(post.id)}>상세보기</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
      
    <div className="mypage-comment">
      <h2 className="mypage-h2">내가 쓴 댓글</h2>
      <table>
        <thead>
          <tr>
            <th>번호</th>
            <th>댓글 내용</th>
            <th>작성일</th>
            <th>상세보기</th>
          </tr>
        </thead>
        <tbody>
          {myComments.map((comment, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{comment.comment}</td>
              <td>{formatDate(comment.createdAt)}</td>
              <td>
                <button onClick={() => handleCommentDetail(comment.postId)}>상세보기</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </>
  );
};

export default MyCommunitys;
