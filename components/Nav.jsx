import { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { CafeContext } from "./CafeProvider";

let Nav = () => {
 
  // store랑 community 경로마다 배경 이미지 및 텍스트 설정
  const location = useLocation()
  const {handleResetFilter} = useContext(CafeContext)

  // 기본값 설정
  let heroImage;
  let heroText = {title:'', subtitle:''}

  if (location.pathname == '/cafelist' || location.pathname == '/cafeupload' || location.pathname.startsWith('/cafedetail/')){
    heroImage = 'url(c6.jpg)';
    heroText = {
      title : 'STORE',
      subtitle : '좋은 커피와 서비스를 제공하는 카페 정보를 제공합니다'
    }
  }else if (location.pathname == '/community/notice' || location.pathname == '/community/chat' || location.pathname == '/community/faq'|| location.pathname == '/community' || location.pathname == '/write' || location.pathname.startsWith ('/community/')){
    heroImage = 'url(/main1.jpg)';
    heroText = {
      title : 'COMMUNITY',
      subtitle : '정보를 공유하고 서로 의견을 주고받아보세요'
    }
  }else{
    heroImage='';
    heroText = {title : '', subtitle : ''}
  }

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
                      <Link to={'/community/notice'}>COMMUNITY</Link>
                    </div>
                </div>
                <div className="menu-right">
                  <div className="menu-login">
                    <Link to={'/login'}>LOGIN</Link>
                    <Link to={'/signup'}>JOIN</Link>
                    <Link to={'/mypage'}>MY PAGE</Link>
                  </div>
                  <div className="social-icons">
                    <Link to='https://www.instagram.com/'><i class="fa-brands fa-instagram"></i></Link>
                    <Link to='https://www.facebook.com/'><i class="fa-brands fa-square-facebook"></i></Link>
                    <Link to='https://x.com/'><i class="fa-brands fa-square-x-twitter"></i></Link>
                  </div>
                </div>
            </div>
        </nav>
      </header>

      <div className="hero" style={{backgroundImage:heroImage}}>
        <div className="hero-section">
            <div className="hero-content">
                <p>{heroText.title}</p>
                <p>{heroText.subtitle}</p>
            </div>
        </div>
      </div>

      {/* <div className="second">
          <div className="second-section">
            <Link to={'/cafelist'}>카페등록</Link>
            <Link to={'/community'}>공지사항</Link>
          </div>
      </div> */}
      {/* <hr className="nav-hr"/> */}
    </>      
    )
  }

export default Nav;