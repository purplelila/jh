import { useContext } from "react";
import { CafeContext } from "./CafeProvider";
import { useParams, Link } from "react-router-dom";

let CafeDetail = () => {
    let { cafes } = useContext(CafeContext)
    let { id } = useParams()

    const p = cafes.find(c => c.id === parseInt(id))
    
    if (!p) {
        return <div>카페 정보를 찾을 수 없습니다.</div>
    }

    return(
      <>
        <div>
            <h3>{p.title}</h3>
            <div className='cafe-detail'>
                <div className="cafe-detail-img">
                    <img src={p.img} />
                </div>
                <div className="cafe-detail-text">
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