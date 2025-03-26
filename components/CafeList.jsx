import { useContext, useState, useEffect } from "react";
import { CafeContext } from "./CafeProvider";
import { Link } from "react-router-dom";

let CafeList = () => {
    let { cafes } = useContext(CafeContext);
    const [scrollTop, setScrollTop] = useState(false)
    const [numofRows, setNumOfRows] = useState(6)

    // 더보기 보여주는 갯수
    let loadMore = () => {
      setNumOfRows(prevNum => prevNum + 6);
    }

    let handleScroll = ()=>{
      if(window.scrollY > 300){
        setScrollTop(true)
      }else{
        setScrollTop(false)
      }
    }

    useEffect(()=>{
      window.addEventListener("scroll", handleScroll)
      return ()=> {window.removeEventListener("scroll", handleScroll)}
    }, [])

    let scrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      })
    }

    return(
      <>
      <div className="cafe-search">
        <div className="cafelist-top">
          <h2>ALL LISTINGS</h2>
          <div className="cafe-btn">
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
        </div>
      </div>

      <div className="cafelist-info">
        <div className='cafe-list'>
          {cafes.length === 0 ? "카페 정보가 없습니다." : (
            cafes.map((p, idx) => {
              if (idx < numofRows){
                return(
                  <div key={idx} className='cafe-item'>
                    <div className="cafe-item-img">
                      {/* 이미지 표시 */}
                      <Link to={`/cafedetail/${p.id}`}>
                        <p><img src={p.imgURL[0]} alt={p.imgName[0]}/></p>
                      </Link>
                    </div>
                    <div className="cafe-item-text">
                      <h3>{p.title}</h3>
                      <p>{p.content}</p>
                      {/* <p>{p.place}</p> */}
                      <div className="cafe-item-detail">
                        <Link to={`/cafedetail/${p.id}`}>
                          <p>자세히 보기+</p>
                        </Link>
                      </div>
                    </div>
                  </div>
                )
              }
              return null
            })
          )}
        </div>
        {cafes.length > 0 && (
          <button onClick={loadMore}>더보기</button>
        )}
      </div>

      {
      scrollTop && (<button className='scroll-to-top' onClick={scrollToTop}>위로</button>)
      }
      </>
    )
  }

  export default CafeList;