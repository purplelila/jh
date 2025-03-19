import { useContext, useState, useEffect } from "react";
import { CafeContext } from "./CafeProvider";
import { Link } from "react-router-dom";

let CafeList = () => {
    let { cafes } = useContext(CafeContext);
    const [scrollTop, setScrollTop] = useState(false)
    const [numofRows, setNumOfRows] = useState(4)

    let loadMore = () => {
      setNumOfRows(prevNum => prevNum + 4);
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
        <div className="cafelist-container">
          <div className="cafelist-top">
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
          </div>

          <div className='cafe-list'>
            {cafes.length === 0 ? "카페 정보가 없습니다." : (
              cafes.map((p, idx) => {
                if (idx < numofRows){
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
                }
                return null
              })
            )}
          </div>
          <button className='load-more' onClick={loadMore}>더보기</button>

          {
          scrollTop && (<button className='scroll-to-top' onClick={scrollToTop}>위로</button>)
          }
        </div>
      </>
    )
  }

  export default CafeList;