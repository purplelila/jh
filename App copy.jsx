import { useState, useEffect } from 'react'
import './App.css'

function App() {

  return (
    <>
    {/* nav */}
    <nav className='nav'>
      <a href="#" className="nav-logo">CAFE LAB</a>
      <div className="nav-links">
        <a href="#">카페정보</a>
        <a href="#">커뮤니티</a>
        <a href="#">LOGIN</a>
      </div>
    </nav>

    {/* 등록, 검색 버튼 */}
    <div className='cafe-button'>
      {/* cafe-list button */}
      <button className='upload-btn'>
        등록
      </button>
      {/* 검색 창 및 버튼 */}
      <div className="search-cotainer">
        <input type="text" placeholder='카페를 입력하세요.' className='search-input'/>
        <button className='search-btn'>검색</button>
      </div>
    </div>

    {/* 이미지 및 내용, 상세보기 */}
    <div className='cafe-list'>
        <div className='cafe-card'>
          <img src={`https://placehold.co/300x200`} className='cafe-image' />
          <div className='cafe-info'>
            <div className="cafe-title">카페이름</div>
            <div className='cafe-description'>카페에 대한 상세 설명이 들어갑니다.</div>
            <a href="#" className='view'>상세보기 +</a>
          </div>
        </div>
    </div>

    {/* footer */}
    <footer className='footer'>
      <p>footer</p>
    </footer>


    </>
  )
}

export default App
