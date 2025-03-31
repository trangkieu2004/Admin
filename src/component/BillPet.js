import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Nhập Link từ react-router-dom
import "./BillPet.css";
import Sidebar from "./Sidebar";
import axios from "axios";
import FileDownload from 'js-file-download';

const BillPet = ({ username, onLogout }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [bill, setBill] = useState([]);

  const filteredData = bill.filter((item) => {
    return (
      (item.appointment?.customer &&
        item.appointment.customer.username
          .toLowerCase()
          .includes(searchTerm.toLowerCase())) ||
      (item.appointment?.customerName &&
        item.appointment.customerName
          .toLowerCase()
          .includes(searchTerm.toLowerCase())) ||
      (item.appointment.customerPhone &&
        item.appointment.customerPhone.includes(searchTerm)) || // Giả sử bạn muốn tìm kiếm theo số điện thoại
      (item.appointment?.petName &&
        item.appointment.petName
          .toLowerCase()
          .includes(searchTerm.toLowerCase()))
    );
  });
  const [isScheduleOpen, setIsScheduleOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState("home");
  const navigate = useNavigate();

  console.log(filteredData);

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
        const billResponse = await axios.get("https://pet-booking-eta.vercel.app/invoices", {
          headers,
        });
        if (Array.isArray(billResponse.data?.data)) {
          setBill(billResponse.data.data);
        }
      } catch (error) {
        console.error("❌ Lỗi khi fetch dữ liệu:", error);
      }
    };

    fetchData();
  }, []);

  const toggleSchedule = () => {
    setIsScheduleOpen(!isScheduleOpen);
  };

  const handleMenuClick = (menu) => {
    setActiveMenu(menu);
  };

  const handleLogout = () => {
    onLogout(); // Gọi hàm onLogout từ props
    navigate("/home"); // Điều hướng về trang home
  };

  const handlePrint = async (id) => {
    const token = localStorage.getItem("token");

    const response = await axios.get(
      `https://pet-booking-eta.vercel.app/invoices/${id}/export`, // 📌 Đúng API cập nhật trạng thái
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        responseType: 'arraybuffer'
      }
    );

    if (response) {
      FileDownload(response.data, `${id}.pdf`);
    }
  }

  return (
    <div className="container-fluid dashboard">
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
              <i class="fa-solid fa-circle-user icon-user"></i>Xin chào{" "}
              {username}
            </span>
            <button className="logout" onClick={handleLogout}>
              Log Out
            </button>
          </div>
        </div>
        <div className="bill-detail-container">
          <header>
            <h1>Hóa đơn</h1>
            <div className="search-container">
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>
          </header>
          <div className="bill-detail-table">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Tài khoản</th>
                  <th>Tên đầy đủ</th>
                  <th>SĐT</th>
                  <th>Tên thú cưng</th>
                  <th>Dịch vụ</th>
                  <th>Phương thức thanh toán</th>
                  <th>Giá</th>
                  <th>Trạng thái thanh toán</th>
                  <th>Tùy chọn</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.length > 0 ? (
                  filteredData.map((item, index) => (
                    <tr key={index}>
                      <td>{item._id}</td>
                      <td>{item.appointment?.customer?.username}</td>
                      <td>{item.appointment?.customerName}</td>
                      <td>{item.appointment?.customerPhone}</td>
                      <td>{item.appointment?.petName}</td>
                      <td>{item.appointment?.service?.name}</td>
                      <td>{item.appointment?.paymentMethod}</td>
                      <td>{item.amount}</td>
                      <td>{item.status}</td>
                      <td>
                        <button onClick={() => handlePrint(item._id)}>Print</button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="10">Không tìm thấy kết quả.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BillPet;
