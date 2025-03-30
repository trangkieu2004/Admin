import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AddSchedule.css";

const AddSchedule = ({ onClose, onAddSchedule }) => {
  const [formData, setFormData] = useState({
    customerName: "",
    customerPhone: "",
    appointmentTime: "",
    vetDoctor: "",
    status: "pending",
    note: "",
    petName: "",
    petType: "",
    petAge: "",
    petBreed: "",
    petGender: "",
    paymentMethod: "",
  });

  const [doctors, setDoctors] = useState([]);
  // 🛠 Theo dõi thay đổi của `formData`
  useEffect(() => {
    console.log("🛠 formData đã cập nhật:", formData);
  }, [formData]);
  // 🛠 Nếu `_id` được cập nhật, tự động hiển thị modal xác nhận

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
        const doctorRes = await axios.get(
          "https://pet-booking-eta.vercel.app/vet-doctors",
          { headers }
        );
        console.log("📋 Danh sách bác sĩ:", doctorRes.data?.data); // Kiểm tra dữ liệu
        if (Array.isArray(doctorRes.data?.data)) {
          setDoctors(doctorRes.data.data);
        }
      } catch (error) {
        console.error("❌ Lỗi khi fetch dữ liệu:", error);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "vetDoctor") {
      setFormData((prev) => ({
        ...prev,
        vetDoctor: value, // Chỉ lưu ID thay vì object
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Bạn chưa đăng nhập! Vui lòng đăng nhập.");
      return;
    }
  
    if (!formData.vetDoctor) {
      alert("❌ Vui lòng chọn bác sĩ!");
      return;
    }
  
    const payload = {
      ...formData,
      appointmentTime: new Date(formData.appointmentTime).toISOString(),
    };
  
    console.log("📤 Dữ liệu gửi lên server:", payload);
  
    try {
      const response = await axios.post(
        "https://pet-booking-eta.vercel.app/appointments",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
  
      console.log("📌 API Response:", response.data);
  
      // 🔹 Cập nhật `_id` nếu tồn tại
      setFormData((prev) => ({
        ...prev,
        _id: response.data.data?._id || "", // Đảm bảo không lỗi nếu API không trả về _id
      }));
      const newAppointment = response.data.data;
      alert("🎉 Lịch hẹn đã được tạo thành công!");
      if (newAppointment) {
        onAddSchedule(newAppointment);
      }
      handleCloseConfirm();
    } catch (error) {
      console.error("🚨 API Error:", error.response?.data);
      alert(
        `❌ Không thể tạo lịch hẹn: ${
          error.response?.data?.message || "Lỗi không xác định"
        }`
      );
    }
  };
  

  const handleCloseConfirm = () => {
    onClose();
  };

  return (
    <div className="add-spa-modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <h2>Tạo Lịch Khám</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Tên khách hàng:</label>
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
            <label>Bác sĩ:</label>
            <select
              name="vetDoctor"
              value={formData.vetDoctor} // Chỉ lưu ID
              onChange={handleChange}
              required
            >
              <option value="">Chọn bác sĩ</option>
              {doctors.map((doctor) => (
                <option key={doctor._id} value={doctor._id}>
                  {doctor.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label>Tên thú cưng:</label>
            <input
              type="text"
              name="petName"
              value={formData.petName}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Loại thú cưng:</label>
            <input
              type="text"
              name="petType"
              value={formData.petType}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Tuổi:</label>
            <input
              type="number"
              name="petAge"
              value={formData.petAge}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Giống:</label>
            <input
              type="text"
              name="petBreed"
              value={formData.petBreed}
              onChange={handleChange}
              required
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
            <button type="submit">Tạo lịch khám</button>
            <button type="button" onClick={onClose}>
              Đóng
            </button>
          </div>
        </form>
      </div>

      {/* {isConfirmVisible && (
        <>
          {console.log("📌 Debug trước khi mở modal:", formData)}
          <ConfirmSchedule
            formData={formData}
            onClose={handleCloseConfirm}
            doctors={doctors}
          />
        </>
      )} */}
    </div>
  );
};

export default AddSchedule;
