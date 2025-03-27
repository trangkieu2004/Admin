import React, { useState, useEffect } from "react";
import axios from "axios";
import ConfirmBooking from "./ConfirmBooking";
import "./AddSpa.css"; // Tạo file CSS cho phong cách

const AddSpa = ({ onClose }) => {
  const [formData, setFormData] = useState({
    customerName: "",
    customerPhone: "",
    service: "",
    appointmentTime: "",
    status: "pending",
    note: "",
    petName: "",
    petType: "",
    petAge: "",
    petBreed: "",
    petGender: "",
    paymentMethod: "",
  });

  const [isConfirmVisible, setIsConfirmVisible] = useState(false);
  const [services, setServices] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("❌ Không có token! Vui lòng đăng nhập lại.");
        return;
      }

      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };

      try {
        const serviceRes = await axios.get(
          "https://pet-booking-eta.vercel.app/services",
          { headers }
        );
        if (Array.isArray(serviceRes.data?.data)) {
          setServices(serviceRes.data.data);
        }
      } catch (error) {
        console.error("❌ Lỗi khi fetch dịch vụ:", error);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Bạn chưa đăng nhập! Vui lòng đăng nhập.");
      return;
    }

    const payload = {
      ...formData,
      appointmentTime: new Date(formData.appointmentTime).toISOString(),
    };

    console.log("📤 Dữ liệu gửi:", payload);

    try {
      await axios.post(
        "https://pet-booking-eta.vercel.app/appointments",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      alert("🎉 Lịch hẹn đã được tạo thành công!");
      setIsConfirmVisible(true);
    } catch (error) {
      console.error("🚨 Lỗi gửi lịch:", error);
      console.error("📩 Phản hồi từ server:", error.response?.data);
      const msg =
        error.response?.data?.message ||
        "Không thể tạo lịch hẹn. Vui lòng thử lại.";
      alert(`❌ ${msg}`);
    }
  };

  const handleCloseConfirm = () => {
    setIsConfirmVisible(false);
    onClose(); // Đóng modal tạo lịch
  };

  return (
    <div className="add-spa-modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <h2>Tạo Lịch Spa</h2>
        <form onSubmit={handleSubmit}>
          {/* Các trường nhập liệu */}
          <div>
            <label>Tên:</label>
            <input
              type="text"
              name="customerName"
              value={formData.customerName}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Số điện thoại:</label>
            <input
              type="text"
              name="customerPhone"
              value={formData.customerPhone}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Tên thú cưng:</label>
            <input
              type="text"
              name="petName"
              value={formData.petName}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Loại thú cưng:</label>
            <input
              type="text"
              name="petType"
              value={formData.petType}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Loài:</label>
            <input
              type="text"
              name="petBreed"
              value={formData.petBreed}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Tuổi:</label>
            <input
              type="number"
              name="petAge"
              value={formData.petAge}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Giới tính:</label>
            <select
              name="petGender"
              value={formData.petGender}
              onChange={handleChange}
              required
            >
              <option value="">Chọn</option>
              <option value="MALE">Đực</option>
              <option value="FEMALE">Cái</option>
              <option value="OTHER">Khác</option>
            </select>
          </div>
          <div>
            <label>Dịch vụ:</label>
            <select
              name="service"
              value={formData.service}
              onChange={handleChange}
              required
            >
              <option value="">Chọn dịch vụ</option>
              {services.map((service) => (
                <option key={service._id} value={service._id}>
                  {service.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label>Thời gian hẹn:</label>
            <input
              type="datetime-local"
              name="appointmentTime"
              value={formData.appointmentTime}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Phương thức thanh toán:</label>
            <select
              name="paymentMethod"
              value={formData.paymentMethod}
              onChange={handleChange}
              required
            >
              <option value="">Chọn phương thức thanh toán</option>
              <option value="cash">Tiền mặt</option>
              <option value="credit_card">Thẻ tín dụng</option>
              <option value="paypal">PayPal</option>
            </select>
          </div>
          <div>
            <label>Ghi chú:</label>
            <textarea
              name="note"
              value={formData.note}
              onChange={handleChange}
            ></textarea>
          </div>
          <div className="button-group">
            <button type="submit">Tạo Lịch</button>
            <button type="button" onClick={onClose}>
              Hủy
            </button>
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
