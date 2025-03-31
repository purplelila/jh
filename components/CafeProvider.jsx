import { createContext, useState, useEffect } from "react";

export let CafeContext = createContext()

let CafeProvider = ({children}) => {
  const [cafes, setCafes] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredData, setFilteredData] = useState(cafes)

  // 카페 추가
  function addCafe(imgURL, imgName, cafeHours, title, place, content, phone, sns){
    let newPost = {id: Date.now(), imgURL, imgName, cafeHours, title, place, content, phone, sns}
    setCafes(prevCafes => [...prevCafes, newPost]);
    setFilteredData(prevData => [...prevData, newPost]);
  }

  // 카페 상태 저장
  useEffect(()=> {
    localStorage.setItem("cafes", JSON.stringify(cafes))
  }, [cafes])

  // 카페 상태 가져오는
  useEffect(()=> {
    let savedCafe = JSON.parse(localStorage.getItem("cafes"))
    if(savedCafe){
      setCafes(savedCafe)  
    }
    
  }, [])

  // 클릭시 검색 초기화
  const handleResetFilter = ()=> {
    setSearchTerm("");
    setFilteredData(cafes);
  }

  useEffect(()=> {
    if(cafes.length>0){
      localStorage.setItem("cafes", JSON.stringify(cafes))
    }
  }, [cafes])

  function deleteCafe(id){
    let filteredCafes = cafes.filter((p)=> p.id !== id)
    setCafes(filteredCafes)
  }

  return(
    <CafeContext.Provider value={{cafes, addCafe, deleteCafe, setCafes, searchTerm, filteredData, setSearchTerm, setFilteredData, handleResetFilter}}>
      {children}
    </CafeContext.Provider>
  )
}

export default CafeProvider;