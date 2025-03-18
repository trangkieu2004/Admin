import React, { useState } from "react";
import {useNavigate } from "react-router-dom";
import "./PetForm.css";
import editIcon from "../picture/Edit.png";
import deleteIcon from "../picture/Delete.png";
import Sidebar from "./Sidebar";
import AddPet from "./AddPet";


const PetForm = ({ username, onLogout }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [pets, setPets] = useState([
    { id: 1, account: 'Gogo', name: 'Gogo', gender: 'Cái', age: 10, breed: 'Anh tai ngắn', weight: '10 kg', type: 'chó' },
    { id: 2, account: 'Tom', name: 'Tom', gender: 'Đực', age: 2, breed: 'husky', weight: '5 kg', type: 'chó' },
    { id: 3, account: 'Hihi', name: 'hihi', gender: 'Cái', age: 3, breed: 'husky', weight: '3 kg', type: 'chó' },
    { id: 4, account: 'Haha', name: 'Hahaha', gender: 'Cái', age: 4, breed: 'husky', weight: '5 kg', type: 'chó' },
    { id: 5, account: 'LALA', name: 'LALA', gender: 'Cái', age: 3, breed: 'husky', weight: '5 kg', type: 'chó' },
  ]);
  const filteredData = pets.filter((item) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      item.name.toLowerCase().includes(searchLower) ||
      item.account.toLowerCase().includes(searchLower) ||
      item.gender.toLowerCase().includes(searchLower) ||
      item.breed.toLowerCase().includes(searchLower)
    );
  });
  
  const [isScheduleOpen, setIsScheduleOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState("home");
  const [isModalOpen, setIsModalOpen] = useState(false)
  const navigate = useNavigate();
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
  const handleAddPet = (newPet) => {
    const newId = setPets.length ? pets[pets.length - 1].id + 1 : 1; // Tạo ID mới
    setPets((prevData) => [
      ...prevData,
      { id: newId, ...newPet },
    ]);
  };
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
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
            <span><i class="fa-solid fa-circle-user icon-user"></i>Xin chào {username}</span>
            <button className="logout" onClick={handleLogout}>
              Log Out
            </button>
          </div>
        </div>
        <div className="pet-detail-container">
          <header>
            <h1>Thú Cưng</h1>
            <button onClick={toggleModal} className="add-pet">+ Thêm thú cưng</button>
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
          <div className="pet-detail-table">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Tài Khoản</th>
                  <th>Tên thú cưng</th>
                  <th>Giới tính</th>
                  <th>Tuổi</th>
                  <th>Giống loài</th>
                  <th>Cân nặng</th>
                  <th>Loại</th>
                  <th>Tùy chọn</th>
                </tr>
              </thead>
              <tbody>
              {filteredData.length > 0 ? (
            filteredData.map((item, index) => (
              <tr key={index}>
                <td>{item.id}</td>
                <td>{item.account}</td>
                <td>{item.name}</td>
                <td>{item.gender}</td>
                <td>{item.age}</td>
                <td>{item.breed}</td>
                <td>{item.weight}</td>
                <td>{item.type}</td>
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
      {/* Hiển thị AddSpa khi isModalOpen là true */}
      {isModalOpen && <AddPet onClose={toggleModal} onAddPet={handleAddPet}/>}
    </div>
  )
}

export default PetForm
