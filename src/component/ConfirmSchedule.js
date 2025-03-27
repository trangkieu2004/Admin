import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ConfirmSchedule.css";

const ConfirmSchedule = ({ formData, onClose, doctors, onUpdateStatus }) => {
  const [currentStep, setCurrentStep] = useState(formData.status); 
  const token = localStorage.getItem("token");

  const selectedDoctor = doctors?.find((doctor) => doctor._id === formData.vetDoctor);


  const statusSteps = [
    "pending",      // Chờ xác nhận
    "confirmed",    // Đã xác nhận
    "waiting",      // Chờ thực hiện
    "in_progress",  // Đang thực hiện
    "completed",    // Hoàn thành
  ];

  // 🚀 Đồng bộ trạng thái UI khi formData thay đổi
  useEffect(() => {
    console.log("🛠 Debug: doctors nhận vào", doctors);
    console.log("🛠 Debug: formData nhận vào", formData);
    console.log("🛠 Debug: vetDoctor ID:", formData?.vetDoctor);
    console.log("🛠 Debug: ID lịch hẹn:", formData?._id);
    console.log("🛠 Debug: Trạng thái hiện tại:", formData?.status);
  }, [formData, doctors]);

  const handleConfirm = async () => {
    if (!formData || !formData._id) {
      console.error("❌ Lỗi: formData không hợp lệ", formData);
      alert("❌ Không tìm thấy ID lịch hẹn! Kiểm tra lại dữ liệu.");
      return;
    }
  
    const nextStepIndex = statusSteps.indexOf(currentStep) + 1;
    if (nextStepIndex < statusSteps.length) {
      const newStatus = statusSteps[nextStepIndex];
  
      try {
        console.log("📤 Gửi yêu cầu cập nhật:", {
          appointmentId: formData._id,
          status: newStatus,
        });
  
        const response = await axios.patch(
          `https://pet-booking-eta.vercel.app/appointments/${formData._id}/status`, // 📌 Đúng API cập nhật trạng thái
          { status: newStatus },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
  
        console.log("✅ Phản hồi từ API:", response.data);
        setCurrentStep(newStatus);
        alert("✅ Trạng thái đã được cập nhật!");
  
        onUpdateStatus(formData._id, newStatus);
      } catch (error) {
        console.error("❌ Lỗi cập nhật trạng thái:", error.response?.data || error);
        alert("🚨 Cập nhật trạng thái thất bại!");
      }
    }
  };
  

  return (
    <div className="confirm-booking-modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>Tiến trình xác nhận</h2>

        <div className="navigation">
          {statusSteps.map((status, index) => (
            <React.Fragment key={index}>
              <div
                className={`nav-item 
                  ${statusSteps.indexOf(currentStep) > index ? "completed" : ""} 
                  ${status === currentStep ? "current" : ""}`}
              >
                <div className="circle">{index + 1}</div>
                <span>
                  {status === "pending"
                    ? "Chờ xác nhận"
                    : status === "confirmed"
                    ? "Đã xác nhận"
                    : status === "waiting"
                    ? "Chờ thực hiện"
                    : status === "in_progress"
                    ? "Đang thực hiện"
                    : "Hoàn thành"}
                </span>
              </div>
              {index < statusSteps.length - 1 && <div className="line"></div>}
            </React.Fragment>
          ))}
        </div>

        <div className="button-group under-navigation">
          <button type="button" onClick={handleConfirm} className="btn-orange">
            Xác nhận
          </button>
          <button type="button" onClick={onClose}>
            Đóng
          </button>
        </div>

        <form className="form-confirm">
          <div>
            <label>Tên:</label>
            <input type="text" value={formData.customerName} readOnly />
          </div>
          <div>
            <label>Số điện thoại:</label>
            <input type="text" value={formData.customerPhone} readOnly />
          </div>
          <div>
            <label>Bác sĩ:</label>
            <input type="text" value={selectedDoctor?.name || "Chưa có bác sĩ"} readOnly />
          </div>
          <div>
            <label>Ngày:</label>
            <input type="datetime-local" value={formData.appointmentTime} readOnly />
          </div>
          <div>
            <label>Phương thức thanh toán:</label>
            <input type="text" value={formData.paymentMethod} readOnly />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ConfirmSchedule;
