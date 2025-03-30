import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AdminLogin.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdminLogin = () => {
  const [inputUsername, setInputUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    toast.dismiss();

    try {
      const response = await axios.post('https://pet-booking-eta.vercel.app/user/login', {
        username: inputUsername,
        password,
      });
      console.log("Response từ API:", response.data);  // Thêm dòng này
      const user = response.data.data.user;

      // Kiểm tra role admin
      if (user.role !== 'ADMIN') {
        toast.error('Bạn không có quyền truy cập admin.');
        return;
      }

      // Lưu token vào localStorage
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', response.data.data.token);

      toast.success("Đăng nhập admin thành công!");
      navigate('/dashboard');

    } catch (error) {
      console.log("Lỗi nhận được từ API:", error.response?.data);
    
      let errorMessage = "Có lỗi xảy ra, vui lòng thử lại!";
    
      if (Array.isArray(error.response?.data?.response?.message)) {
        // Nếu `message` là mảng, nối tất cả lỗi lại
        errorMessage = error.response.data.response.message.join(", ");
      } else if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      }
    
      toast.error(errorMessage); // Hiển thị lỗi từ API hoặc lỗi mặc định
    }
    
  };

  return (
    <div className="admin-login-container">
      <h2>Admin Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Tên đăng nhập"
            value={inputUsername}
            onChange={(e) => setInputUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Mật khẩu"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="login-button">Đăng Nhập</button>
      </form>
      
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} />
    </div>
  );
};

export default AdminLogin;
