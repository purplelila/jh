import { createContext, useState, useEffect } from "react";

export let CafeContext = createContext()

let CafeProvider = ({children}) => {
  const [cafes, setCafes] = useState([])

  function addCafe(img, work, title, place, content){
    let newPost = {id: Date.now(), img, work, title, place, content}
    setCafes([...cafes, newPost])
  }

  useEffect(()=> {
    localStorage.setItem("cafes", JSON.stringify(cafes))
  }, [cafes])

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