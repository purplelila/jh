import React, { useState } from 'react';


const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [userType, setUserType] = useState('');
  const [zipcode, setZipcode] = useState('');
  const [address, setAddress] = useState('');
  const [detailAddress, setDetailAddress] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleUserTypeChange = (e) => {
    setUserType(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // 필드 검증
    if (
      username === '' ||
      email === '' ||
      password === '' ||
      confirmPassword === '' ||
      !userType ||
      (userType === '카페사장' && (zipcode === '' || address === '' || detailAddress === '')) ||
      (userType === '일반회원' && detailAddress === '')
    ) {
      setErrorMessage('모든 항목을 정확히 입력해주세요.');
    } else if (password !== confirmPassword) {
      setErrorMessage('비밀번호가 일치하지 않습니다.');
    } else {
      setErrorMessage('');
      alert('회원가입이 완료되었습니다!');
    }
  };

  const handlePostcodeSearch = () => {
    new window.daum.Postcode({
      oncomplete: function (data) {
        setZipcode(data.zonecode);
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
          <input className='signup-text' type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="아이디" required/>
          <input className='signup-email' type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="이메일" required />
          <input className='signup-pwd' type="password" value={password} onChange={(e) => setPassword(e.target.value)}  placeholder="비밀번호" required />
          <input className='signup-pwd-ck' type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="비밀번호 확인" required />
          <input className='signup-niname' type="password" value={password} onChange={(e) => setPassword(e.target.value)}  placeholder="닉네임" required />
          <div className="signup-user-type">
            <label>
              <input className='signup-radio-n' type="radio" name="userType" value="일반회원" checked={userType === '일반회원'} onChange={handleUserTypeChange} required />
              일반회원 </label>
            <label>
              <input className='signup-radio-c' type="radio" name="userType" value="카페사장" checked={userType === '카페사장'} onChange={handleUserTypeChange} required />
              카페사장
            </label> 
          </div>
          {userType === '카페사장' && (
            <div className="address-container">
              <input className="zipcode" type="text" value={zipcode} onChange={(e) => setZipcode(e.target.value)} placeholder="우편번호" readOnly />
              <button className='adr-btn' type="button" onClick={handlePostcodeSearch}> 우편번호 찾기 </button>
            </div>
          )}

          {userType === '카페사장' && (
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
