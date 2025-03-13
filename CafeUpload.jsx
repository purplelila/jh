import { useState, useContext } from "react";
import { CafeContext } from "./CafeProvider";
import { useNavigate } from "react-router-dom";

let CafeUpload = () => {
    let {addCafe} = useContext(CafeContext)
  
    const [img, setImg] = useState("")
    const [title, setTitle] = useState("")
    const [place, setPlace] = useState("")
    const [content, setContent] = useState("")

    const navigate = useNavigate()

    // img 업로드
    let handleImageChange = (e) => {
      let file = e.target.files[0];
  
      if (file) {
        let imageUrl = URL.createObjectURL(file);
        setImg(imageUrl);
      }
    }
  
    function handleSubmit(e){
      e.preventDefault()

      if(img && title && place && content){
        addCafe(img, title, place, content)
        
        navigate("/cafelist")
      }
    }
  
    return(
      <div className='board'>
        <h2>카페 등록 폼</h2>

        <div className="form-container">
          <h3>게시판 글 작성하기</h3>
          <form onSubmit={handleSubmit}>
            <input type="file" accept="image/*" onChange={handleImageChange}/>
              {/* 이미지 미리보기 */}
              {img && <img src={img} alt="미리보기" width="100" />}
            <input type="text" placeholder='제목' onChange={(e)=> setTitle(e.target.value)} value={title}/>
            <input type="text" placeholder='카페위치'onChange={(e)=> setPlace(e.target.value)} value={place}/>
            <textarea placeholder='내용' onChange={(e)=> setContent(e.target.value)} value={content}></textarea>
            <button type='submit'>게시글 등록</button>
          </form>
        </div>
      </div>
    )
  }

  export default CafeUpload;