import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; 
import "./Schedule.css";
import editIcon from "../picture/Edit.png";
import deleteIcon from "../picture/Delete.png";
import Sidebar from "./Sidebar";
import AddSchedule from "./AddSchedule";

const Schedule = ({ username, onLogout }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [scheduleData, setScheduleData] = useState([]);
  const [isScheduleOpen, setIsScheduleOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState("home");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  
  // 🛡️ Kiểm tra đăng nhập
  useEffect(() => {
    if (!token) {
      alert("Bạn chưa đăng nhập!");
      navigate("/login");
      return;
    }

    const fetchSchedules = async () => {
      try {
        const response = await axios.get("https://pet-booking-eta.vercel.app/appointments", {
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log("📦 Dữ liệu từ API:", response.data);

        if (Array.isArray(response.data.data)) {
          setScheduleData(response.data.data);
        } else {
          console.error("❌ Dữ liệu không hợp lệ!", response.data);
          setScheduleData([]);
        }
      } catch (error) {
        console.error("🚨 Lỗi khi lấy dữ liệu:", error);
        setScheduleData([]);
      }
    };

    fetchSchedules();
  }, [token, navigate]);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Bạn có chắc muốn hủy lịch hẹn này?");
    if (!confirmDelete) return;
  
    try {
      const response = await axios.delete(`https://pet-booking-eta.vercel.app/appointments/${id}/cancel`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      console.log("🗑️ Hủy thành công:", response.data);
  
      // Cập nhật lại danh sách lịch hẹn sau khi xoá
      setScheduleData(prev => prev.filter(item => item._id !== id));
    } catch (error) {
      console.error("❌ Lỗi khi hủy lịch hẹn:", error);
      alert("Hủy lịch hẹn thất bại!");
    }
  };
  

  const handleLogout = () => {
    localStorage.removeItem("token");
    onLogout();
    navigate("/login");
  };

  const toggleSchedule = () => {
    setIsScheduleOpen(!isScheduleOpen);
  };

  const handleMenuClick = (menu) => {
    setActiveMenu(menu);
  };

  // ✅ Đúng thuộc tính API
  const filteredData = (Array.isArray(scheduleData) ? scheduleData : []).filter(
    (item) =>
      item.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.customerPhone.includes(searchTerm)
  );

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
            <span><i className="fa-solid fa-circle-user icon-user"></i> Xin chào {username}</span>
            <button className="logout" onClick={handleLogout}>
              Log Out
            </button>
          </div>
        </div>
        <div className="spa-detail-container">
          <header>
            <h1>Lịch Khám</h1>
            <button onClick={toggleModal} className="add-spa">+ Thêm lịch khám</button>
            <div className="search-container">
              <input
                type="text"
                placeholder="Tìm kiếm..."
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
                  <th>Tên khách hàng</th>
                  <th>Số điện thoại</th>
                  <th>Pet</th>
                  <th>Giống</th>
                  <th>Bác sĩ</th>
                  <th>Ngày</th>
                  <th>Thanh toán</th>
                  <th>Giá</th>
                  <th>Trạng thái</th>
                  <th>Tùy chọn</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.length > 0 ? (
                  filteredData.map((item) => (
                    <tr key={item._id}>
                      <td>{item.customerName}</td>
                      <td>{item.customerPhone}</td>
                      <td>{item.petName}</td>
                      <td>{item.petBreed}</td>
                      <td>{item.vetDoctor?.name}</td>
                      <td>{new Date(item.appointmentTime).toLocaleString()}</td>
                      <td>{item.paymentMethod}</td>
                      <td>{item.service?.price} VND</td>
                      <td>{item.status}</td>
                      <td>
                        <button>
                          <img src={editIcon} alt="Edit" />
                        </button>
                        <button onClick={() => handleDelete(item._id)}>
                          <img src={deleteIcon} alt="Delete" />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="10">Không có dữ liệu.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {isModalOpen && <AddSchedule onClose={toggleModal} />}
    </div>
  );
};

export default Schedule;
