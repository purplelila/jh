import { useContext } from "react";
import { CafeContext } from "./CafeProvider";
import { Link } from "react-router-dom";

let CafeList = () => {
    let { cafes, deleteCafe } = useContext(CafeContext);

    return(
      <>
        <div>
          <h2>카페목록</h2>
          <Link to="/cafeupload">
          <button>등록하기</button>
          </Link>
          
          <div className='cafe-list'>
            {cafes.length === 0 ? "게시글이 없습니다." : (
              cafes.map((p, idx) => {
                return(
                  <div key={idx} className='cafe-item'>
                    <div className="cafe-item-img">
                      <p><img src={p.img} /></p>
                    </div>
                    <div className="cafe-item-text">
                      <h4>제목 : {p.title}</h4>
                      <p>{p.content}</p>
                      <span>카페위치 : {p.place}</span>
                    </div>
                    <button className='deleteBtn' onClick={()=> deleteCafe(p.id)}>삭제</button>
                  </div>
                )
              })
            )}
          </div>
        </div>
      </>
    )
  }

  export default CafeList;