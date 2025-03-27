import React, { useState } from "react";
import "./ConfirmSchedule.css";

const ConfirmSchedule = ({ formData, onClose }) => {
  const [currentStep, setCurrentStep] = useState(1);

  const handleConfirm = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleCancelStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleUpdate = () => {
    // Thực hiện lưu dữ liệu ngay lập tức (gọi API hoặc thông báo)
    alert("Thông tin đã được cập nhật thành công!");
  };

  return (
    <div className="confirm-booking-modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <h2>Tiến trình xác nhận</h2>

        <div className="navigation">
          {[...Array(5)].map((_, index) => (
            <React.Fragment key={index}>
              <div
                className={`nav-item 
          ${index + 1 < currentStep ? "completed" : ""} 
          ${index + 1 === currentStep ? "current" : ""}`}
              >
                <div className="circle">{index + 1}</div>
                <span>
                  {index === 0
                    ? "Chờ xác nhận"
                    : index === 1
                    ? "Đã xác nhận"
                    : index === 2
                    ? "Chờ thực hiện"
                    : index === 3
                    ? "Đang thực hiện"
                    : "Hoàn thành"}
                </span>
              </div>
              {index < 4 && <div className="line"></div>}
            </React.Fragment>
          ))}
        </div>
        {/* Đặt nút ngay dưới thanh điều hướng */}
        <div className="button-group under-navigation">
          <button type="button" onClick={handleConfirm} className="btn-orange">
            Xác nhận
          </button>
          <button type="button" onClick={handleCancelStep}>
            Hủy
          </button>
        </div>
        <form className="form-confirm">
          <div>
            <label>Tên:</label>
            <input type="text" value={formData.name} readOnly />
          </div>
          <div>
            <label>Số điện thoại:</label>
            <input type="text" value={formData.phone} readOnly />
          </div>
          <div>
            <label>Bác sỹ:</label>
            <input type="text" value={formData.doctor} readOnly />
          </div>
          <div>
            <label>Ngày:</label>
            <input type="date" value={formData.day} readOnly />
          </div>
          <div>
            <label>Giờ:</label>
            <input type="time" value={formData.time} readOnly />
          </div>
          <div>
            <label>Phương thức thanh toán:</label>
            <input type="text" value={formData.pay} readOnly />
          </div>
          <div>
            <label>Giá:</label>
            <input type="number" value={formData.price} readOnly />
          </div>
          <div>
            <label>Tài khoản:</label>
            <input type="text" value={formData.account} readOnly />
          </div>
        </form>

        <div className="button-group">
          <button type="button" onClick={handleUpdate}>
            Cập nhật
          </button>
          <button type="button" onClick={onClose}>
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmSchedule;
