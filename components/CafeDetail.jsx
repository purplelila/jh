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
        {/* <h3>{p.title}</h3> */}
        <hr className="cafe-detail-first-hr"/>
            <div className='cafe-detail'>
                <div className="cafe-detail-left">
                    {/* 큰 이미지 */}
                    <div className="cafe-detail-mainimg">
                        <img src={mainImage} alt={p.imgName[0]}/>
                    </div>
                    {/* 서브 이미지 */}
                    {p.imgURL.length >1 && (
                        <div className="cafe-detail-subimg">
                            {p.imgURL.map((imgURL,idx) => (
                                <img key={idx} src={imgURL} alt={p.imgName[idx]} onClick={()=> handleImageClick(imgURL)}/>
                            ))}
                        </div>
                    )}
                </div>
                <div className="cafe-detail-right">
                    <h1>{p.title}</h1>
                    <p>{p.content}</p>
                    
                    <hr className="cafe-detail-hr"/>

                    <div className="cafe-detail-item">
                        <p>영업일</p>
                        <ul>
                            {Object.entries(p.cafeHours).map(([day, hours])=>{
                                return(
                                    <li key={day}>
                                        <span>{day}</span>  {hours}
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                    <hr className="cafe-detail-hr"/>
                    <div className="cafe-detail-item">
                        <p>카페위치</p>
                        <span>{p.place}</span>
                    </div>
                    <hr className="cafe-detail-hr"/>
                    <div className="cafe-detail-item">
                        <p>연락처</p>
                        <span>{p.phone}</span>
                    </div>
                    <hr className="cafe-detail-hr"/>
                    <div className="cafe-detail-item">
                        <p>SNS</p>
                        <span>{p.sns}</span>
                    </div>
                </div>
            </div>
            <div className="cafedetail-btn">
                <Link to={'/cafelist'}>
                    <button>목록</button>
                </Link>
            </div>
      </div>
      </>
    )
  }

  export default CafeDetail;