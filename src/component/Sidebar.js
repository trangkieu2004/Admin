import React, { useState, useEffect } from 'react';
import './Sidebar.css';
import { Link, useLocation } from "react-router-dom";
import logo from "../picture/anhnen.png";

const Sidebar = () => {
  const location = useLocation();
  const [isAccountOpen, setAccountOpen] = useState(false); // Trạng thái cho menu tài khoản
  const [isScheduleOpen, setScheduleOpen] = useState(false); // Trạng thái cho menu lịch

  // Theo dõi đường dẫn hiện tại và cập nhật trạng thái menu
  useEffect(() => {
    if (location.pathname.includes("/khach-hang") || location.pathname.includes("/bac-si")) {
      setAccountOpen(true);
    } else {
      setAccountOpen(false);
    }

    if (location.pathname.includes("/lich-spa") || location.pathname.includes("/lich-kham")) {
      setScheduleOpen(true);
    } else {
      setScheduleOpen(false);
    }
  }, [location.pathname]);

  const isActive = (path) => {
    return location.pathname === path;
  };

  const getMenuClass = (path) => `menu-item ${isActive(path) ? "active" : ""}`;

  const toggleAccountMenu = (e) => {
    e.preventDefault();
    setAccountOpen(!isAccountOpen);
    setScheduleOpen(false); // Đóng menu lịch khi mở menu tài khoản
  };

  const toggleScheduleMenu = (e) => {
    e.preventDefault();
    setScheduleOpen(!isScheduleOpen);
    setAccountOpen(false); // Đóng menu tài khoản khi mở menu lịch
  };

  return (
    <div className="sidebar">
      <div className="logo">
        <img src={logo} alt="Logo" />
      </div>
      <nav>
        <Link className={getMenuClass("/account")} to="/account">
          <i className="fas fa-home menu-icon"></i>
          Home
        </Link>
        <div>
          <Link 
            className={getMenuClass("/lich")} 
            onClick={toggleScheduleMenu} 
            to="/lich"
            aria-expanded={isScheduleOpen}
          >
            <i className="fas fa-calendar-alt menu-icon"></i>
            Lịch
          </Link>
          {isScheduleOpen && (
            <div className="sub-menu">
              <Link 
                className={getMenuClass("/lich-spa")} 
                to="/lich-spa"
              >
                <i className="fas fa-spa menu-icon"></i>
                Lịch Spa
              </Link>
              <Link 
                className={getMenuClass("/lich-kham")} 
                to="/lich-kham"
              >
                <i className="fas fa-user-md menu-icon"></i>
                Lịch Khám
              </Link>
            </div>
          )}
        </div>
        <div>
          <Link 
            className={getMenuClass("/tai-khoan")} 
            onClick={toggleAccountMenu} 
            to="/tai-khoan"
            aria-expanded={isAccountOpen}
          >
            <i className="fas fa-user menu-icon"></i>
            Tài khoản
          </Link>
          {isAccountOpen && (
            <div className="sub-menu">
              <Link 
                className={getMenuClass("/khach-hang")} 
                to="/khach-hang"
              >
                <i className="fa-regular fa-square-check menu-icon"></i>
                Khách hàng
              </Link>
              <Link 
                className={getMenuClass("/bac-si")} 
                to="/bac-si"
              >
                <i className="fa-regular fa-square-check menu-icon"></i>
                Bác sĩ
              </Link>
            </div>
          )}
        </div>
        <Link className={getMenuClass("/pets")} to="/pets">
          <i className="fas fa-paw menu-icon"></i>
          Pets
        </Link>
        <Link className={getMenuClass("/service-pets")} to="/service-pets">
          <i className="fas fa-cat menu-icon"></i>
          Dịch vụ
        </Link>
        <Link className={getMenuClass("/bill-pets")} to="/bill-pets">
          <i className="fas fa-file-invoice-dollar menu-icon"></i>
          Hóa đơn
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;