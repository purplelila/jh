import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import "../../style/admin/MyCafeInfo.css"; 
import axios from 'axios';


const MyCafeInfo = () => {
  const [cafes, setCafes] = useState([]);
  const [loading, setLoading] = useState(true);

  // 카페 목록 불러오기
  useEffect(() => {
    const token = localStorage.getItem("token");
    const currentUserName = localStorage.getItem("nickname"); // ✅ 로그인한 사용자 닉네임 가져오기
    axios.get("http://localhost:8080/api/cafes", {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
      .then((response) => {
        console.log("🚀 가져온 카페 목록:", response.data);
        // ✅ 작성자 기준으로 필터링
        const myCafes = response.data.filter(cafe => cafe.name === currentUserName);

        setCafes(myCafes); // ✅ 내 카페만 상태에 저장
        setLoading(false);
      })
      .catch((error) => {
        console.error('카페 목록 가져오기 실패:', error);
        setLoading(false);
      });
  }, []);

  const handleEdit = (id) => {
    console.log('수정하기 클릭 - 카페 ID:', id);
    // 예: navigate(`/cafe/edit/${id}`)
  };

  const handleCancel = (id) => {
    console.log('승인취소 클릭 - 카페 ID:', id);
    // 여기에 승인취소 API 호출 or 상태 변경 로직을 넣으면 돼
  };

  const handleView = (id) => {
    console.log('보기 클릭 - 카페 ID:', id);
    // 예: navigate(`/cafe/view/${id}`)
  };

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
              <td className='mycafe-table-td'>{type === 'waiting' ? cafe.regDate : cafe.approvalAt}</td>
              <td className='mycafe-table-td'>
                  {cafe.approvalStatus === 'PENDING' ? '승인 대기' :
                  cafe.approvalStatus === 'APPROVED' ? '승인 완료' :
                  cafe.approvalStatus === 'REJECTED' ? '거절됨' : '알 수 없음'}
              </td>
              <td className='mycafe-table-td'>
                {type === 'waiting' ? (
                  <div>
                    <button className='mycafe-table-td-editbtn' onClick={() => handleEdit(cafe.id)}>수정하기</button>
                    <button className='mycafe-table-td-cancelbtn' onClick={() => handleCancel(cafe.id)}>취소요청</button>
                  </div>
                ) : (
                  <button className='mycafe-table-td-button' onClick={() => handleView(cafe.id)}>보기</button>
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
  const approvedList = cafes.filter(c => c.approvalStatus === 'APPROVED');  

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
