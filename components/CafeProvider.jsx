import { createContext, useState, useEffect } from "react";

export let CafeContext = createContext()

let CafeProvider = ({children}) => {
  const [cafes, setCafes] = useState([])

  // 카페 추가
  function addCafe(imgURL, imgName, work, title, place, content){
    let newPost = {id: Date.now(), imgURL, imgName, work, title, place, content}
    setCafes([...cafes, newPost])
  }

  // 카페 상태 저장
  useEffect(()=> {
    localStorage.setItem("cafes", JSON.stringify(cafes))
  }, [cafes])

  // 카페 상태 가져오는
  useEffect(()=> {
    let savedCafe = JSON.parse(localStorage.getItem("cafes"))
    setCafes(savedCafe)
  }, [])

  function deleteCafe(id){
    let filteredCafes = cafes.filter((p)=> p.id !== id)
    setCafes(filteredCafes)
  }

  return(
    <CafeContext.Provider value={{cafes, addCafe, deleteCafe}}>
      {children}
    </CafeContext.Provider>
  )
}

export default CafeProvider;