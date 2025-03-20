import { useState, useContext } from "react";
import { CafeContext } from "./CafeProvider";
import { useNavigate } from "react-router-dom";

let CafeUpload = () => {
    let {addCafe} = useContext(CafeContext)
  
    const [img, setImg] = useState("")
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
        
        setImg(file.name);
      }
    }
  
    function handleSubmit(e){
      e.preventDefault()

      if(img && work && title && place && content && name){
        addCafe(img, work, title, place, content)
        
        navigate("/cafelist")
      }
    }
  
    return(
      <div className='board'>
        <h2>카페 등록</h2>

        <div className="form-container">
          <h3>카페 정보 작성</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-content">
              <div className="form-form">
                <label>작성자</label>
                <input type="text" placeholder='작성자' onChange={(e)=> setName(e.target.value)} value={name}/>
              </div>
            
              <div className="form-form">
                <label>매장명</label>
                <input type="text" placeholder='매장명' onChange={(e)=> setTitle(e.target.value)} value={title}/>
              </div>

              <div className="form-form">
                <label>영업일</label>
                <input type="text" placeholder='영업일' onChange={(e)=> setWork(e.target.value)} value={work}/>
              </div>

              <div className="form-form">
                <label>카페위치</label>
                <input type="text" placeholder='카페위치'onChange={(e)=> setPlace(e.target.value)} value={place}/>
              </div>

              <div className="form-form">
                <label>소개글</label>
                <textarea placeholder='내용을 입력해주세요' onChange={(e)=> setContent(e.target.value)} value={content}></textarea>
              </div>

            </div>
            <div className="form-img">
              <label>첨부파일</label>
              <div className="form-input">
                <input type="file" accept="image/*" onChange={handleImageChange} style={{display:'none'}} id="file-upload"/>
                {/* 이미지 제목표시 */}
                <div className="form-filename"><input type="text" value={img} disabled placeholder="선택된 파일이 없습니다."/></div>
                {/* 이미지 선택 버튼 */}
                <button type="button" className="choose-file" onClick={()=> document.getElementById('file-upload').click()}>파일선택</button>
              </div>
            </div>

            <div className="form-btn">
              <button type='submit'>게시글 등록</button>
            </div>
          </form>
        </div>
      </div>
    )
  }

  export default CafeUpload;