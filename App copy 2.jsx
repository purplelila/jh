import './App.css'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { createContext, useContext } from 'react'
import { useState, useEffect } from 'react'  
import logo from "../public/logo.png"

let title1 = "카페목록"
let title2 = "상세보기"

let BoardContext = createContext()

let BoardProvider = ({children}) => {
  const [posts, setPosts] = useState([])

  function addBoard(title, author, content){
    let newPost = {id : Date.now(),title, author, content, createDate : new Date().toLocaleString()}
    setPosts([...posts, newPost])
  }

  useEffect(()=> {
    localStorage.setItem("posts", JSON.stringify(posts))
  }, [posts])

  useEffect(()=> {
    let savedPost = JSON.parse(localStorage.getItem("posts"))
    setPosts(savedPost)
  }, [])

  function deletePost(id){
    let filteredPosts = posts.filter((p)=> p.id !== id)
    setPosts(filteredPosts)
  }

  return(
    <BoardContext.Provider value={{posts, addBoard, deletePost}}>
      {children}
    </BoardContext.Provider>
  )
}

let Nav = () => {
  return(
    <nav className='nav'>
      <a href="/cafelist">
        <img src={logo} alt="Logo" />
      </a>
      <div className='nav-links'>
        <Link to="/cafelist">카페정보</Link>
        <Link to="/community">커뮤니티</Link>
        <Link to="/login">로그인</Link>
      </div>
    </nav>
  )
}

let CafeList = () => {
  return(
    <>
      <div>
        <h2>{title1}</h2>;
        <Link to="/cafeupload">
        <button>등록하기</button>
        </Link>
      </div>
    </>
  )
}


let Community = () => {
  return <div>커뮤니티 페이지입니다.</div>;
}


let Login = () => {
  return <div>로그인 페이지입니다.</div>;
}


let CafeUpload = () => {
  let {addBoard, posts, deletePost} = useContext(BoardContext)

  const [title, setTitle] = useState("")
  const [place, setPlace] = useState("")
  const [content, setContent] = useState("")

  function handleSubmit(e){
    e.preventDefault()
    if(title && place && content){
      // provider 함수에 저장
      addBoard(title, place, content)
      
      setTitle("")
      setPlace("")
      setContent("")
    }
  }

  return(
    <div className='board'>
      <h2>{title2}</h2>

      <h3>게시글 목록</h3>
        <div className='post-list'>
          {posts.length === 0 ? "게시글이 없습니다." : (
            posts.map((p, idx) => {
              return(
                <div key={idx} className='post-item'>
                  <p>번호: {p.id}</p>
                  <h4>제목 : {p.title}</h4>
                  <p>{p.content}</p>
                  <div>
                    <span>카페위치 : {p.place}</span><br />
                  </div>
                  <button className='deleteBtn' onClick={()=> deletePost(p.id)}>삭제</button>
                </div>
              )
            })
          )}
        </div>
      <hr style={{margin:"20px 0"}}/>

      <div className="form-container">
        <h3>게시판 글 작성하기</h3>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder='제목' onChange={(e)=> setTitle(e.target.value)} value={title}/>
          <input type="text" placeholder='카페위치'onChange={(e)=> setPlace(e.target.value)} value={place}/>
          <textarea placeholder='내용' onChange={(e)=> setContent(e.target.value)} value={content}></textarea>
          <button type='submit'>게시글 등록</button>
        </form>
      </div>
    </div>
  )
}

let Footer = () => {
  return (
    <footer className="footer">
      <p>© 2025 My Cafe App. All rights reserved.</p>
    </footer>
  );
};

function App() {
  return (
    <BoardProvider>
      <Router>
        <div className="container">
          <Nav />
          <Routes>
            <Route path='/cafelist' element={<CafeList />} />
            <Route path='/cafeupload' element={<CafeUpload />} />
            <Route path='/community' element={<Community />} />
            <Route path='/login' element={<Login />} />
          </Routes>
        </div>
        <Footer/>
      </Router>
    </BoardProvider>
  )
}

export default App