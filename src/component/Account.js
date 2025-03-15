import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Nhập Link từ react-router-dom
import "./Account.css";
import editIcon from "../img/Edit.png"; // Thay đổi đường dẫn nếu cần
import deleteIcon from "../img/Delete.png"; // Thay đổi đường dẫn nếu cần
import Sidebar from "./Sidebar";

const Account = ({ username, onLogout }) => {
  const [isScheduleOpen, setIsScheduleOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState("home");
  const navigate = useNavigate();

  const toggleSchedule = () => {
    setIsScheduleOpen(!isScheduleOpen);
  };

  const handleMenuClick = (menu) => {
    setActiveMenu(menu);
  };

  const handleLogout = () => {
    onLogout(); // Gọi hàm onLogout từ props
    navigate('/'); // Điều hướng về trang home
  };

  return (
    <div className="dashboard">
      <Sidebar 
        activeMenu={activeMenu} 
        handleMenuClick={handleMenuClick} 
        isScheduleOpen={isScheduleOpen} 
        toggleSchedule={toggleSchedule} 
      />
      <div className="account-main">
        <div className="header-container">
          <div className="hello-user">
            <span>
            <i class="fa-solid fa-circle-user icon-user"></i>
            Xin chào {username}</span>
            <button className="logout" onClick={handleLogout}>Log Out</button>
          </div>
        </div>
        <div className="main-content">
          <header>
            <h1>Tổng quan</h1>
          </header>
          <div className="grid">
            <div className="top-user">
              <h2>Top User</h2>
              <table>
                <thead>
                  <tr>
                    <th>Tên</th>
                    <th>Email</th>
                    <th>Điểm</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Trang</td>
                    <td>trag@gmail.com</td>
                    <td>10.245.000</td>
                  </tr>
                  <tr>
                    <td>Dieu</td>
                    <td>dieu@gmail.com</td>
                    <td>5.224.000</td>
                  </tr>
                  <tr>
                    <td>Kien</td>
                    <td>kien@gmail.com</td>
                    <td>874.000</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="top-doctors">
              <h2>Top doctors</h2>
              <table>
                <thead>
                  <tr>
                    <th>Tên bác sĩ</th>
                    <th>Hành động</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Dr. Nguyễn Ngọc Mai</td>
                    <td>
                      <button className="view-schedule">Xem lịch</button>
                    </td>
                  </tr>
                  <tr>
                    <td>Dr. Dương Anh Ngọc</td>
                    <td>
                      <button className="view-schedule">Xem lịch</button>
                    </td>
                  </tr>
                  <tr>
                    <td>Dr. Kiều Bạch Anh</td>
                    <td>
                      <button className="view-schedule">Xem lịch</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="schedule">
            <h2>Lịch khám</h2>
            <table>
              <thead>
                <tr>
                  <th>Tên</th>
                  <th>Số điện thoại</th>
                  <th>Thông tin gói</th>
                  <th>Cập nhật</th>
                  <th>Tùy chọn</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Dieu</td>
                  <td>0547652790</td>
                  <td>Gói khám tổng quát</td>
                  <td>Đã khám</td>
                  <td>
                    <button>
                      <img src={editIcon} alt="Edit" />
                    </button>
                    <button>
                      <img src={deleteIcon} alt="Delete" />
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>Trang</td>
                  <td>0547652790</td>
                  <td>Gói khám tổng quát</td>
                  <td>Đã khám</td>
                  <td>
                    <button>
                      <img src={editIcon} alt="Edit" />
                    </button>
                    <button>
                      <img src={deleteIcon} alt="Delete" />
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>Kien</td>
                  <td>0547652790</td>
                  <td>Gói khám tổng quát</td>
                  <td>Đã khám</td>
                  <td>
                    <button>
                      <img src={editIcon} alt="Edit" />
                    </button>
                    <button>
                      <img src={deleteIcon} alt="Delete" />
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Phần Lịch spa */}
          <div className="spa-schedule">
            <h2>Lịch spa</h2>
            <table>
              <thead>
                <tr>
                  <th>Tên khách hàng</th>
                  <th>Số điện thoại</th>
                  <th>Dịch vụ</th>
                  <th>Thời gian</th>
                  <th>Tùy chọn</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Nguyễn Văn A</td>
                  <td>0123456789</td>
                  <td>Massage thư giãn</td>
                  <td>10:00 AM</td>
                  <td>
                    <button>
                      <img src={editIcon} alt="Edit" />
                    </button>
                    <button>
                      <img src={deleteIcon} alt="Delete" />
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>Trần Thị B</td>
                  <td>0987654321</td>
                  <td>Chăm sóc da mặt</td>
                  <td>02:00 PM</td>
                  <td>
                    <button>
                      <img src={editIcon} alt="Edit" />
                    </button>
                    <button>
                      <img src={deleteIcon} alt="Delete" />
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>Phạm Văn C</td>
                  <td>0912345678</td>
                  <td>Ngâm chân thảo dược</td>
                  <td>03:30 PM</td>
                  <td>
                    <button>
                      <img src={editIcon} alt="Edit" />
                    </button>
                    <button>
                      <img src={deleteIcon} alt="Delete" />
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;