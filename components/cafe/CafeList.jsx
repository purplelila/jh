import React from 'react';
import axios from "axios";

import { useContext, useState, useEffect } from "react";
import { CafeContext } from "../CafeProvider";
import { Link, useNavigate } from "react-router-dom";

let CafeList = () => {
    let { cafes, setCafes, searchTerm, setSearchTerm, filteredData, setFilteredData } = useContext(CafeContext);
    const [scrollTop, setScrollTop] = useState(false)
    const [numofRows, setNumOfRows] = useState(6)

    // 카페 DB저장된거 보여지기
    useEffect(()=> {
      axios.get("http://localhost:8080/api/cafes")
      .then(res => {
        console.log("카페 리스트 확인:", res.data);
        setCafes(res.data);
        setFilteredData(res.data);
      })
      .catch(err => {
        console.error("카페 데이터 불러오기 실패:", err);
      });
  }, []);

  // 토큰 확인
  // useEffect(() => {
  //   // 로컬 스토리지에서 토큰 가져오기
  //   const token = localStorage.getItem("token");

  //   if (token) {
  //     console.log("저장된 JWT 토큰:", token);
  //   } else {
  //     console.log("JWT 토큰이 존재하지 않습니다.");
  //   }
  // }, []);

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
          <div className="breadcrumb-list">
            <span className="breadcrumb-list-home"><i class="fa-solid fa-house"></i></span>
            <span className="breadcrumb-list-arrow">&gt;</span>
            <span className="breadcrumb-list-info">카페정보</span>
          </div>
          <h2>
            <Link to={'/cafelist'} onClick={handleResetFilter}>CAFE LISTINGS</Link>
          </h2>
          <div className="cafe-btn">
            <div className="cafe-upload">

                  <Link to={'/cafeupload'} className="cafe-upload-button">등록</Link>

            </div>
            <div className="search-cotainer">
              <input type="text" placeholder='카페를 입력하세요.' className='cafesearch-input' onChange={(e)=> setSearchTerm(e.target.value)} value={searchTerm}/>
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
                        <p><img src={p.imgURLs && p.imgURLs.length > 0 ? p.imgURLs[0] : "/default-image.jpg"} /></p>
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