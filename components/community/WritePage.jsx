import React, { useContext, useState, useEffect } from "react";
import { CafeContext } from "../CafeProvider";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import Tabs from "../community/Tabs";
import axios from "axios";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { parse } from 'node-html-parser';

const WritePage = () => {
  const { addBoard } = useContext(CafeContext);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState([]);
  const [imageFiles, setImageFiles] = useState([]);
  const [nickname, setNickname] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { category } = useParams();

  function CustomUploadAdapterPlugin(editor) {
    editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
      return new CustomUploadAdapter(loader);
    };
  }

  class CustomUploadAdapter {
    constructor(loader) {
      this.loader = loader;
    }

    upload() {
      return this.loader.file.then(file => {
        const formData = new FormData();
        formData.append('upload', file);

        return fetch('http://localhost:8080/api/board/image-upload', {
          method: 'POST',
          body: formData
        })
          .then(response => response.json())
          .then(result => {
            setImageFiles(prev => [...prev, file]);
            return {
              default: `http://localhost:8080${result.url}`
            };
          })
          .catch(err => {
            console.error("이미지 업로드 실패:", err);
            return Promise.reject(err);
          });
      });
    }
    abort() {}
  }

  const parseContent = (htmlContent) => {
    const root = parse(htmlContent);
    let placeholderHtml = htmlContent;
    const images = [];

    root.querySelectorAll('img').forEach((img, idx) => {
      const src = img.getAttribute('src');
      const outer = img.toString();
      const placeholder = `[[IMG${idx}]]`;
      placeholderHtml = placeholderHtml.replace(outer, placeholder);
      images.push(src);
    });

    return {
      textContent: placeholderHtml,
      images
    };
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      console.log("저장된 JWT 토큰:", token);
    } else {
      console.log("JWT 토큰이 존재하지 않습니다.");
    }

    const storedNickname = localStorage.getItem("nickname");
    if (storedNickname) {
      setNickname(storedNickname); // ✅ 수정된 부분
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token"); // ✅ 추가된 부분

    const { textContent, images } = parseContent(content);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("textContent", textContent);
    formData.append("imageUrls", JSON.stringify(images));
    formData.append("nickname", nickname);

    files.forEach((file) => {
      formData.append("files", file);
    });

    imageFiles.forEach((file) => {
      formData.append("imageFiles", file);
    });

    try {
      await axios.post(`/api/board/${category}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        },
      });
      alert('게시글 등록 성공!');
      navigate(`/${category}`);
    } catch (error) {
      console.error("게시물 등록 실패:", error);
    }
  };

  const handleFileChange = (e) => {
    setFiles([...e.target.files]);
  };

  const handleCancel = () => {
    navigate(`/${category}`);
  };

  return (
    <>
      <Tabs activeTab={location.pathname} />
      <div className="add-board-wrapper">
        <h1 className="form-title">게시물 등록</h1>
        <form className="form-container" onSubmit={handleSubmit}>
          <div className="file-title">
            <label htmlFor="title">제목</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="제목을 입력하세요"
              required
            />
          </div>

          <div className="file-content">
            <label htmlFor="content">내용</label>
            <CKEditor
              editor={ClassicEditor}
              data={content}
              config={{
                extraPlugins: [CustomUploadAdapterPlugin],
              }}
              onChange={(event, editor) => {
                const data = editor.getData();
                setContent(data);
              }}
            />
          </div>

          <div className="file-upload">
            <label htmlFor="file">첨부 파일</label>
            <input
              type="file"
              id="file"
              multiple
              onChange={handleFileChange}
            />
          </div>

          <div className="button-group">
            <button type="button" className="cancel-btn" onClick={handleCancel}>취소</button>
            <button type="submit" className="submit-btn">등록</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default WritePage;
