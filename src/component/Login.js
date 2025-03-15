import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css'; // Tạo tệp CSS để định dạng

const Login = ({setUsername}) => {
  const [inputUsername, setInputUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Khởi tạo navigate

  const handleSubmit = (e) => {
    e.preventDefault();
    // Xử lý đăng nhập tại đây
    console.log('Đăng nhập với:', { inputUsername, password });
    setUsername(inputUsername);  // Lưu tên đăng nhập vào state
    navigate('/account'); // Điều hướng tới trang Home (hoặc trang bạn muốn)
  };

  return (
    <div className="login-container">
      <h2>Đăng Nhập</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            id="username"
            value={inputUsername}
            onChange={(e) => setInputUsername(e.target.value)}
            placeholder="Tên đăng nhập"
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Mật khẩu"
            required
          />
        </div>
        <button type="submit" className="login-button">Đăng Nhập</button>
      </form>
      <div className="footer-links">
        <div className="sizecchu">
          Bạn chưa có tài khoản? 
          <br />
          <span 
            onClick={() => navigate('/register')} // Điều hướng đến trang Đăng ký
            className='register-link'
            style={{ cursor: "pointer", color: "black", textDecoration: "underline" }}
          >
            Đăng ký
          </span>
        </div>
        <div className="kieuchu">
        <span 
            onClick={() => navigate('/forgotpasswork')} // Điều hướng đến trang Quên mật khẩu
            style={{ cursor: "pointer", color: "black", textDecoration: "underline" }}
          >
            Quên mật khẩu?
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;