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
  const [editStatusId, setEditStatusId] = useState(null); // Lưu ID đang chỉnh sửa
  const [selectedStatus, setSelectedStatus] = useState(""); // Lưu trạng thái được chọn

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      alert("Bạn chưa đăng nhập!");
      navigate("/login");
      return;
    }
    const fetchSchedules = async () => {
      try {
        const response = await axios.get(
          "https://pet-booking-eta.vercel.app/appointments",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

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
  const statusOptions = [
    { label: "Chờ xác nhận", value: "pending" },
    { label: "Đã xác nhận", value: "confirmed" },
    { label: "Đang đợi", value: "waiting" },
    { label: "Đang thực hiện", value: "in_progress" },
    { label: "Hoàn thành", value: "completed" },
    { label: "Đã hủy", value: "canceled" },
  ];
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Bạn có chắc muốn hủy lịch hẹn này?");
    if (!confirmDelete) return;
    try {
      await axios.delete(
        `https://pet-booking-eta.vercel.app/appointments/${id}/cancel`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setScheduleData((prev) => prev.filter((item) => item._id !== id));
      alert("Lịch hẹn đã được xoá hoàn toàn!");
    } catch (error) {
      console.error("❌ Lỗi khi xoá lịch hẹn:", error);
      alert("Xoá lịch hẹn thất bại!");
    }
  };

  const handleEditClick = (id, currentStatus) => {
    setEditStatusId(id);
    setSelectedStatus(currentStatus);
  };

  const handleUpdateStatus = async (id) => {
    if (!selectedStatus) {
      alert("Vui lòng chọn trạng thái!");
      return;
    }

    try {
      const response = await axios.put(
        `https://pet-booking-eta.vercel.app/appointments/${id}/status`,
        { status: selectedStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("✅ API Response:", response.data);
      alert("Cập nhật trạng thái thành công!");

      setScheduleData((prevData) =>
        prevData.map((item) =>
          item._id === id ? { ...item, status: selectedStatus } : item
        )
      );
      setEditStatusId(null); // Đóng dropdown sau khi cập nhật
    } catch (error) {
      console.error(
        "❌ Lỗi khi cập nhật trạng thái:",
        error.response?.data || error.message
      );
      alert("Cập nhật trạng thái thất bại!");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    onLogout();
    navigate("/login");
  };
  const handleAddSchedule = (newAppointment) => {
    setScheduleData((prevData) => [newAppointment, ...prevData]); // Thêm vào đầu danh sách
  };

  const toggleSchedule = () => {
    setIsScheduleOpen(!isScheduleOpen);
  };

  const handleMenuClick = (menu) => {
    setActiveMenu(menu);
  };

  const filteredData = scheduleData.filter(
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
            <span>
              <i className="fa-solid fa-circle-user icon-user"></i> Xin chào{" "}
              {username}
            </span>
            <button className="logout" onClick={handleLogout}>
              Log Out
            </button>
          </div>
        </div>
        <div className="spa-detail-container">
          <header>
            <h1>Lịch Khám</h1>
            <button onClick={toggleModal} className="add-spa">
              + Thêm lịch khám
            </button>
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
                  <th>ID</th>
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
                      <td>{item._id}</td>
                      <td>{item.customerName}</td>
                      <td>{item.customerPhone}</td>
                      <td>{item.petName}</td>
                      <td>{item.petBreed}</td>
                      <td>{item.vetDoctor?.name}</td>
                      <td>{new Date(item.appointmentTime).toLocaleString()}</td>
                      <td>{item.paymentMethod}</td>
                      <td>{item.service?.price} VND</td>
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
      {isModalOpen && <AddSchedule onClose={toggleModal} onAddSchedule={handleAddSchedule} />}
    </div>
  );
};

export default Schedule;
