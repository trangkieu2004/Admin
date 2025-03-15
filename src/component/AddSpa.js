import React, { useState } from "react";
import ConfirmBooking from "./ConfirmBooking";
import "./AddSpa.css"; // Tạo file CSS cho phong cách

const AddSpa = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    pet: "",
    weight: "",
    service: "",
    day: "",
    time: "",
    pay: "",
    price: "",
    account: "",
    state: "Chờ xác nhận",
  });

  const [isConfirmVisible, setIsConfirmVisible] = useState(false); // State để hiển thị modal xác nhận

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsConfirmVisible(true); // Hiển thị modal xác nhận
  };

  const handleCloseConfirm = () => {
    setIsConfirmVisible(false); // Đóng modal xác nhận
    onClose(); // Đóng modal tạo lịch
  };

  return (
    <div className="add-spa-modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>Tạo Lịch Spa</h2>
        <form onSubmit={handleSubmit}>
          {/* Các trường nhập liệu */}
          <div>
            <label>Tên:</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} required />
          </div>
          <div>
            <label>Số điện thoại:</label>
            <input type="text" name="phone" value={formData.phone} onChange={handleChange} required />
          </div>
          <div>
            <label>Thông tin pet:</label>
            <input type="text" name="pet" value={formData.pet} onChange={handleChange} />
          </div>
          <div>
            <label>Cân nặng:</label>
            <input type="text" name="weight" value={formData.weight} onChange={handleChange} />
          </div>
          <div>
            <label>Dịch vụ:</label>
            <select name="service" value={formData.service} onChange={handleChange} required>
              <option value="" disabled>Chọn dịch vụ</option>
              <option value="Tắm cạo">Tắm cạo</option>
              <option value="Chăm sóc sức khỏe">Chăm sóc sức khỏe</option>
              <option value="Tắm trắng">Tắm trắng</option>
              <option value="Spa cho thú cưng">Spa cho thú cưng</option>
            </select>
          </div>
          <div>
            <label>Ngày:</label>
            <input type="date" name="day" value={formData.day} onChange={handleChange} required />
          </div>
          <div>
            <label>Giờ:</label>
            <input type="time" name="time" value={formData.time} onChange={handleChange} required />
          </div>
          <div>
            <label>Phương thức thanh toán:</label>
            <select name="pay" value={formData.pay} onChange={handleChange} required>
              <option value="" disabled>Chọn phương thức thanh toán</option>
              <option value="Thanh toán khi xong dịch vụ">Thanh toán khi xong dịch vụ</option>
              <option value="Chuyển khoản">Chuyển khoản</option>
              <option value="Thanh toán trực tiếp">Thanh toán trực tiếp</option>
            </select>
          </div>
          <div>
            <label>Giá:</label>
            <input type="number" name="price" value={formData.price} onChange={handleChange} required />
          </div>
          <div>
            <label>Tài khoản:</label>
            <input type="text" name="account" value={formData.account} onChange={handleChange} required />
          </div>
          <div className="button-group">
            <button type="submit">Tạo Lịch</button>
            <button type="button" onClick={onClose}>Hủy</button>
          </div>
        </form>
      </div>

      {/* Hiển thị modal xác nhận */}
      {isConfirmVisible && (
        <ConfirmBooking formData={formData} onClose={handleCloseConfirm} />
      )}
    </div>
  );
};

export default AddSpa;