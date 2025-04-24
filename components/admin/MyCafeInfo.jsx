import React from 'react';
import { Link } from 'react-router-dom';
import "../../style/admin/MyCafeInfo.css"; 


const MyCafeInfo = () => {
  const cafes = [
    { id: 1, name: '커피앤조이', requestDate: '2025-04-21', status: '승인 대기' },
    { id: 3, name: '카페마마스', approvedDate: '2025-04-19', status: '승인 완료' },
  ];

  const waitingList = cafes.filter(c => c.status === '승인 대기');
  const approvedList = cafes.filter(c => c.status === '승인 완료');

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
              <td className='mycafe-table-td'>{type === 'waiting' ? cafe.requestDate : cafe.approvedDate}</td>
              <td className='mycafe-table-td'>{cafe.status}</td>
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
