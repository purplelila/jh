import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CafeProvider from "./components/CafeProvider";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import CafeList from "./components/CafeList";
import CafeUpload from "./components/CafeUpload";

function App() {
  return (
    <CafeProvider>
      <Router>
        <div className="container">
          <Nav />
          <Routes>
            <Route path='/' exact element={<CafeList />} />
            <Route path='/cafelist' element={<CafeList />} />
            <Route path='/cafeupload' element={<CafeUpload />} />
          </Routes>
        </div>
        <Footer/>
      </Router>
    </CafeProvider>
  )
}

export default App