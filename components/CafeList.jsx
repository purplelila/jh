import { useContext } from "react";
import { CafeContext } from "./CafeProvider";
import { Link } from "react-router-dom";

let CafeList = () => {
    let { cafes } = useContext(CafeContext);

    return(
      <>
        <div className="cafelist-container">
          <h2>카페목록</h2>
          <div className="cafe-button">
            <div className="cafe-upload">
              <Link to="/cafeupload">
              <button>등록</button>
              </Link> 
            </div>
            <div className="search-cotainer">
              <input type="text" placeholder='카페를 입력하세요.' className='search-input' />
              <button className='search-btn'>검색</button>
            </div>
          </div>

          <div className='cafe-list'>
            {cafes.length === 0 ? "카페 정보가 없습니다." : (
              cafes.map((p, idx) => {
                return(
                  <div key={idx} className='cafe-item'>
                    <div className="cafe-item-img">
                      <p><img src={p.img} /></p>
                    </div>
                    <div className="cafe-item-text">
                      <h3>카페명 : {p.title}</h3>
                      <p>{p.content}</p>
                      <p>카페위치 : {p.place}</p>
                      <div className="cafe-item-detail">
                        <Link to={`/cafedetail/${p.id}`}>
                          <p>자세히 보기+</p>
                        </Link>
                      </div>
                    </div>
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