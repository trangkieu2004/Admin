import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Doctor.css";
import editIcon from "../picture/Edit.png";
import deleteIcon from "../picture/Delete.png";
import Sidebar from "./Sidebar";
import AddDoctor from "./AddDoctor";

const Doctor = ({ username, onLogout }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [doctorData, setDoctorData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editFormData, setEditFormData] = useState({
    id: "",
    name: "",
    phone: "",
    email: "",
    address: "",
    gender: "",
    specialization: "",
    qualification: "",
  });
  const [isScheduleOpen, setIsScheduleOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState("home");
  const navigate = useNavigate();

  const fetchDoctors = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("https://pet-booking-eta.vercel.app/vet-doctors", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const result = await response.json();
        setDoctorData(result.data || []);
      } else {
        console.error("Lấy dữ liệu bác sĩ thất bại");
      }
    } catch (error) {
      console.error("Lỗi khi gọi API:", error);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  const handleDeleteDoctor = async (id) => {
    const confirmDelete = window.confirm("Bạn có chắc chắn muốn xóa bác sĩ này không?");
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`https://pet-booking-eta.vercel.app/vet-doctors/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        alert("Xóa bác sĩ thành công!");
        fetchDoctors();
      } else {
        alert("Xóa bác sĩ thất bại.");
      }
    } catch (error) {
      console.error("Lỗi khi xóa bác sĩ:", error);
    }
  };

  const openEditModal = (doctor) => {
    setEditFormData({
      id: doctor._id,
      name: doctor.name,
      phone: doctor.phone,
      email: doctor.email,
      address: doctor.address,
      gender: doctor.gender,
      specialization: doctor.specialization,
      qualification: doctor.qualification,
    });
    setIsEditModalOpen(true);
  };

  const handleEditChange = (e) => {
    setEditFormData({ ...editFormData, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `https://pet-booking-eta.vercel.app/vet-doctors/${editFormData.id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: editFormData.name,
            phone: editFormData.phone,
            email: editFormData.email,
            address: editFormData.address,
            gender: editFormData.gender,
            specialization: editFormData.specialization,
            qualification: editFormData.qualification,
          }),
        }
      );
      if (response.ok) {
        alert("Cập nhật bác sĩ thành công");
        setIsEditModalOpen(false);
        fetchDoctors();
      } else {
        alert("Cập nhật thất bại");
      }
    } catch (error) {
      console.error("Lỗi khi cập nhật bác sĩ:", error);
      alert("Cập nhật thất bại");
    }
  };

  const filteredData = doctorData.filter(
    (item) =>
      (item.name || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.phone || "").includes(searchTerm)
  );

  const toggleSchedule = () => setIsScheduleOpen(!isScheduleOpen);
  const handleMenuClick = (menu) => setActiveMenu(menu);

  const handleLogout = () => {
    onLogout();
    navigate("/");
  };

  const handleAddDoctor = () => {
    fetchDoctors(); // sau khi thêm xong thì fetch lại danh sách
  };

  const toggleModal = () => setIsModalOpen(!isModalOpen);

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
            <h1>Bác Sỹ</h1>
            <button onClick={toggleModal} className="add-spa">
              + Thêm tài khoản
            </button>
            <div className="search-container">
              <input
                type="text"
                placeholder="Tìm kiếm..."
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
                  <th>Tên đầy đủ</th>
                  <th>SĐT</th>
                  <th>Email</th>
                  <th>Địa chỉ</th>
                  <th>Giới tính</th>
                  <th>Chuyên khoa</th>
                  <th>Bằng cấp</th>
                  <th>Tùy chọn</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.length > 0 ? (
                  filteredData.map((item, index) => (
                    <tr key={index}>
                      <td>{item._id || index + 1}</td>
                      <td>{item.name}</td>
                      <td>{item.phone}</td>
                      <td>{item.email}</td>
                      <td>{item.address}</td>
                      <td>{item.gender}</td>
                      <td>{item.specialization}</td>
                      <td>{item.qualification}</td>
                      <td>
                        <button onClick={() => openEditModal(item)}>
                          <img src={editIcon} alt="Edit" />
                        </button>
                        <button onClick={() => handleDeleteDoctor(item._id)}>
                          <img src={deleteIcon} alt="Delete" />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="9">Không tìm thấy kết quả.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {isModalOpen && <AddDoctor onClose={toggleModal} onAddDoctor={handleAddDoctor} />}

      {isEditModalOpen && (
        <div className="add-spa-modal">
          <div className="modal-content">
            <h2>Chỉnh sửa thông tin bác sĩ</h2>
            <form onSubmit={handleEditSubmit}>
              <label>Tên đầy đủ</label>
              <input name="name" value={editFormData.name} onChange={handleEditChange} />
              <label>SĐT</label>
              <input name="phone" value={editFormData.phone} onChange={handleEditChange} />
              <label>Email</label>
              <input name="email" value={editFormData.email} onChange={handleEditChange} />
              <label>Địa chỉ</label>
              <input name="address" value={editFormData.address} onChange={handleEditChange} />
              <label>Giới tính</label>
              <input name="gender" value={editFormData.gender} onChange={handleEditChange} />
              <label>Chuyên khoa</label>
              <input name="specialization" value={editFormData.specialization} onChange={handleEditChange} />
              <label>Bằng cấp</label>
              <input name="qualification" value={editFormData.qualification} onChange={handleEditChange} />
              <div className="button-group">
                <button type="submit">Lưu</button>
                <button type="button" onClick={() => setIsEditModalOpen(false)}>Hủy</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Doctor;
