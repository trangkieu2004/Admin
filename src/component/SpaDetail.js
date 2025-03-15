import React, { useState } from "react";
import {useNavigate } from "react-router-dom"; // Nhập Link từ react-router-dom
import "./SpaDetail.css";
import editIcon from "../picture/Edit.png";
import deleteIcon from "../picture/Delete.png";
import Sidebar from "./Sidebar";
import AddSpa from "./AddSpa";

const SpaDetail = ({ username, onLogout }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [spaData, setSpaData] = useState([
    {
      name: "dieu",
      phone: "0123456789",
      pet: "null",
      weight: "null",
      service: "PetCare - Tắm Cạo",
      day: "2024-11-29",
      time: "10:00 AM",
      pay: "Thanh toán khi xong nhiệm vụ",
      price: "400.00",
      account: "gogo",
      state : "Chờ xác nhận"
    },
    {
      name: "Trần Thị B",
      phone: "0987654321",
      pet: "null",
      weight: "null",
      service: "PetCare - Tắm Cạo",
      day: "2024-11-29",
      time: "10:00 AM",
      pay: "Thanh toán khi xong nhiệm vụ",
      price: "400.00",
      account: "gogo",
      state : "Chờ xác nhận"
    },
    {
      name: "Phạm Văn C",
      phone: "0912345678",
      pet: "[{“age”: “1”, “breed”: “husky”, “gender”: “Đực”, “petName”: “meomeo”, “species”: “Mèo”, “symptoms”: “”]}",
      weight: "null",
      service: "PetCare - Tắm Cạo",
      day: "2024-11-29",
      time: "10:00 AM",
      pay: "Thanh toán khi xong nhiệm vụ",
      price: "400.00",
      account: "gogo",
      state : "Chờ xác nhận"
    },
    // Thêm dữ liệu khác nếu cần
  ]);
  const filteredData = spaData.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.phone.includes(searchTerm)
  );
  const [isScheduleOpen, setIsScheduleOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState("home");
  const [isModalOpen, setIsModalOpen] = useState(false)
  const navigate = useNavigate();

  const toggleSchedule = () => {
    setIsScheduleOpen(!isScheduleOpen);
  };

  const handleMenuClick = (menu) => {
    setActiveMenu(menu);
  };

  const handleLogout = () => {
    onLogout(); // Gọi hàm onLogout từ props
    navigate("/home"); // Điều hướng về trang home
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  return (
    <div className="container-fluid dashboard">
      <Sidebar
        activeMenu={activeMenu}
        handleMenuClick={handleMenuClick}
        isScheduleOpen={isScheduleOpen}
        toggleSchedule={toggleSchedule}
      />
      <div className="account-main">
        <div className="header-container">
          <div className="hello-user">
            <span><i class="fa-solid fa-circle-user icon-user"></i>Xin chào {username}</span>
            <button className="logout" onClick={handleLogout}>
              Log Out
            </button>
          </div>
        </div>
        <div className="spa-detail-container">
          <header>
            <h1>Lịch Spa</h1>
            <button onClick={toggleModal} className="add-spa">+ Thêm lịch spa</button>
            <div className="search-container">
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>
          </header>
          <div className="spa-detail-table">
            <table>
              <thead>
                <tr>
                  <th>Tên</th>
                  <th>Số điện thoại</th>
                  <th>Thông tin pet</th>
                  <th>Cân nặng</th>
                  <th>Dịch vụ</th>
                  <th>Ngày</th>
                  <th>Giờ</th>
                  <th>Thanh toán</th>
                  <th>Giá</th>
                  <th>Tài Khoản</th>
                  <th>Trạng thái</th>
                  <th>Tùy chọn</th>
                </tr>
              </thead>
              <tbody>
              {filteredData.length > 0 ? (
            filteredData.map((item, index) => (
              <tr key={index}>
                <td>{item.name}</td>
                <td>{item.phone}</td>
                <td>{item.pet}</td>
                <td>{item.weight}</td>
                <td>{item.service}</td>
                <td>{item.day}</td>
                <td>{item.time}</td>
                <td>{item.pay}</td>
                <td>{item.price}</td>
                <td>{item.account}</td>
                <td>{item.state}</td>
                <td>
                  <button>
                    <img src={editIcon} alt="Edit" />
                  </button>
                  <button>
                    <img src={deleteIcon} alt="Delete" />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">Không tìm thấy kết quả.</td>
            </tr>
          )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {/* Hiển thị AddSpa khi isModalOpen là true */}
      {isModalOpen && <AddSpa onClose={toggleModal} />}
    </div>
  );
};

export default SpaDetail;