import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import PasswordChange from "./PassWordChange";
import RegisterChange from "./RegisterChange";
import RegisterCheck from "./RegisterCheck";

const MyPage = () => {
  return (
    <div className="mypage-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <h2 className="sidebar-title">My Page</h2>
        <ul className="menu-list">
          <li>마이페이지</li>
          <li>기기예약현황</li>
          <li>신청현황</li>
          <li>기기분석결과</li>
          <li>나의 게시글</li>
        </ul>
        <button className="sidebar-button">청구서 등 서류출력</button>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        {/* Header Box */}
        <div className="user-info-box">
          <div className="user-info-text">
            <p className="username">관리자 님</p>
            <p>비빅대학교 공동실험실습관</p>
            <p>sos@kangs...net</p>
            <p>033-251-9400 / 010-0000-0000</p>
            <div className="button-group">
              <button className="outline-button">정보변경</button>
              <button className="outline-button">소속연구원관리</button>
              <button className="filled-button">결제하기</button>
            </div>
          </div>

          <div className="payment-status">
            <div className="status-box">
              <p className="label">미납건수</p>
              <p className="value red">10건</p>
            </div>
            <div className="status-box">
              <p className="label">미납금액</p>
              <p className="value red">610,800원</p>
              <p className="small-text">(VAT 별도)</p>
            </div>
          </div>
        </div>

        {/* Application Status */}
        <div className="application-status">
          <div className="status-item">
            <p className="label">승인대기</p>
            <p className="value">22건</p>
          </div>
          <div className="status-item">
            <p className="label">사용대기</p>
            <p className="value">0건</p>
          </div>
          <div className="status-item">
            <p className="label">분석대기</p>
            <p className="value">7건</p>
          </div>
          <div className="status-item">
            <p className="label">통보대기</p>
            <p className="value">1건</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MyPage;

