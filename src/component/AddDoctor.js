import React, { useState } from "react";
import "./AddSchedule.css"; // Tạo file CSS cho phong cách

const AddDoctor = ({ onClose, onAddDoctor }) => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    specialty: "",
    info: "",
    gender: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Gọi hàm onAddAccount để thêm tài khoản
    onAddDoctor(formData);
    // Reset formData về giá trị ban đầu
    setFormData({
      name: "",
      phone: "",
      email: "",
      address: "",
      specialty: "",
      info: "",
      gender: "",
    });

    // Đóng modal
    onClose();
  };

  return (
    <div className="add-spa-modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <h2>THÊM BÁC SỸ</h2>
        <form onSubmit={handleSubmit}>
          {/* Các trường nhập liệu */}
          <div>
            <label>Tên đầy đủ</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>SĐT</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Địa chỉ</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Chuyên khoa</label>
            <input
              type="text"
              name="specialty"
              value={formData.specialty}
              onChange={handleChange}
              required
            />
          </div>
          <label>Giới tính</label>
          <div className="gender-container">
            <label>
              <input
                type="radio"
                name="gender"
                value="Nam"
                checked={formData.gender === "Nam"}
                onChange={handleChange}
                required
              />
              Nam
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="Nữ"
                checked={formData.gender === "Nữ"}
                onChange={handleChange}
                required
              />
              Nữ
            </label>
          </div>
          <div className="button-group">
            <button type="submit">Tạo tài khoản</button>
            <button type="button" onClick={onClose}>
              Đóng
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddDoctor;
