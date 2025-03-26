import { createContext, useState, useEffect } from "react";

export let CafeContext = createContext()

let CafeProvider = ({children}) => {
  const [cafes, setCafes] = useState([])

  // 카페 추가
  function addCafe(imgURL, imgName, cafeHours, title, place, content, phone, sns){
    let newPost = {id: Date.now(), imgURL, imgName, cafeHours, title, place, content, phone, sns}
    setCafes([...cafes, newPost])
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
    }else{
      setCafes([])
    }
    
  }, [])

  function deleteCafe(id){
    let filteredCafes = cafes.filter((p)=> p.id !== id)
    setCafes(filteredCafes)
  }

  return(
    <CafeContext.Provider value={{cafes, addCafe, deleteCafe, setCafes}}>
      {children}
    </CafeContext.Provider>
  )
}

export default CafeProvider;