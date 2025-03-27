// UpdateStatus.js
import React, { useState } from 'react';
import axios from 'axios';

const UpdateStatus = ({ appointment, onClose, onUpdate }) => {
  const [newStatus, setNewStatus] = useState(appointment.status);
  const token = localStorage.getItem("token");

  const handleUpdateStatus = async () => {
    try {
      const response = await axios.put(
        `https://pet-booking-eta.vercel.app/appointments/${appointment._id}/status`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      console.log("✅ Cập nhật thành công:", response.data);
      onUpdate(appointment._id, newStatus);
      alert("Cập nhật trạng thái thành công!");
      onClose();
    } catch (error) {
      console.error("❌ Lỗi cập nhật trạng thái:", error.response?.data || error.message);
      alert("Cập nhật thất bại! Vui lòng thử lại.");
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h3>Cập nhật trạng thái</h3>
        <select value={newStatus} onChange={(e) => setNewStatus(e.target.value)}>
          <option value="pending">Chờ xác nhận</option>
          <option value="confirmed">Đã xác nhận</option>
          <option value="waiting">Chờ thực hiện</option>
          <option value="in_progress">Đang thực hiện</option>
          <option value="completed">Hoàn thành</option>
        </select>
        <button onClick={handleUpdateStatus}>Lưu</button>
        <button onClick={onClose}>Hủy</button>
      </div>
    </div>
  );
};

export default UpdateStatus;