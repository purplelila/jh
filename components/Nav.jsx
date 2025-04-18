import React from 'react';


import { useContext } from "react";
import { Link, useLocation,matchPath } from "react-router-dom";
import { CafeContext } from "./CafeProvider";

let Nav = () => {
 
  // store랑 community 경로마다 배경 이미지 및 텍스트 설정
  const location = useLocation()
  const {handleResetFilter} = useContext(CafeContext)

  // 기본값 설정
  let heroImage;
  let heroText = {title:'', subtitle:''}

  if (location.pathname == '/cafelist' || location.pathname == '/cafeupload' || location.pathname.startsWith('/cafedetail/') || location.pathname.startsWith('/cafeedit/')){
    heroImage = 'url(/c6.jpg)';
    heroText = {
      title : 'STORE',
      subtitle : '좋은 커피와 서비스를 제공하는 카페 정보를 제공합니다'
    }
  } else if (location.pathname === '/notice' || location.pathname === '/chat' || location.pathname === '/faq') {
    heroImage = `url(/c6.jpg)`;
    heroText = {
      title: 'COMMUNITY',
      subtitle: '정보를 공유하고 서로 의견을 주고받아보세요',
    };
  } else if (
    matchPath('/:category/add', location.pathname) || 
    matchPath('/:category/:postId', location.pathname)
  ) {
    heroImage = `url(/c6.jpg)`;
    heroText = {
      title: 'COMMUNITY',
      subtitle: '정보를 공유하고 서로 의견을 주고받아보세요'
    };
  }else{
    heroImage='';
    heroText = {title : '', subtitle : ''}
  }

  const hideHero = location.pathname ==='/mypage';

  return(
    <>
      <header>
        <nav>
            <div className="menu">
                <div className="menu-left">
                    <div className="menu-logo">
                      <Link to={'/'}>
                        <img src="/logo.png" alt="로고" />
                      </Link>
                    </div>
                    <div className="menu-store">
                      <Link to={'/cafelist'} onClick={handleResetFilter}>STORE</Link>
                      <Link to={'/notice'}>COMMUNITY</Link>
                    </div>
                </div>
                <div className="menu-right">
                  <div className="menu-login">
                    <Link to={'/login'}>LOGIN</Link>
                    <Link to={'/signup'}>JOIN</Link>
                    <Link to={'/mypage'}>MY PAGE</Link>
                  </div>
                  <div className="social-icons">
                    <a href='https://www.instagram.com/' target="_blank"><i class="fa-brands fa-instagram"></i></a>
                    <a href='https://www.facebook.com/' target="_blank"><i class="fa-brands fa-square-facebook"></i></a>
                    <a href='https://x.com/' target="_blank"><i class="fa-brands fa-square-x-twitter"></i></a>
                  </div>
                </div>
            </div>
        </nav>
      </header>

      {!hideHero && (
      <div className="hero" style={{backgroundImage:heroImage}}>
        <div className="hero-section">
            <div className="hero-content">
                <p>{heroText.title}</p>
                <p>{heroText.subtitle}</p>
            </div>
        </div>
      </div>
      )}
    </>      
    )
  }

export default Nav;