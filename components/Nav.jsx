import { Link } from "react-router-dom";
// import logo from "../public/logo.png";

let Nav = () => {
    return(
      <nav className='nav'>
        <Link to="/cafelist">
          <img src="/logo.png" alt="Logo" />
        </Link>
        <div className='nav-links'>
          <Link to="/cafelist">카페정보</Link>
          <Link to="/community">커뮤니티</Link>
          <Link to="/login">로그인</Link>
        </div>
      </nav>
    )
  }

export default Nav;