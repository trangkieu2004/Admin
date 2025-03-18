import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Serviceform.css";
import editIcon from "../picture/Edit.png";
import deleteIcon from "../picture/Delete.png";
import Sidebar from "./Sidebar";
import AddService from "./AddService";

const Serviceform = ({ username, onLogout }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [services, setServices] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState("home");
  const [isScheduleOpen, setIsScheduleOpen] = useState(false);
  const navigate = useNavigate();

  const fetchServices = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("https://pet-booking-eta.vercel.app/services", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setServices(response.data.data);
    } catch (error) {
      console.error("Có lỗi xảy ra khi lấy dữ liệu:", error);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleAddService = (addedService) => {
    setServices((prevServices) => [...prevServices, addedService]);
  };

  const toggleSchedule = () => setIsScheduleOpen(!isScheduleOpen);
  const toggleModal = () => setIsModalOpen(!isModalOpen);
  const handleMenuClick = (menu) => setActiveMenu(menu);
  const handleLogout = () => {
    onLogout();
    navigate("/home");
  };

  const filteredData = services.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.description && item.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
      item.price.toString().includes(searchTerm)
  );

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
              <i className="fa-solid fa-circle-user icon-user"></i>Xin chào {username}
            </span>
            <button className="logout" onClick={handleLogout}>
              Log Out
            </button>
          </div>
        </div>
        <div className="service-detail-container">
          <header>
            <h1>Dịch vụ</h1>
            <button onClick={toggleModal} className="add-service">
              + Thêm dịch vụ
            </button>
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
          <div className="service-detail-table">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Tên dịch vụ</th>
                  <th>Thông tin dịch vụ</th>
                  <th>Giá</th>
                  <th>Tùy chọn</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.length > 0 ? (
                  filteredData.map((item, index) => (
                    <tr key={index}>
                      <td>{item._id || index + 1}</td>
                      <td>{item.name}</td>
                      <td>{item.description}</td>
                      <td>{item.price.toLocaleString()}đ</td>
                      <td>
                        <button>
                          <img src={editIcon} alt="Edit" />
                        </button>
                        <button>
                          <img src={deleteIcon} alt="Delete" />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5">Không tìm thấy kết quả.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <AddService onClose={toggleModal} onAddService={handleAddService} />
      )}
    </div>
  );
};

export default Serviceform;
