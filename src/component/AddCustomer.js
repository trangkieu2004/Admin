import React, { useState } from "react";
import "./AddCustomer.css";

const AddCustomer = ({ onClose, onAddCustomer }) => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    phone: "",
    email: "",
    address: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setFormData({
      username: "",
      password: "",
      phone: "",
      email: "",
      address: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://pet-booking-eta.vercel.app/user/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, role: "USER" }),
      });

      if (response.ok) {
        const newCustomerResponse = await response.json();
        onAddCustomer(newCustomerResponse.data);
        alert("Tạo khách hàng thành công!");
        resetForm();
        onClose();
      } else {
        alert("Tạo tài khoản thất bại. Vui lòng kiểm tra lại.");
      }
    } catch (error) {
      console.error("Lỗi khi tạo khách hàng:", error);
      alert("Có lỗi xảy ra. Vui lòng thử lại.");
    }
  };

  return (
    <div className="add-spa-modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>TẠO TÀI KHOẢN</h2>
        <form onSubmit={handleSubmit}>
          {["username", "password", "phone", "email", "address"].map((field) => (
            <div key={field}>
              <label>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
              <input
                type={field === "password" ? "password" : "text"}
                name={field}
                value={formData[field]}
                onChange={handleChange}
                required
              />
            </div>
          ))}
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
