import { useState, useContext } from "react";
import { CafeContext } from "../CafeProvider";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import React from "react";

let CafeUpload = () => {
    let {addCafe} = useContext(CafeContext)
  
    const [imgURL, setImgURL] = useState([]);   // 이미지 URL을 저장
    const [imgName, setImgName] = useState([]); // 이미지 파일명을 저장
    const [images, setImagesFiles] = useState([]); // ✅ 이미지 파일 객체들 저장
    const [name, setName] = useState("")
    const [title, setTitle] = useState("")
    const [place, setPlace] = useState("")
    const [content, setContent] = useState("")
    const [sns, setSns] = useState("")
    const [phone, setPhone] = useState("")

    const [cafeHours, setCafeHours] = useState({
      월 : "",
      화 : "",
      수 : "",
      목 : "",
      금 : "",
      토 : "",
      일 : ""
    })

    const navigate = useNavigate()

    // 영업일 시간 입력
    const handleCafeHoursChange = (e) => {
      const{name, value} = e.target;
      setCafeHours((prev)=>({
        ...prev,
        [name] : value
      }))
    }

    // img 업로드 (파일 선택)
    let handleImageChange = (e) => {
      let files = Array.from(e.target.files);
  
      if (files.length + imgURL.length <=3) {
        const newImgURLs = files.map(file=> URL.createObjectURL(file))
        const newImgNames = files.map(file => file.name)

        setImagesFiles(prev => [...prev, ...files]); // ✅ 파일 객체 저장
        setImgURL(prevURLs => [...prevURLs, ...newImgURLs]); // 배열로 이미지 URL 저장
        setImgName(prevNames => [...prevNames, ...newImgNames]); // 배열로 파일명 저장
      }else{
        alert("3개의 이미지까지 선택가능합니다.")
      }
    }

    // img 업로드 (파일 드래그 앤 드롭)
    let handleDrop = (e) => {
      e.preventDefault();
      let files = Array.from(e.dataTransfer.files);
  
      if (files.length + imgURL.length <=3) {
        const newImgURLs = files.map(file=> URL.createObjectURL(file))  //blob URL 만들어서 미리보기 
        const newImgNames = files.map(file => file.name)

        setImagesFiles(prev => [...prev, ...files]); // ✅ 파일 객체 저장
        setImgURL(prevURLs => [...prevURLs, ...newImgURLs]); // 배열로 이미지 URL 저장
        setImgName(prevNames => [...prevNames, ...newImgNames]); // 배열로 파일명 저장
      }else{
        alert("3개의 이미지까지 선택가능합니다.")
      }
    }
  
    const handleSubmit = async (e) => {
      e.preventDefault()

      if(!name){
        alert("작성자를 입력해주세요.");
        return;
      }

      if(!title){
        alert("매장명을 입력해주세요.");
        return;
      }

      if(Object.values(cafeHours).some((hour) => !hour)){
        alert("영업일을 입력해주세요.");
        return;
      }

      if(!place){
        alert("카페 위치를 입력해주세요.");
        return;
      }

      if(!content){
        alert("내용을 50자 이내로 입력해주세요");
        return;
      }

      if(!phone){
        alert("가게연락처를 입력해주시요");
        return;
      }

      if(imgURL.length ===0){
        alert("이미지를 선택해주세요.");
        return;
      }
      

      // FormData 방식
      // 이미지 파일을 프론트에서 서버로 업로드 → 서버에 저장 → URL을 클라이언트에 전달 → DB에 저장
      const formData = new FormData();

      // 이미지 파일 첨부
      images.forEach(file => {
        formData.append("files", file);
      });

      const cafeData = {
        name,
        title,
        place,
        content,
        sns,
        phone,
        cafeHours,
        // imgURLs: imgURL,     // createObjectURL()로 만든 URL들
        // imgNames: imgName,
      };

      // JSON 문자열로 변환해 FormData에 추가
      formData.append("cafeData", JSON.stringify(cafeData));

      try {
        const response = await axios.post("http://localhost:8080/api/addCafe", formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        });

        const { imageUrls } = response.data; // ✅ 이제 정상적으로 응답에서 꺼낼 수 있어
        setImgURL(imageUrls); // blob → 정적 이미지 URL로 교체
        addCafe(imageUrls, imgName, cafeHours, title, place, content, phone, sns)   // 이미지를 addcafe에 전달

        alert("카페가 등록되었습니다!");
        navigate("/cafelist");
      } catch (error) {
        console.error("등록 실패", error);
        alert("카페 등록에 실패했습니다.");
      }





      
    }
  
    return(
      <div className='cafeupload-board'>
        <div className="breadcrumb-list">
          <span className="breadcrumb-list-home"><i class="fa-solid fa-house"></i></span>
          <span className="breadcrumb-list-arrow">&gt;</span>
          <span className="breadcrumb-list-info">카페정보</span>
          <span className="breadcrumb-list-arrow">&gt;</span>
          <span className="breadcrumb-list-info">카페등록</span>
        </div>
        <h2>카페 등록</h2>

        <div className="upload-form-container">
          <h3>카페 정보 작성</h3>
          <form onSubmit={handleSubmit}>
            <div className="upload-form-content">
              <div className="upload-form-cafe">
                <label>작성자<span className="upload-required">*</span></label>
                <input type="text" placeholder='작성자' onChange={(e)=> setName(e.target.value)} value={name}/>
              </div>
            
              <div className="upload-form-cafe">
                <label>매장명<span className="upload-required">*</span></label>
                <input type="text" placeholder='매장명을 입력해주세요' onChange={(e)=> setTitle(e.target.value)} value={title}/>
              </div>

              <div className="upload-form-cafe">
                <label>영업일<span className="upload-required">*</span></label>
                <div className="upload-cafehour">
                  {['월','화','수','목','금','토','일'].map((day,idx) =>(
                    <div key={idx} className="upload-cafehour-item">
                      <p>{day}</p>
                      <textarea type="text" placeholder='영업시간을 입력해주세요' onChange={handleCafeHoursChange}
                      value={cafeHours[day]} name={day} className="upload-cafehour-textarea"/>
                    </div>
                  ))}
                </div>
                </div>

              <div className="upload-form-cafe">
                <label>카페위치<span className="upload-required">*</span></label>
                <input type="text" placeholder='카페위치를 입력해주세요'onChange={(e)=> setPlace(e.target.value)} value={place}/>
              </div>

              <div className="upload-form-cafe">
                <label>연락처<span className="upload-required">*</span></label>
                <input type="text" placeholder='가게연락처를 입력해주세요'onChange={(e)=> setPhone(e.target.value)} value={phone}/>
              </div>

              <div className="upload-form-cafe">
                <label>SNS</label>
                <input type="text" placeholder='SNS 링크를 입력해주세요'onChange={(e)=> setSns(e.target.value)} value={sns}/>
              </div>

              <div className="upload-form-cafe">
                <label>소개글<span className="upload-required">*</span></label>
                <input type="text" placeholder='내용을 50자 이내로 입력해주세요' onChange={(e)=> setContent(e.target.value)} value={content} maxLength={50} />
              </div>

            </div>

            <div className="upload-form-img">
              <label>첨부파일<span className="upload-required">*</span></label>
              <div className="upload-form-input">
                <input type="file" accept="image/*" onChange={handleImageChange} style={{display:'none'}} id="file-upload" multiple/>
                {/* 이미지 제목표시 */}
                <div className="upload-form-filename" onDrop={handleDrop} onDragOver={(e)=> e.preventDefault()}>
                  <input type="text" value={imgName.length > 0 ? imgName.join(","): " 선택된 파일이 없습니다."} disabled placeholder="선택된 파일이 없습니다."/>
                </div>
                <p className="upload-form-imgtext">*파일(jpg, jpeg, fif, gif, tif, tiff, png, zip)은 최대 3개까지 선택 가능합니다.</p>
              </div>
              {/* 이미지 선택 버튼 */}
              <button type="button" onClick={()=> document.getElementById('file-upload').click()}>파일선택</button>
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