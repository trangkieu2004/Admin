import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import điều hướng
import axios from "axios";
import "./SpaDetail.css";
import editIcon from "../picture/Edit.png";
import deleteIcon from "../picture/Delete.png";
import Sidebar from "./Sidebar";
import AddSpa from "./AddSpa";

const SpaDetail = ({ username, onLogout }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [spaData, setSpaData] = useState([]);
  const [isScheduleOpen, setIsScheduleOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState("home");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editStatusId, setEditStatusId] = useState(null); // Lưu ID đang chỉnh sửa
  const [selectedStatus, setSelectedStatus] = useState(""); // Lưu trạng thái được chọn
  const navigate = useNavigate();

  const toggleSchedule = () => setIsScheduleOpen(!isScheduleOpen);
  const handleMenuClick = (menu) => setActiveMenu(menu);
  const toggleModal = () => setIsModalOpen(!isModalOpen);

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      alert("Bạn chưa đăng nhập!");
      navigate("/login");
      return;
    }

    const fetchSpa = async () => {
      try {
        const response = await axios.get("https://pet-booking-eta.vercel.app/appointments", {
          headers: { Authorization: `Bearer ${token}` },
        });
    
        console.log("📦 Dữ liệu từ API:", response.data);
    
        // Nếu API trả về một mảng, thì set thẳng vào state
        if (Array.isArray(response.data)) {
          setSpaData(response.data);
        } else if (Array.isArray(response.data.data)) {
          setSpaData(response.data.data);
        } else {
          console.error("❌ Dữ liệu không hợp lệ!", response.data);
          setSpaData([]);
        }
      } catch (error) {
        console.error("🚨 Lỗi khi lấy dữ liệu:", error);
        setSpaData([]);
      }
    };
    

    fetchSpa();
  }, [token, navigate]);
  const statusOptions = [
    { label: "Chờ xác nhận", value: "pending" },
    { label: "Đã xác nhận", value: "confirmed" },
    { label: "Đang đợi", value: "waiting" },
    { label: "Đang thực hiện", value: "in_progress" },
    { label: "Hoàn thành", value: "completed" },
    { label: "Đã hủy", value: "canceled" },
  ];
  const handleEditClick = (id, currentStatus) => {
    setEditStatusId(id);
    setSelectedStatus(currentStatus);
  };

  const handleLogout = () => {
    onLogout();
    navigate("/login");
  };

  // Lọc dữ liệu tìm kiếm
  const filteredData = spaData.filter(
    (item) =>
      item.service?.name && // Chỉ lấy những mục có dịch vụ hợp lệ
      (
        (item.customerName && item.customerName.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (item.customerPhone && item.customerPhone.includes(searchTerm))
      )
  );
  const handleUpdateStatus = async (id) => {
    if (!selectedStatus) {
      alert("Vui lòng chọn trạng thái!");
      return;
    }

    try {
      const response = await axios.put(
        `https://pet-booking-eta.vercel.app/appointments/${id}/status`,
        { status: selectedStatus },
        { headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" } }
      );

      console.log("✅ API Response:", response.data);
      alert("Cập nhật trạng thái thành công!");

      setSpaData((prevData) =>
        prevData.map((item) => (item._id === id ? { ...item, status: selectedStatus } : item))
      );
      setEditStatusId(null); // Đóng dropdown sau khi cập nhật
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Cập nhật trạng thái thất bại!";
      console.error("❌ Lỗi khi cập nhật trạng thái:", errorMessage);
      alert(`🚨 Lỗi: ${errorMessage}`);
    }
  };
  
  const handleDeleteAppointment = async (id) => {
    const confirmDelete = window.confirm("Bạn có chắc chắn muốn hủy lịch hẹn này?");
    if (!confirmDelete) return;
  
    try {
      const response = await axios.delete(
        `https://pet-booking-eta.vercel.app/appointments/${id}/cancel`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
  
      console.log("🗑️ Xóa lịch hẹn thành công:", response.data);
      alert("Lịch hẹn đã được hủy!");
  
      // Cập nhật danh sách hiển thị
      setSpaData((prevData) => prevData.filter((item) => item._id !== id));
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Hủy lịch hẹn thất bại!";
      console.error("❌ Lỗi khi hủy lịch hẹn:", errorMessage);
      alert(`🚨 Lỗi: ${errorMessage}`);
    }
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
            <span><i className="fa-solid fa-circle-user icon-user"></i> Xin chào {username}</span>
            <button className="logout" onClick={handleLogout}>Log Out</button>
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
                  <th>ID</th>
                  <th>Tên khách</th>
                  <th>Số điện thoại</th>
                  <th>Tên Pet</th>
                  <th>Giống</th>
                  <th>Dịch vụ</th>
                  <th>Ngày</th>
                  <th>Thanh toán</th>
                  <th>Giá</th>
                  <th>Trạng thái</th>
                  <th>Tùy chọn</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.length > 0 ? (
                  filteredData.map((item, index) => (
                    <tr key={index}>
                      <td>{item._id}</td>
                      <td>{item.customerName}</td>
                      <td>{item.customerPhone}</td>
                      <td>{item.petName}</td>
                      <td>{item.petBreed}</td>
                      <td>{item.service?.name || "N/A"}</td>
                      <td>{item.appointmentTime ? new Date(item.appointmentTime).toLocaleString() : "Chưa đặt lịch"}</td>
                      <td>{item.paymentMethod || "Chưa thanh toán"}</td>
                      <td>{item.service?.price ? `${item.service.price} VND` : "Không có giá"}</td>
                      <td>
                      {editStatusId === item._id ? (
                        <select
                          value={selectedStatus}
                          onChange={(e) => setSelectedStatus(e.target.value)}
                        >
                          {statusOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      ) : (
                        item.status || "Chưa xác định"
                      )}
                    </td>
                      <td>
                      {editStatusId === item._id ? (
                        <button onClick={() => handleUpdateStatus(item._id)}>Lưu</button>
                      ) : (
                        <button onClick={() => handleEditClick(item._id, item.status)}>
                          <img src={editIcon} alt="Edit" />
                        </button>
                      )}
                        <button onClick={() => handleDeleteAppointment(item._id)}><img src={deleteIcon} alt="Delete" /></button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="11">Không tìm thấy kết quả.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {isModalOpen && <AddSpa onClose={toggleModal} />}
    </div>
  );
};

export default SpaDetail;