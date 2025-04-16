import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";


const Signup = () => {
  const navigate = useNavigate();
  const [userid, setUserid] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [userType, setUserType] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [address, setAddress] = useState('');
  const [detailAddress, setDetailAddress] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleUserTypeChange = (e) => {
    setUserType(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      userid === '' ||
      username === '' ||
      email === '' ||
      password === '' ||
      confirmPassword === '' ||
      nickname === '' ||
      !userType ||
      (userType === '1' && (postalCode === '' || address === '' || detailAddress === '')) ||
      (userType === '1' && detailAddress === '')
    ) {
      setErrorMessage('모든 항목을 정확히 입력해주세요.');
      return;
    }
  
    if (password !== confirmPassword) {
      setErrorMessage('비밀번호가 일치하지 않습니다.');
      return;
    }
  
    // API 요청 데이터
    const userData = {
      userid,
      username,
      email,
      password,
      nickname,
      userType: parseInt(userType),
      postalCode,
      address,
      detailAddress,
    };
    console.log("보낼 데이터: ", userData);
    try {
      const response = await axios.post('http://localhost:8080/api/users/signup', userData, {
        headers: { 'Content-Type': 'application/json' }
      });
  
      alert(response.data); // "회원가입 성공!" 메시지
      navigate('/login'); //로그인 페이지로 이동
    } catch (error) {
      console.error('회원가입 실패:', error);
      setErrorMessage('회원가입에 실패했습니다.');
    }
  };

  const handlePostcodeSearch = () => {
    if (!window.daum || !window.daum.Postcode) {
      alert('주소 API가 아직 로드되지 않았어요. 잠시 후 다시 시도해주세요.');
      return;
    }
    new window.daum.Postcode({
      oncomplete: function (data) {
        setPostalCode(data.zonecode);
        setAddress(data.address);
        setDetailAddress('');
      },
    }).open();
  };

  return (
    <div className="signup-total-box">
        <div className="signup-container">
        <h2 className='signup-h2'>회원가입</h2>
        <form onSubmit={handleSubmit}>
          <input className='signup-userid' type="text" value={userid} onChange={(e) => setUserid(e.target.value)} placeholder="아이디" required/>
          <input className='signup-username' type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="이름" required/>
          <input className='signup-email' type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="이메일" required />
          <input className='signup-pwd' type="password" value={password} onChange={(e) => setPassword(e.target.value)}  placeholder="비밀번호" required autoComplete="new-password"/>
          <input className='signup-pwd-ck' type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="비밀번호 확인" required autoComplete="new-password"/>
          <input className='signup-niname' type="text" value={nickname} onChange={(e) => setNickname(e.target.value)}  placeholder="닉네임" />
          <div className="signup-user-type">
            <label>
              <input className='signup-radio-n' type="radio" name="userType" value="0" checked={userType === '0'} onChange={handleUserTypeChange} required />
              일반회원 </label>
            <label>
              <input className='signup-radio-c' type="radio" name="userType" value="1" checked={userType === '1'} onChange={handleUserTypeChange} required />
              카페사장
            </label> 
          </div>
          {userType === '1' && (
            <div className="address-container">
              <input className="postalCode" type="text" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} placeholder="우편번호" readOnly />
              <button className='adr-btn' type="button" onClick={handlePostcodeSearch}> 우편번호 찾기 </button>
            </div>
          )}

          {userType === '1' && (
            <>
              <input className="signup-address" type="text" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="주소" readOnly />
              <input className='signup-adr-p' type="text" value={detailAddress} onChange={(e) => setDetailAddress(e.target.value)} placeholder="상세주소" required />
            </>
          )}

          <input className='sigh-submit' type="submit" value="회원가입" />
          {errorMessage && <div className="sigh-error">{errorMessage}</div>}
        </form>
        <div className="sigh-footer">
          <a href="/login" id="login-link">로그인</a> |
          <a href="/" id="terms-link">메인으로</a>
        </div>
      </div>
    </div>
    
  );
};

export default Signup;

