import { useContext, useEffect, useState } from "react";
import { CafeContext } from "./CafeProvider";
import { useParams, Link } from "react-router-dom";

let CafeDetail = () => {
    const[mainImage, setMainImage] = useState(null)

    let { cafes } = useContext(CafeContext)
    let { id } = useParams()

    const p = cafes.find(c => c.id === parseInt(id))
    
    if (!p) {
        return <div>카페 정보를 찾을 수 없습니다.</div>
    }

    // mainimage는 첫번째 이미지로 설정
    useEffect(()=>{
        if(p && p.imgURL && p.imgURL.length>0){
            setMainImage(p.imgURL[0])
        }
    }, [p])

    const handleImageClick = (imgURL) => {
        setMainImage(imgURL)
    }

    return(
      <>
      <div className="cafedetail-board">
        <h3>{p.title}</h3>
            <div className='cafe-detail'>
                <div className="cafe-detail-left">
                    {/* 큰 이미지 */}
                    <div className="cafe-detail-mainimg">
                        <img src={mainImage} alt={p.imgName[0]}/>
                    </div>
                    {/* 서브 이미지 */}
                    <div className="cafe-detail-subimg">
                        {p.imgURL.map((imgURL,idx) => (
                            <img key={idx} src={imgURL} alt={p.imgName[idx]} onClick={()=> handleImageClick(imgURL)}/>
                        ))}
                    </div>
                    <p>{p.work}</p>
                </div>
                <div className="cafe-detail-right">
                    <h4>{p.title}</h4>
                    <p>{p.content}</p>
                    <span>카페위치 : {p.place}</span>
                </div>
            </div>
            <Link to={'/cafelist'}>
                <button>목록</button>
            </Link>
      </div>
      </>
    )
  }

  export default CafeDetail;