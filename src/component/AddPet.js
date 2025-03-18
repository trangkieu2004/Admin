import React, { useState } from "react";
import "./AddPet.css";

const AddPet = ({ onClose, onAddPet }) => {
  const [formData, setFormData] = useState({
    account: "",
    name: "",
    gender: "",
    age: "",
    breed: "",
    weight: "",
    type: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // Gọi hàm onAddAccount để thêm tài khoản
    onAddPet(formData);
    // Reset formData về giá trị ban đầu
    setFormData({
      account: "",
      name: "",
      gender: "",
      age: "",
      breed: "",
      weight: "",
      type: "",
    });

    // Đóng modal
    onClose();
  };
  return (
    <div className="add-pet-modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <h2>THÊM THÚ CƯNG</h2>
        <form onSubmit={handleSubmit}>
          {/* Các trường nhập liệu */}
          <div>
            <label>Tài Khoản</label>
            <input
              type="text"
              name="account"
              value={formData.account}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Tên thú cưng</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>gender</label>
            <input
              type="gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Tuổi</label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Giống loài</label>
            <input
              type="text"
              name="breed"
              value={formData.breed}
              onChange={handleChange}
              required
            />
          </div>
          <label>Cân nặng</label>
          <input
            type="text"
            name="weight"
            value={formData.weight}
            onChange={handleChange}
            required
          />
          <label>Loại</label>
          <input
            type="text"
            name="type"
            value={formData.type}
            onChange={handleChange}
            required
          />
          <div className="button-group">
            <button type="submit">Lưu</button>
            <button type="button" onClick={onClose}>
              Đóng
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPet;
