import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import "../../style/admin/MyCafeInfo.css"; 
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { CafeContext } from "../CafeProvider";


const MyCafeInfo = () => {
  const [cafes, setCafes] = useState([]);
  const [loading, setLoading] = useState(true);
  const { deleteCafe } = useContext(CafeContext);
  const [userId, setUserId] = useState(localStorage.getItem("userId")); // 상태로 사용자 ID 관리

  const navigate = useNavigate();

  // 카페 목록 불러오기
  useEffect(() => {
    const token = localStorage.getItem("token");
    const currentUserId = localStorage.getItem("userId"); // localStorage에서 사용자 ID 가져오기
    setUserId(currentUserId); // 상태로 갱신

    console.log("현재 사용자 ID:", currentUserId); // 확인용 콘솔 로그

    axios.get("http://localhost:8080/api/cafes", {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
      .then((response) => {
        console.log("🚀 가져온 카페 목록:", response.data);
        // 사용자 ID를 기준으로 카페 정보 필터링
        const myCafes = response.data.filter(cafe => cafe.userId === currentUserId);  // `name` 대신 `userId`로 필터링
        console.log("내 카페 목록:", myCafes); // 확인 로그 추가
        setCafes(myCafes); // ✅ 내 카페만 상태에 저장
        setLoading(false);
      })
      .catch((error) => {
        console.error('카페 목록 가져오기 실패:', error);
        setLoading(false);
      });
  }, [userId]);

  // 수정
  const handleEdit = (id) => {
    navigate(`/cafeedit/${id}`);  // cafe.id를 들고 CafeUpload로 이동
  };

  // 삭제
  const handleDelete = async (id) => {
    if (!window.confirm("정말 삭제하시겠습니까?")) return;
      
    try {
      await axios.delete(`http://localhost:8080/api/deleteCafe/${id}`);
      deleteCafe(id); // context에서 상태 제거
      alert("삭제되었습니다.");
      navigate("/mypage");
      window.location.reload(); // 페이지 새로고침
    } catch (error) {
      console.error("삭제 실패", error);
      alert("삭제에 실패했습니다.");
    }
  };

  // 미리보기
  const handleView = (id) => {
    navigate(`/cafedetail/${id}`);
  };

  // const handleCancel = (id) => {
  //   console.log('보기 클릭 - 카페 ID:', id);
  // };


  const renderTable = (title, data, type) => (
    <div className="mycafe-table-section">
      <h2 className='mycafe-table-section-h2'>{title}</h2>
      <table className="mycafe-table">
        <thead>
          <tr className='mycafe-table-tr'>
            <th className='mycafe-table-th'>카페명</th>
            <th className='mycafe-table-th'>제목</th>
            {type === 'waiting' && <th className='mycafe-table-th'>신청일</th>}
            {type === 'approved' && <th className='mycafe-table-th'>승인일</th>}
            <th className='mycafe-table-th'>상태</th>
            <th className='mycafe-table-th'>조치</th>
          </tr>
        </thead>
        <tbody>
          {data.map((cafe) => (
            <tr key={cafe.id}>
              <td className='mycafe-table-td'>{cafe.name}</td>
              <td className='mycafe-table-td'>{cafe.title}</td>
              <td className='mycafe-table-td-date'>{type === 'waiting' ? 
                new Date(cafe.regDate).getFullYear() + '-' + 
                ('0' + (new Date(cafe.regDate).getMonth() + 1)).slice(-2) + '-' + 
                ('0' + new Date(cafe.regDate).getDate()).slice(-2)
                :
                new Date(cafe.approvalAt).getFullYear() + '-' + 
                ('0' + (new Date(cafe.approvalAt).getMonth() + 1)).slice(-2) + '-' + 
                ('0' + new Date(cafe.approvalAt).getDate()).slice(-2)
                }
              </td>
              <td className='mycafe-table-td'>
                  {cafe.approvalStatus === 'PENDING' ? '승인 대기' :
                  cafe.approvalStatus === 'APPROVED' ? '승인 완료' :
                  cafe.approvalStatus === 'REJECTED' ? '승인 거절' : '알 수 없음'}
              </td>
              <td className='mycafe-table-td'>
                {cafe.approvalStatus !== 'REJECTED' && (
                  <div className='mycafe-table-td-btns'>
                    {type === 'waiting' ? (
                    <>
                    <button className='mycafe-table-td-showbtn' onClick={() => handleView(cafe.id)}>미리보기</button>
                    {/* <button className='mycafe-table-td-cancelbtn' onClick={() => handleCancel(cafe.id)}>취소요청</button> */}
                    </>
                ) : (
                  <>
                    <button className='mycafe-table-td-editbtn' onClick={() => handleEdit(cafe.id)}>수정</button>
                    <button className='mycafe-table-td-deletebnt' onClick={() => handleDelete(cafe.id)}>삭제</button>
                  </>
                )}
                </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  // 승인 대기 카페와 승인 완료 카페 필터링
  const waitingList = cafes.filter(c => c.approvalStatus === 'PENDING');
  const approvedList = cafes.filter(c => c.approvalStatus === 'APPROVED' || c.approvalStatus === 'REJECTED');  

  if (loading) {
    return <div>로딩 중...</div>;
  }

  return (
    <div>
      <div className="cafe-upload">
        <Link to={'/cafeupload'} className="cafe-upload-button">등록</Link>
      </div>
      {renderTable('승인 대기 목록', waitingList, 'waiting')}
      {renderTable('승인 완료 목록', approvedList, 'approved')}
    </div>
  );
};

export default MyCafeInfo;
