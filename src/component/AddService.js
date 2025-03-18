import React, { useState } from "react";
import "./AddService.css";

const AddService = ({ isOpen, onClose, onAddService }) => {
  const [newService, setNewService] = useState({
    name: "",
    description: "",
    price: "",
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewService({ ...newService, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const payload = {
      name: newService.name,
      description: newService.description,
      price: Number(newService.price),
    };
  
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("https://pet-booking-eta.vercel.app/services", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const addedService = await response.json();
        onAddService(addedService.data); // Gọi callback truyền dữ liệu
        alert("Thêm dịch vụ thành công!");
        setNewService({ name: "", description: "", price: "" });
        onClose();
      } else {
        alert("Không thể thêm dịch vụ. Hãy kiểm tra quyền hoặc token.");
      }
    } catch (err) {
      console.error("Lỗi:", err);
      alert("Có lỗi xảy ra khi thêm dịch vụ.");
    }
  };
  
  return(
    <div className="add-service-modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <h2>THÊM DỊCH VỤ</h2>
        <form onSubmit={handleSubmit}>
          {/* Các trường nhập liệu */}
          <div>
            <label>Tên dịch vụ</label>
            <input
              type="text"
              name="name"
              value={newService.name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label>Thông tin dịch vụ</label>
            <input
              type="text"
              name="description"
              value={newService.description}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label>Giá</label>
            <input
              type="text"
              name="price"
              value={newService.price}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="button-group">
            <button type="submit" onClick={handleSubmit}>Lưu</button>
            <button type="button" onClick={onClose}>
              Đóng
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddService;
