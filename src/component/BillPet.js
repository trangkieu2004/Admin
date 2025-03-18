import React, { useState } from "react";
import {useNavigate } from "react-router-dom"; // Nhập Link từ react-router-dom
import "./BillPet.css";
import Sidebar from "./Sidebar";

const BillPet = ({ username, onLogout }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const bill = [
    {
        id: 1,
        account: "An",
        fullName: "Lê Thị An",
        phone: "09831016555",
        petName: "Fog",
        service: "Tắm cắt",
        paymentMethod: "Đã thanh toán",
        price: "200.000đ",
        paymentStatus: "Đã thanh toán",
    },
    {
        id: 2,
        account: "Duy",
        fullName: "Nguyễn Thị Duy",
        phone: "0123456789",
        petName: "Cún",
        service: "Khám, tư vấn, điều trị",
        paymentMethod: "Chuyển khoản",
        price: "200.000đ",
        paymentStatus: "Chưa thanh toán",
    },
];
const filteredData = bill.filter((item) => {
  return (
      (item.account && item.account.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (item.fullName && item.fullName.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (item.phone && item.phone.includes(searchTerm)) || // Giả sử bạn muốn tìm kiếm theo số điện thoại
      (item.petName && item.petName.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (item.service && item.service.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (item.price && item.price.toLowerCase().includes(searchTerm.toLowerCase()))
  );
});
  const [isScheduleOpen, setIsScheduleOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState("home");
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
        <div className="bill-detail-container">
          <header>
            <h1>Hóa đơn</h1>
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
          <div className="bill-detail-table">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Tài khoản</th>
                  <th>Tên đầy đủ</th>
                  <th>SĐT</th>
                  <th>Tên thú cưng</th>
                  <th>Dịch vụ</th>
                  <th>Phương thức thanh toán</th>
                  <th>Giá</th>
                  <th>Trạng thái thanh toán</th>
                  <th>Tùy chọn</th>
                </tr>
              </thead>
              <tbody>
              {filteredData.length > 0 ? (
            filteredData.map((item, index) => (
              <tr key={index}>
                <td>{item.id}</td>
                <td>{item.account}</td>
                <td>{item.fullName}</td>
                <td>{item.phone}</td>
                <td>{item.petName}</td>
                <td>{item.service}</td>
                <td>{item.paymentMethod}</td>
                <td>{item.price}</td>
                <td>{item.paymentStatus}</td>
                <td>
                  <button>
                    Print
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="10">Không tìm thấy kết quả.</td>
            </tr>
          )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BillPet
