import React from "react";
import "./ConfirmBooking.css"; // Tạo file CSS cho phong cách

const ConfirmSchedule = ({ formData, onClose }) => {
  return (
    <div className="confirm-booking-modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <h2>Cập nhật</h2>
        {/* Thanh điều hướng */}
        <div className="navigation">
          <div className="nav-item completed">
            <div className="circle">1</div>
            <span>Chờ xác nhận</span>
          </div>
          <div className="line"></div>
          <div className="nav-item completed">
            <div className="circle">2</div>
            <span>Đã xác nhận</span>
          </div>
          <div className="line"></div>
          <div className="nav-item completed">
            <div className="circle">3</div>
            <span>Chờ thực hiện</span>
          </div>
          <div className="line"></div>
          <div className="nav-item completed">
            <div className="circle">4</div>
            <span>Đang thực hiện</span>
          </div>
          <div className="line"></div>
          <div className="nav-item current">
            <div className="circle">5</div>
            <span>Hoàn thành</span>
          </div>
        </div>
        <div className="button-group">
          <button type="submit" onClick={onClose}>
            Xác nhận
          </button>
          <button type="button" onClick={onClose}>
            Hủy
          </button>
        </div>
        <div className="form-confirm">
          <form>
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
            <div className="button-group">
              <button type="button" onClick={onClose}>
                Cập nhật
              </button>
              <button type="button" onClick={onClose}>
                Đóng
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ConfirmSchedule;
