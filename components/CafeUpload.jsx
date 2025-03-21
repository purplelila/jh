import { useState, useContext } from "react";
import { CafeContext } from "./CafeProvider";
import { useNavigate } from "react-router-dom";

let CafeUpload = () => {
    let {addCafe} = useContext(CafeContext)
  
    const [imgURL, setImgURL] = useState(null); // 이미지 URL을 저장
    const [imgName, setImgName] = useState(""); // 이미지 파일명을 저장
    // const [img, setImg] = useState(null)
    const [name, setName] = useState("")
    const [work, setWork] = useState("")
    const [title, setTitle] = useState("")
    const [place, setPlace] = useState("")
    const [content, setContent] = useState("")

    const navigate = useNavigate()

    // img 업로드
    let handleImageChange = (e) => {
      let file = e.target.files[0];
  
      if (file) {
        //setImg(URL.createObjectURL(file));        // url 로 저장
        setImgURL(URL.createObjectURL(file)); // 이미지 URL 저장
        setImgName(file.name); // 파일명 저장
      }
    }
  
    function handleSubmit(e){
      e.preventDefault()

      if(!name){
        alert("작성자를 입력해주세요.");
        return;
      }

      if(!title){
        alert("매장명을 입력해주세요.");
        return;
      }

      if(!work){
        alert("영업일을 입력해주세요.");
        return;
      }

      if(!place){
        alert("카페 위치를 입력해주세요.");
        return;
      }

      if(!content){
        alert("내용을 입력해주세요.");
        return;
      }

      if(!imgURL){
        alert("이미지를 선택해주세요.");
        return;
      }
      
      // 이미지를 addcafe에 전달
      addCafe(imgURL, imgName, work, title, place, content)
        
      navigate("/cafelist")
      
    }
  
    return(
      <div className='cafeupload-board'>
        <h2>카페 등록</h2>

        <div className="upload-form-container">
          <h3>카페 정보 작성</h3>
          <form onSubmit={handleSubmit}>
            <div className="upload-form-content">
              <div className="upload-form-form">
                <label>작성자</label>
                <input type="text" placeholder='작성자' onChange={(e)=> setName(e.target.value)} value={name}/>
              </div>
            
              <div className="upload-form-form">
                <label>매장명</label>
                <input type="text" placeholder='매장명' onChange={(e)=> setTitle(e.target.value)} value={title}/>
              </div>

              <div className="upload-form-form">
                <label>영업일</label>
                <input type="text" placeholder='영업일' onChange={(e)=> setWork(e.target.value)} value={work}/>
              </div>

              <div className="upload-form-form">
                <label>카페위치</label>
                <input type="text" placeholder='카페위치'onChange={(e)=> setPlace(e.target.value)} value={place}/>
              </div>

              <div className="upload-form-form">
                <label>소개글</label>
                <textarea placeholder='내용을 입력해주세요' onChange={(e)=> setContent(e.target.value)} value={content}></textarea>
              </div>

            </div>
            <div className="upload-form-img">
              <label>첨부파일</label>
              <div className="upload-form-input">
                <input type="file" accept="image/*" onChange={handleImageChange} style={{display:'none'}} id="file-upload"/>
                {/* 이미지 제목표시 */}
                <div className="upload-form-filename"><input type="text" value={imgName} disabled placeholder="선택된 파일이 없습니다."/></div>
                {/* 이미지 선택 버튼 */}
                <button type="button" className="upload-choose-file" onClick={()=> document.getElementById('file-upload').click()}>파일선택</button>
              </div>
            </div>

            <div className="upload-form-btn">
              <button type='submit'>게시글 등록</button>
            </div>
          </form>
        </div>
      </div>
    )
  }

  export default CafeUpload;