import React from "react";
import "./Footer.css";
import location from "../picture/AdminHome/icon.png";
import phone from "../picture/AdminHome/Phone.png";
import mail from "../picture/AdminHome/Mail.png";
import call from "../picture/AdminHome/call.png";
import facebook from "../picture/AdminHome/facebook.png";
import tiktok from "../picture/AdminHome/tiktok.png";
const Footer = () => {
  return (
    <div className="footer">
      <div className="contact-info">
        <div className="location">
          <img src={location} alt="" />
          <span className="lienhe">Thanh Xuân, Hà Nội</span>
        </div>
        <div className="phone">
          <img src={phone} alt="" />
          <span className="lienhe">1900 23 23</span>
        </div>
        <div className="email">
          <img src={mail} alt="" />
          <span className="lienhe">petstation123@gmail.com</span>
        </div>
      </div>
      <div className="social-media">
        <img src={facebook} alt="" />
        <img src={tiktok} alt="" />
        <img src={call} alt="" />
      </div>
      <hr className="dongke" />
      <div className="note">
        <span>© 2025 PETSTATION</span>
      </div>
    </div>
  );
};

export default Footer;