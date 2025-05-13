import { useNavigate, useParams } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { CafeContext } from "../CafeProvider";
import React from "react";
import axios from "axios";
import Tabs from "../community/Tabs";

function DetailPage() {
  const { category, postId } = useParams();
  const [post, setPost] = useState(null);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const navigate = useNavigate();

  const nickname = localStorage.getItem("nickname");
  const token = localStorage.getItem("token");

  const formatDate = (date) => {
    const d = new Date(date);
    return `${d.getFullYear()}. ${String(d.getMonth() + 1).padStart(2, "0")}. ${String(d.getDate()).padStart(2, "0")} ${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
  };

  useEffect(() => {
    const headers = token ? { Authorization: `Bearer ${token}` } : {};

    axios
      .get(`/api/board/${category}/${postId}`, { headers })
      .then((res) => {
        setPost(res.data);
        setComments(res.data.comments || []);
      })
      .catch((err) => console.error("게시글 로딩 실패:", err));
  }, [category, postId, token]);

  // 썸네일 이미지 처리
  useEffect(() => {
    if (!post) return;
    const contentEl = document.querySelector(".content");
    if (!contentEl) return;

    const originalImages = contentEl.querySelectorAll("img");

    originalImages.forEach((oldImg) => {
      const originalSrc = oldImg.src;

      const placeholder = document.createElement("div");
      placeholder.style.width = oldImg.width + "px";
      placeholder.style.height = oldImg.height + "px";
      placeholder.style.display = "inline-block";
      placeholder.style.background = "#eee";
      placeholder.style.borderRadius = "8px";

      oldImg.parentNode.insertBefore(placeholder, oldImg);
      oldImg.style.display = "none";

      const image = new Image();
      image.crossOrigin = "anonymous";
      image.src = originalSrc;

      image.onload = () => {
        const maxSize = 600;
        const scale = Math.min(maxSize / image.width, maxSize / image.height);
        const scaledWidth = image.width * scale;
        const scaledHeight = image.height * scale;

        const canvas = document.createElement("canvas");
        canvas.width = scaledWidth;
        canvas.height = scaledHeight;

        const ctx = canvas.getContext("2d");
        ctx.drawImage(image, 0, 0, scaledWidth, scaledHeight);

        const thumbnail = canvas.toDataURL("image/jpeg");

        const newImg = new Image();
        newImg.src = thumbnail;
        newImg.className = "thumbnail-image";
        newImg.style.maxWidth = "100%";
        newImg.style.borderRadius = "8px";

        placeholder.replaceWith(newImg);
      };
    });

    return () => {
      originalImages.forEach((img) => {
        img.onclick = null;
      });
    };
  }, [post]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!comment.trim()) return alert("댓글을 입력해주세요.");
    if (!token) return alert("로그인이 필요합니다.");

    try {
      await axios.post(
        `/api/comments/${postId}`,
        {
          author: nickname,
          comment: comment,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setComment("");

      const headers = token ? { Authorization: `Bearer ${token}` } : {};
      const res = await axios.get(`/api/board/${category}/${postId}`, {
        headers,
      });
      setPost(res.data);
      setComments(res.data.comments || []);
    } catch (err) {
      console.error("댓글 등록 실패:", err);
      alert("댓글 등록 중 오류가 발생했습니다.");
    }
  };

  const handleEditPost = () => {
    navigate(`/edit/${category}/${postId}`);
  };

  const handleDeletePost = async () => {
    const confirmDelete = window.confirm("정말로 게시글을 삭제하시겠습니까?");
    if (confirmDelete) {
      try {
        await axios.delete(`/api/board/${category}/${postId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        navigate(`/${category}`);
      } catch (err) {
        console.error("게시글 삭제 실패:", err);
        alert("게시글 삭제 중 오류가 발생했습니다.");
      }
    }
  };

  if (!post) return <p>게시글을 불러오는 중입니다...</p>;

  let html = post.textContent;
  const imageUrls = Array.isArray(post?.imageUrls) ? post.imageUrls : [];

  imageUrls.forEach((url, idx) => {
    const token = new RegExp(`\\[\\[IMG${idx}\\]\\]`, "g");
    const fullUrl = url.startsWith("http")
      ? url
      : `${window.location.origin}/api/images/${url}`;

    html = html.replace(token, `<img src="${fullUrl}" alt="이미지${idx}"/>`);
  });

  const isImageInHtml = html.includes("<img");

  const categoryLabel = {
  notice: "공지사항",
  chat: "소통창",
  faq: "자주하는 질문",
  };
  const categoryName = categoryLabel[category] || category; // 해당하는 한글이 없으면 원래 값을 사용

  return (
    <>
      <Tabs activeTab={category} setActiveTab={(tab) => navigate(`/${tab}`)} />

      <div className="main-container">
        <div className="breadcrumb-list-board">
            <span className="breadcrumb-list-home"><i class="fa-solid fa-house"></i></span>
            <span className="breadcrumb-list-arrow">&gt;</span>
            <span className="breadcrumb-list-info">{categoryName}</span>
            <span className="breadcrumb-list-arrow">&gt;</span>
            <span className="breadcrumb-list-info">{post?.title}</span>
        </div>
        <div className="title-section">
          <h2>{post.title}</h2>
          <div className="info">
            <span>작성자: {post.nickname}</span>
            <span>작성일: {formatDate(post.createDate)}</span>
          </div>

          {nickname && post.nickname && nickname === post.nickname && (
            <div className="edit-delete-buttons">
              <button onClick={handleEditPost}>수정</button>
              <button onClick={handleDeletePost}>삭제</button>
            </div>
          )}
        </div>

        {post.files?.length > 0 && (
          <div className="attached-files">
            <p>첨부파일:</p>
            <ul>
              {post.files.map((f, i) => (
                <li key={i}>
                  <a
                    href={`http://localhost:8080/api/board/download/${f.savedName}`}
                    download
                  >
                    {f.originalName}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="content" dangerouslySetInnerHTML={{ __html: html }} />

        {!isImageInHtml && imageUrls.length > 0 && (
          <div className="images">
            {imageUrls.map((url, idx) => (
              <img
                key={idx}
                src={
                  url.startsWith("http")
                    ? url
                    : `${window.location.origin}/api/images/${url}`
                }
                alt={`첨부이미지-${idx}`}
                className="thumbnail-image"
              />
            ))}
          </div>
        )}

        <div className="list-btn">
          <button onClick={() => navigate(`/${category}`)}>목록</button>
        </div>
      </div>

      <div className="comment-section">
        <h4>댓글</h4>

        <div className="commentlist-section">
          {comments.length === 0 ? (
            <p>댓글이 없습니다.</p>
          ) : (
            comments.map((c, i) => (
              <div className="comments" key={i}>
                <p className="com_author">{c.author}</p>
                <p className="com_comment">{c.comment}</p>
                <p className="com_time">{formatDate(c.createdAt)}</p>
              </div>
            ))
          )}
        </div>

        <form className="add-comment write-section" onSubmit={handleCommentSubmit}>
          <h4>댓글작성</h4>
          <textarea
            placeholder="댓글을 입력해주세요."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
          />
          <div className="write-btn">
            <button type="submit">등록</button>
          </div>
        </form>
      </div>
    </>
  );
}

export default DetailPage;
