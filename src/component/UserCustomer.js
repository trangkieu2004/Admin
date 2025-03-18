import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./UserCustomer.css";
import editIcon from "../picture/Edit.png";
import deleteIcon from "../picture/Delete.png";
import Sidebar from "./Sidebar";
import AddCustomer from "./AddCustomer";

const UserCustomer = ({ username, onLogout }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [customerData, setCustomerData] = useState([]);
  const [isScheduleOpen, setIsScheduleOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState("home");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editFormData, setEditFormData] = useState({
    id: "",
    username: "",
    phone: "",
    email: "",
    address: "",
    gender: "Chưa cập nhật",
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("https://pet-booking-eta.vercel.app/user", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) throw new Error("Lỗi khi fetch dữ liệu người dùng");

        const data = await response.json();
        const formattedUsers = data.data.map((user, index) => ({
          id: user._id,
          account: user.username,
          name: user.username,
          phone: user.phone,
          email: user.email,
          address: user.address,
          gender: "Chưa cập nhật",
        }));

        setCustomerData(formattedUsers);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const filteredData = customerData.filter(
    (item) =>
      (item.name || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.phone || "").includes(searchTerm)
  );

  const toggleSchedule = () => {
    setIsScheduleOpen(!isScheduleOpen);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc muốn xóa người dùng này không?")) {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          `https://pet-booking-eta.vercel.app/user/delete/${id}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (response.ok) {
          alert("Xóa người dùng thành công");
          setCustomerData((prevData) =>
            prevData.filter((user) => user.id !== id)
          );
        } else {
          alert("Xóa người dùng thất bại");
        }
      } catch (error) {
        console.error("Lỗi khi xóa người dùng:", error);
      }
    }
  };

  const handleUpdate = async (id, updatedData) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `https://pet-booking-eta.vercel.app/user/update/${id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedData),
        }
      );

      if (response.ok) {
        alert("Cập nhật người dùng thành công");
        setCustomerData((prevData) =>
          prevData.map((user) =>
            user.id === id ? { ...user, ...updatedData } : user
          )
        );
      } else {
        alert("Cập nhật thất bại");
      }
    } catch (error) {
      console.error("Lỗi khi cập nhật người dùng:", error);
    }
  };

  const handleMenuClick = (menu) => {
    setActiveMenu(menu);
  };

  const handleLogout = () => {
    onLogout();
    navigate("/home");
  };

  const handleAddCustomer = (newCustomer) => {
    setCustomerData((prevData) => [
      ...prevData,
      { id: newCustomer._id, ...newCustomer },
    ]);
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const openEditModal = (user) => {
    setEditFormData({
      id: user.id,
      username: user.account,
      phone: user.phone,
      email: user.email,
      address: user.address,
      gender: user.gender,
    });
    setIsEditModalOpen(true);
  };

  const handleEditChange = (e) => {
    setEditFormData({ ...editFormData, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const updatedData = {
      username: editFormData.username,
      phone: editFormData.phone,
      email: editFormData.email,
      address: editFormData.address,
      gender: editFormData.gender,
    };
    await handleUpdate(editFormData.id, updatedData);
    setIsEditModalOpen(false);
  };

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
        <div className="spa-detail-container">
          <header>
            <h1>Khách Hàng</h1>
            <button onClick={toggleModal} className="add-spa">
              + Thêm khách hàng
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
          <div className="spa-detail-table">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Tài Khoản</th>
                  <th>SĐT</th>
                  <th>Email</th>
                  <th>Địa chỉ</th>
                  <th>Tùy chọn</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.length > 0 ? (
                  filteredData.map((item, index) => (
                    <tr key={index}>
                      <td>{item.id}</td>
                      <td>{item.account}</td>
                      <td>{item.phone}</td>
                      <td>{item.email}</td>
                      <td>{item.address}</td>
                      <td>
                        <button onClick={() => openEditModal(item)}>
                          <img src={editIcon} alt="Edit" />
                        </button>
                        <button onClick={() => handleDelete(item.id)}>
                          <img src={deleteIcon} alt="Delete" />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8">Không tìm thấy kết quả.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <AddCustomer onClose={toggleModal} onAddCustomer={handleAddCustomer} />
      )}

      {isEditModalOpen && (
        <div className="add-spa-modal">
          <div className="modal-content">
            <h2>Chỉnh sửa thông tin khách hàng</h2>
            <form onSubmit={handleEditSubmit}>
              <label>Tài khoản:</label>
              <input
                type="text"
                name="username"
                value={editFormData.username}
                onChange={handleEditChange}
              />
              <label>SĐT:</label>
              <input
                type="text"
                name="phone"
                value={editFormData.phone}
                onChange={handleEditChange}
              />
              <label>Email:</label>
              <input
                type="email"
                name="email"
                value={editFormData.email}
                onChange={handleEditChange}
              />
              <label>Địa chỉ:</label>
              <input
                type="text"
                name="address"
                value={editFormData.address}
                onChange={handleEditChange}
              />
              <label>Giới tính:</label>
              <select
                name="gender"
                value={editFormData.gender}
                onChange={handleEditChange}
              >
                <option value="Chưa cập nhật">Chưa cập nhật</option>
                <option value="Nam">Nam</option>
                <option value="Nữ">Nữ</option>
              </select>
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

export default UserCustomer;
