import './App.css'
import './style/Nav.css'
import './style/CafeList.css'
import './style/CafeDetail.css'
import './style/CafeUpload.css'
import './style/Footer.css'

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CafeProvider from "./components/CafeProvider";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import CafeList from "./components/CafeList";
import CafeUpload from "./components/CafeUpload";
import CafeDetail from "./components/CafeDetail";

function Appcopy() {
  return (
    <CafeProvider>
      <Router>
        <div className="container">
          <Nav />
          <Routes>
            <Route path='/' exact element={<CafeList />} />
            <Route path='/cafelist' element={<CafeList />} />
            <Route path='/cafeupload' element={<CafeUpload />} />
            <Route path='/cafedetail/:id' element={<CafeDetail />} />
          </Routes>
        </div>
        <Footer/>
      </Router>
    </CafeProvider>
  )
}

export default Appcopy;