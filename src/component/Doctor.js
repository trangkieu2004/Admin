import React, { useState } from "react";
import {useNavigate } from "react-router-dom"; // Nhập Link từ react-router-dom
import "./Doctor.css";
import editIcon from "../picture/Edit.png";
import deleteIcon from "../picture/Delete.png";
import Sidebar from "./Sidebar";
import AddDoctor from "./AddDoctor";

const Doctor = ({ username, onLogout }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [doctorData, setDoctorData] = useState([
    { id: 1,name: "Nguyễn Ngọc Mai", phone: "0081016655", email: "mai123@gmail.com", address: "Hà Nội", gender: "Nữ",specialty:"Xquang", info: ""},
    { id: 2,name: "Dương Anh Ngọc", phone: "0123456789", email: "dieu@gmail.com", address: "Hà Nội", gender: "Nữ", specialty:"Xquang", info: ""},
    // Thêm dữ liệu khác nếu cần
  ]);
  const filteredData = doctorData.filter(
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
  const handleAddDoctor = (newDoctor) => {
    const newId = doctorData.length ? doctorData[doctorData.length - 1].id + 1 : 1; // Tạo ID mới
    setDoctorData((prevData) => [
      ...prevData,
      { id: newId, ...newDoctor },
    ]);
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
            <h1>Bác Sỹ</h1>
            <button onClick={toggleModal} className="add-spa">+ Thêm tài khoản</button>
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
                  <th>ID</th>
                  <th>Tên đầy đủ</th>
                  <th>SĐT</th>
                  <th>Email</th>
                  <th>Địa chỉ</th>
                  <th>Giới tính</th>
                  <th>Chuyên khoa</th>
                  <th>Thông tin</th>
                  <th>Tùy chọn</th>
                </tr>
              </thead>
              <tbody>
              {filteredData.length > 0 ? (
            filteredData.map((item, index) => (
              <tr key={index}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.phone}</td>
                <td>{item.email}</td>
                <td>{item.address}</td>
                <td>{item.gender}</td>
                <td>{item.specialty}</td>
                <td>{item.info}</td>
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
      {isModalOpen && <AddDoctor onClose={toggleModal} onAddDoctor={handleAddDoctor}/>}
    </div>
  );
};

export default Doctor;