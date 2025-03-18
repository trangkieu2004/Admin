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
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editFormData, setEditFormData] = useState({
    id: "",
    name: "",
    description: "",
    price: "",
  });
  const navigate = useNavigate();

  const fetchServices = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "https://pet-booking-eta.vercel.app/services",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
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

  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc muốn xóa dịch vụ này không?")) {
      try {
        const token = localStorage.getItem("token");
        await axios.delete(`https://pet-booking-eta.vercel.app/services/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        alert("Xóa dịch vụ thành công");
        setServices((prevData) => prevData.filter((item) => item._id !== id));
      } catch (error) {
        console.error("Lỗi khi xóa dịch vụ:", error);
        alert("Xóa dịch vụ thất bại");
      }
    }
  };

  const handleUpdate = async (id, updatedData) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `https://pet-booking-eta.vercel.app/services/${id}`,
        updatedData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        alert("Cập nhật dịch vụ thành công");
        setServices((prevData) =>
          prevData.map((item) =>
            item._id === id ? { ...item, ...updatedData } : item
          )
        );
      } else {
        alert("Cập nhật thất bại");
      }
    } catch (error) {
      console.error("Lỗi khi cập nhật dịch vụ:", error);
      alert("Cập nhật thất bại");
    }
  };

  const openEditModal = (item) => {
    setEditFormData({
      id: item._id,
      name: item.name,
      description: item.description,
      price: item.price,
    });
    setIsEditModalOpen(true);
  };

  const handleEditChange = (e) => {
    setEditFormData({ ...editFormData, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const updatedData = {
      name: editFormData.name,
      description: editFormData.description,
      price: Number(editFormData.price),
    };
    await handleUpdate(editFormData.id, updatedData);
    setIsEditModalOpen(false);
  };

  const filteredData = services.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.description &&
        item.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
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
              <i className="fa-solid fa-circle-user icon-user"></i>Xin chào{" "}
              {username}
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
                      <td>{item._id}</td>
                      <td>{item.name}</td>
                      <td>{item.description}</td>
                      <td>{item.price.toLocaleString()}đ</td>
                      <td>
                        <button onClick={() => openEditModal(item)}>
                          <img src={editIcon} alt="Edit" />
                        </button>
                        <button onClick={() => handleDelete(item._id)}>
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
      {isEditModalOpen && (
        <div className="add-spa-modal">
          <div className="modal-content">
            <h2>Chỉnh sửa thông tin dịch vụ</h2>
            <form onSubmit={handleEditSubmit}>
              <label>Tên dịch vụ:</label>
              <input
                type="text"
                name="name"
                value={editFormData.name}
                onChange={handleEditChange}
              />
              <label>Thông tin dịch vụ</label>
              <input
                type="text"
                name="description"
                value={editFormData.description}
                onChange={handleEditChange}
              />
              <label>Giá</label>
              <input
                type="number"
                name="price"
                value={editFormData.price}
                onChange={handleEditChange}
              />
              <div className="button-group" style={{ marginTop: "15px" }}>
                <button type="submit">Lưu</button>
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  style={{ marginLeft: "10px" }}
                >
                  Hủy
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Serviceform;
