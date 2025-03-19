import { Link } from "react-router-dom";
// import logo from "../public/logo.png";

let Nav = () => {
    return(
      <>
        <header>
          <nav>
              <div className="menu">
                  <div className="menu-logo">
                      <h1>
                        <Link to={'/cafelist'}>
                          <img src="/image.png" alt="로고" />
                        </Link>
                      </h1>
                  </div>
                  <div className="menu-center">
                    <Link to={'/cafelist'}>STORE</Link>
                    <Link to={'/community'}>COMMUNITY</Link>
                  </div>
                  <div className="menu-right">
                    <Link to={'/login'}><i className="fa-solid fa-user"></i></Link>
                  </div>
              </div>
          </nav>
        </header>

        <div className="hero">
          <div className="hero-section">
              <div className="hero-content">
                  <h1>STORE</h1>
                  <p>좋은 커피와 서비스를 제공하는 카페 정보를 제공합니다</p>
              </div>
          </div>
        </div>

        <div className="second">
            <div className="second-section">
              <Link to={'/cafelist'}>카페정보</Link>
              <Link to={'/'}>메뉴</Link>
            </div>
        </div>
        <hr />
      </>      
    )
  }

export default Nav;