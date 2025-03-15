import React, { useState } from "react";
import {useNavigate } from "react-router-dom"; // Nhập Link từ react-router-dom
import "./UserCustomer.css";
import editIcon from "../img/Edit.png"; // Thay đổi đường dẫn nếu cần
import deleteIcon from "../img/Delete.png"; // Thay đổi đường dẫn nếu cần
import Sidebar from "./Sidebar";
import AddCustomer from "./AddCustomer";

const UserCustomer = ({ username, onLogout }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [customerData, setCustomerData] = useState([
    { id: 1,account: "An", name: "Lê Thị An", phone: "0081016655", email: "an123@gmail.com", address: "Hà Nội", gender: "Nữ" },
    { id: 2,account: "Diệu", name: "Nguyễn Thị Diệu", phone: "0123456789", email: "dieu@gmail.com", address: "Hà Nội", gender: "Nữ" },
    { id: 3,account: "ABC", name: "Trần Văn B", phone: "0123456789", email: "b@gmail.com", address: "Hà Nội", gender: "Nam" },
    // Thêm dữ liệu khác nếu cần
  ]);
  const filteredData = customerData.filter(
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
  const handleAddCustomer = (newCustomer) => {
    const newId = customerData.length ? customerData[customerData.length - 1].id + 1 : 1; // Tạo ID mới
    setCustomerData((prevData) => [
      ...prevData,
      { id: newId, ...newCustomer },
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
            <h1>Khách Hàng</h1>
            <button onClick={toggleModal} className="add-spa">+ Thêm khách hàng</button>
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
                  <th>Tài Khoản</th>
                  <th>Tên đầy đủ</th>
                  <th>SĐT</th>
                  <th>Email</th>
                  <th>Địa chỉ</th>
                  <th>Giới tính</th>
                  <th>Tùy chọn</th>
                </tr>
              </thead>
              <tbody>
              {filteredData.length > 0 ? (
            filteredData.map((item, index) => (
              <tr key={index}>
                <td>{item.id}</td>
                <td>{item.account}</td>
                <td>{item.name}</td>
                <td>{item.phone}</td>
                <td>{item.email}</td>
                <td>{item.address}</td>
                <td>{item.gender}</td>
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
      {isModalOpen && <AddCustomer onClose={toggleModal} onAddCustomer={handleAddCustomer}/>}
    </div>
  );
};

export default UserCustomer;