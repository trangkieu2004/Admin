import React, { useState } from "react";
import "./AddDoctor.css"; // Tạo file CSS cho phong cách

const AddDoctor = ({ onClose, onAddDoctor }) => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    specialization: "",
    qualification: "",
    description: "",
    gender: "",
  });
  // Hàm chuyển đổi giới tính từ tiếng Việt sang chuẩn API
  const mapGender = (gender) => {
    if (gender === "Nam") return "MALE";
    if (gender === "Nữ") return "FEMALE";
    return "OTHER";
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const doctorData = {
      name: formData.name.trim(),
      phone: formData.phone.trim(),
      email: formData.email.trim(),
      gender: mapGender(formData.gender),
      specialization: formData.specialization.trim(),
      address: formData.address.trim(),
      qualification: formData.qualification.trim(),
      description: formData.description.trim(),
    };
  
    const token = localStorage.getItem("token");
  
    if (!token) {
      alert("Chưa đăng nhập hoặc token không tồn tại");
      return;
    }
  
    console.log("Dữ liệu gửi lên:", doctorData);
  
    try {
      const response = await fetch(
        "https://pet-booking-eta.vercel.app/vet-doctors",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(doctorData),
        }
      );
  
      if (response.ok) {
        const data = await response.json();
        alert("Thêm bác sỹ thành công!");
        onAddDoctor(data);
        onClose();
      } else {
        const errorData = await response.json();
        alert("Có lỗi khi thêm bác sỹ: " + (errorData.message || "Đã xảy ra lỗi"));
      }
    } catch (error) {
      console.error("Lỗi khi gọi API:", error);
      alert("Lỗi kết nối đến máy chủ");
    }
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
              name="specialization"
              value={formData.specialization}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Bằng cấp</label>
            <input
              type="text"
              name="qualification"
              value={formData.qualification}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Mô tả</label>
            <input
              type="text"
              name="description"
              value={formData.description}
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
