import React, { useState } from "react";
import "./AddCustomer.css"; // Tạo file CSS cho phong cách

const AddCustomer = ({ onClose, onAddCustomer }) => {
  const [formData, setFormData] = useState({
    account: "",
    password: "",
    phone: "",
    email: "",
    address: "",
    gender: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Gọi hàm onAddAccount để thêm tài khoản
    onAddCustomer(formData);
    // Reset formData về giá trị ban đầu
    setFormData({
      account: "",
      password: "",
      phone: "",
      email: "",
      address: "",
      gender: "",
    });

    // Đóng modal
    onClose();
  };

  return (
    <div className="add-spa-modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>TẠO TÀI KHOẢN</h2>
        <form onSubmit={handleSubmit}>
          {/* Các trường nhập liệu */}
          <div>
            <label>Tài khoản</label>
            <input type="text" name="account" value={formData.account} onChange={handleChange} required />
          </div>
          <div>
            <label>Mật khẩu</label>
            <input type="password" name="password" value={formData.password} onChange={handleChange} required />
          </div>
          <div>
            <label>Số điện thoại</label>
            <input type="text" name="phone" value={formData.phone} onChange={handleChange} required />
          </div>
          <div>
            <label>Email</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required />
          </div>
          <div>
            <label>Địa chỉ</label>
            <input type="text" name="address" value={formData.address} onChange={handleChange} required />
          </div>
          <label>Giới tính</label>
          <select name="gender" value={formData.gender} onChange={handleChange} required>
            <option value="">Chọn giới tính</option>
            <option value="Nam">Nam</option>
            <option value="Nữ">Nữ</option>
          </select>
          <div className="button-group">
            <button type="submit">Tạo tài khoản</button>
            <button type="button" onClick={onClose}>Đóng</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCustomer;