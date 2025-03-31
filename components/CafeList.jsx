import { useContext, useState, useEffect } from "react";
import { CafeContext } from "./CafeProvider";
import { Link, useNavigate } from "react-router-dom";

let CafeList = () => {
    let { cafes, searchTerm, setSearchTerm, filteredData, setFilteredData } = useContext(CafeContext);
    const [scrollTop, setScrollTop] = useState(false)
    const [numofRows, setNumOfRows] = useState(6)


    // const navigate = useNavigate()

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

    // const handleUploadClick = () => {
    //   navigate("/cafeupload");
    // }

    // 검색
    const handleSearch = ()=> {
      if(searchTerm){
        let filteredData = cafes.filter((item) => {
          let title = item.title ? item.title.toLowerCase():"";
          return title.includes(searchTerm.toLowerCase());
        })
        setFilteredData(filteredData);
      }else{
        setFilteredData(cafes)
      }
    }

    // 클릭시 검색 초기화
    const handleResetFilter = ()=> {
      setSearchTerm("");
      setFilteredData(cafes);
    }


    return(
      <>
      <div className="cafe-search">
        <div className="cafelist-top">
          <h2>
            <Link to={'/cafelist'} onClick={handleResetFilter}>ALL LISTINGS</Link>
          </h2>
          <div className="cafe-btn">
            <div className="cafe-upload">

                  <Link to={'/cafeupload'} className="cafe-upload-button">등록</Link>

            </div>
            <div className="search-cotainer">
              <input type="text" placeholder='카페를 입력하세요.' className='search-input' onChange={(e)=> setSearchTerm(e.target.value)} value={searchTerm}/>
              <button className='search-btn' onClick={handleSearch}>검색</button>
            </div>
          </div>
        </div>
      </div>

      <div className="cafelist-info">
        <div className='cafe-list'>
          {filteredData.length === 0 ? (
            searchTerm==="" ? (
              // 검색어 없을 때                     // 검색어 있을때 검색결과 없을때
            <p>카페 정보가 없습니다.</p> ): <p>검색된 카페 정보가 없습니다.</p>)
            : (
            filteredData.map((p, idx) => {
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
        {filteredData.length > 6 && (
          <button onClick={loadMore}>더보기</button>
        )}
      </div>

      {
      scrollTop && (<button className='scroll-to-top' onClick={scrollToTop}>
        <i class="fa-solid fa-chevron-up"></i></button>)
      }
      </>
    )
  }

  export default CafeList;