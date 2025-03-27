import './App.css'
import './style/Nav.css'
import './style/CafeList.css'
import './style/CafeDetail.css'
import './style/CafeUpload.css'
import './style/Footer.css'

import './Cafemain.css'
import './CommunityPage.css'
// import './login.css'

import { BrowserRouter as Router, Routes, Route, useLocation  } from "react-router-dom";
import CafeProvider from "./components/CafeProvider";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import CafeList from "./components/CafeList";
import CafeUpload from "./components/CafeUpload";
import CafeDetail from "./components/CafeDetail";

import Cafemain from './Cafemain'
import CommunityPage from './CommunityPage'
// import Login from './login'

const Main = () => {
  const location = useLocation();  // useLocation 훅은 Router 내에서 사용해야 함
  
  // Cafemain 페이지에서만 Nav를 숨김
  const showNav = location.pathname !== '/';
  const showNav2 = location.pathname !== '/login';

  const showfooter = location.pathname !== '/'
  
  return (
    <div className="container">
      {/* Nav가 'Cafemain' 페이지에서만 숨겨지도록 조건부 렌더링 */}
      {showNav && showNav2 && <Nav />}
  
      <Routes>
        <Route path='/' element={<Cafemain />} />
        <Route path='/cafelist' element={<CafeList />} />
        <Route path='/cafeupload' element={<CafeUpload />} />
        <Route path='/cafedetail/:id' element={<CafeDetail />} />
        <Route path='/community' element={<CommunityPage />} />
        {/* <Route path='/login' element={<Login />} /> */}

      </Routes>
      {showfooter && <Footer/>}
    </div>
  );
};


function App() {
  return (

      <Router>
        <CafeProvider>

              <Main />

        </CafeProvider>
      </Router>

  )
}

export default App