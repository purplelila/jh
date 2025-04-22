import React from 'react';


import { useContext, useEffect, useState } from "react";
import { NavLink ,Link, useLocation,matchPath } from "react-router-dom";
import { CafeContext } from "./CafeProvider";
import { useNavigate } from "react-router-dom";

let Nav = () => {
 
  // store랑 community 경로마다 배경 이미지 및 텍스트 설정
  const location = useLocation()
  const {handleResetFilter} = useContext(CafeContext)

  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, [location.pathname]); // 경로 바뀔 때마다 상태 다시 확인

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/login");
  };

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

  // STORE에 해당하는 모든 경로
  const isStoreActive = location.pathname.startsWith('/cafelist') ||
  location.pathname.startsWith('/cafeupload') ||
  location.pathname.startsWith('/cafeedit') ||
  location.pathname.startsWith('/cafedetail');

  // COMMUNITY 관련 경로들
  const isCommunityActive = (() => {
    const path = location.pathname;
    // `/login`, `/signup`, `/mypage` 같은 건 제외하고
    const excluded = ['/login', '/signup', '/mypage'];
    if (excluded.includes(path)) return false;
  
    // `/admin/...` 도 제외
    if (path.startsWith('/admin')) return false;
  
    // `/cafe...` 도 제외
    if (path.startsWith('/cafe')) return false;
  
    // 그 외의 1차 경로는 커뮤니티일 확률 높음
    const firstPath = path.split('/')[1];
    return ['notice', 'faq', 'free', 'event', 'chat'].includes(firstPath);
  })();

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
                      <NavLink to={'/cafelist'} onClick={handleResetFilter} className={`menu-link ${isStoreActive ? 'active' : ''}`}>
                        STORE
                      </NavLink>
                      <NavLink to={'/notice'} className={`menu-link ${isCommunityActive ? 'active' : ''}`}>
                        COMMUNITY
                      </NavLink>
                    </div>
                </div>
                <div className="menu-right">
                  <div className="menu-login">
                  {isLoggedIn ? (
                  <>
                    <Link to="#" onClick={(e) => {e.preventDefault(); handleLogout();}}>LOGOUT</Link>
                    <Link to={"/mypage"}>MY PAGE</Link>
                  </>
                ) : (
                  <>
                    <Link to={"/login"}>LOGIN</Link>
                    {/* <Link to={"/mypage"}>MY PAGE</Link> */}
                    <Link to={"/signup"}>JOIN</Link>
                  </>
                )}
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