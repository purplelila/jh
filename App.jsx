import React from 'react';  // React를 import 해주세요
import { useState } from 'react';

import './App.css'
import './style/Nav.css'
import './style/Footer.css'
import './style/Cafemain.css'

import './style/admin/login.css'
import './style/admin/Signup.css'
import './style/admin/mypage.css'

import './style/cafe/CafeList.css'
import './style/cafe/CafeDetail.css'
import './style/cafe/CafeUpload.css'


import './style/community/communityPage.css'
import './style/community/WritePage.css'
import './style/community/DetailPage.css'
import './style/community/Tabs.css'

import './style/master/admin.css'
import './style/master/admin-bord-1.css'
import './style/master/admin-bord-2.css'
import './style/master/admin-bord-3.css'
import './style/master/admin-bord-4.css'
import './style/master/admin-list-0.css'
import './style/master/admin-list-1.css'


import { BrowserRouter as Router, Routes, Route, useLocation  } from "react-router-dom";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Cafemain from './components/Cafemain'

import Login from './components/admin/login'
import Signup from './components/admin/Signup'
import MyPage from './components/admin/mypage'

import CafeProvider from "./components/CafeProvider";
import CafeList from "./components/cafe/CafeList";
import CafeUpload from "./components/cafe/CafeUpload";
import CafeDetail from "./components/cafe/CafeDetail";

import NoticePage from './components/community/NoticePage';
import ChatPage from './components/community/ChatPage';
import FaqPage from './components/community/FaqPage';
import WritePage from './components/community/WritePage';
import DetailPage from './components/community/DetailPage';

import Admin from './components/master/admin';
import AdminBord_1 from './components/master/admin-bord-1';
import AdminBord_2 from './components/master/admin-bord-2';
import AdminBord_3 from './components/master/admin-bord-3';
import AdminBord_4 from './components/master/admin-bord-4';
import AdminList_0 from './components/master/admin-list-0';
import AdminList_1 from './components/master/admin-list-1';


const Main = () => {
  const location = useLocation();  // useLocation 훅은 Router 내에서 사용해야 함
  
  // Cafemain 페이지에서만 Nav를 숨김
  const showNav = location.pathname !== '/';
  const showNav2 = location.pathname !== '/login';
  const showNav3 = location.pathname !== '/signup';
  const showNav4 = location.pathname !== '/admin/1';
  const showNav5 = location.pathname !== '/admin/list-0';
  const showNav6 = location.pathname !== '/admin/list-1';
  const showNav7 = location.pathname !== '/admin/Bord-1';
  const showNav8 = location.pathname !== '/admin/Bord-2';
  const showNav9 = location.pathname !== '/admin/Bord-3';
  const showNav10 = location.pathname !== '/admin/Bord-4';

  const showfooter = location.pathname !== '/';
  const showfooter2 = location.pathname !== '/login';
  const showfooter3 = location.pathname !== '/signup';
  const showfooter4 = location.pathname !== '/admin/1';
  const showfooter5 = location.pathname !== '/admin/list-0';
  const showfooter6 = location.pathname !== '/admin/list-1';
  const showfooter7 = location.pathname !== '/admin/Bord-1';
  const showfooter8 = location.pathname !== '/admin/Bord-2';
  const showfooter9 = location.pathname !== '/admin/Bord-3';
  const showfooter10 = location.pathname !== '/admin/Bord-4';
  
  return (
    <div className="container">
      {/* Nav가 'Cafemain' 페이지에서만 숨겨지도록 조건부 렌더링 */}
      {showNav && showNav2 && showNav3 && showNav3 && showNav4 &&showNav5 &&showNav6 &&showNav7 &&showNav8 &&showNav9 && showNav10 && <Nav />}
  
      <Routes>
        <Route path='/' element={<Cafemain />} />
        <Route path='/cafelist' element={<CafeList />} />
        <Route path='/cafeupload' element={<CafeUpload />} />
        <Route path="/cafeedit/:id" element={<CafeUpload />} />
        <Route path='/cafedetail/:id' element={<CafeDetail />} />
        <Route path="/community/notice" element={<NoticePage />} />
        <Route path="/community/chat" element={<ChatPage />} />
        <Route path="/community/faq" element={<FaqPage />} />
        <Route path="/community/:category/add" element={<WritePage />} />
        <Route path="/community/:category/:postId" element={<DetailPage />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/mypage' element={<MyPage />} />        
        <Route path="/admin/1" element={<Admin />} />
        <Route path="/admin/list-0" element={<AdminList_0 />} />
        <Route path="/admin/list-1" element={<AdminList_1 />} />
        <Route path="/admin/Bord-1" element={<AdminBord_1 />} />
        <Route path="/admin/Bord-2" element={<AdminBord_2 />} />
        <Route path="/admin/Bord-3" element={<AdminBord_3 />} />
        <Route path="/admin/Bord-4" element={<AdminBord_4 />} />

      </Routes>
      {showfooter && showfooter2 && showfooter3 && showfooter4 &&showfooter5 &&showfooter6 &&showfooter7 &&showfooter8 &&showfooter9 &&showfooter10 &&<Footer/>}
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