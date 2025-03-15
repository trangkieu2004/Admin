import React from "react";
import "./Home.css";
import like from "../picture/AdminHome/Facebook Like.png";
import star from "../picture/AdminHome/5 Star Hotel.png";
import pet1 from "../picture/AdminHome/pet1.png";
import pet2 from "../picture/AdminHome/pet2.png";
import pet3 from "../picture/AdminHome/pet3.png";
import pet4 from "../picture/AdminHome/pet4.png";
import chanmeo from "../picture/AdminHome/chan_meo.png";
import kham_meo from "../picture/AdminHome/kham_meo.png";
import doctor1 from "../picture/AdminHome/dortor1.png";
import doctor2 from "../picture/AdminHome/dortor2.png";
import cat1 from "../picture/AdminHome/Cat1.png";
import cat2 from "../picture/AdminHome/Cat2.png";
import cat3 from "../picture/AdminHome/Cat3.png";

const CommentDetail = () => {
  const feedbacks = [
    {
      name: "Nguyễn Anh Thư",
      comment:
        "“Dịch vụ cắt tỉa lông tại đây thật tuyệt vời! Thú cưng của tôi luôn được chăm sóc tỉ mỉ và ra ngoài trông thật đáng yêu. Tôi rất hài lòng với sự chuyên nghiệp và tận tâm của đội ngũ nhân viên.”",
      imageUrl: cat1,
    },
    {
      name: "Trần Ngọc Anh",
      comment:
        "“Tôi rất ấn tượng với dịch vụ vệ sinh tai của các bạn. Quá trình diễn ra rất nhẹ nhàng và hiệu quả, khiến cho chú chó của tôi cảm thấy thoải mái hơn hẳn. Đây là nơi tôi tin tưởng nhất khi cần chăm sóc thú cưng của mình.”",
      imageUrl: cat2,
    },
    {
      name: "Phạm Hương",
      comment:
        "“Dịch vụ massage thú cưng ở đây là một trải nghiệm tuyệt vời! Mèo của tôi đã thư giãn hoàn toàn và rất thích thú sau mỗi buổi massage. Tôi cảm nhận rõ sự khác biệt trong sức khỏe và tâm trạng của nó.”",
      imageUrl: cat3,
    },
  ];

  return (
    <div className="container-fluid">
      <div className="row pt-4">
        <div className="col-md-6">
          <h2 className="text fw-bold">PETSTATION SPA</h2>
          <p className="title-p">
            PetStation Spa là một điểm đến lý tưởng dành cho các thú cưng, nơi
            mang đến dịch vụ chăm sóc và làm đẹp chuyên nghiệp, giúp thú cưng
            của bạn luôn cảm thấy thoải mái và tươi mới. Tại PetCare Spa, chúng
            tôi cam kết cung cấp một môi trường thư giãn và chăm sóc tận tâm,
            với đội ngũ nhân viên giàu kinh nghiệm và tình yêu thương đối với
            thú cưng.
          </p>
          <div className="text-center">
            <button className="btn text-white fw-bold open">
              XEM CHI TIẾT
            </button>
          </div>
          <div className="mt-3 d-flex justify-content-around">
            <div className="me-3 center">
              <img src={like} alt="" />
              <h3 className="mb-0">99%</h3>
              <p className="mb-0 danhgia">Khách hàng hài lòng</p>
            </div>
            <div className="center">
              <img src={star} alt="" />
              <h3 className="mb-0">4.9 Sao</h3>
              <p className="mb-0 danhgia">Lượt đánh giá</p>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="row g-2">
            <div className="col-6">
              <img src={pet1} className="img-fluid rounded" alt="Dog 1" />
            </div>
            <div className="col-6">
              <img src={pet2} className="img-fluid rounded" alt="Dog 2" />
            </div>
            <div className="col-6">
              <img src={pet3} className="img-fluid rounded" alt="Dog 3" />
            </div>
            <div className="col-6">
              <img src={pet4} className="img-fluid rounded" alt="Dog 4" />
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid-body">
        <div className="container">
          <h1>CÁC DỊCH VỤ TẠI PETSTATION</h1>
          <div className="divider-container">
            <div className="line"></div>
            <img src={chanmeo} alt="Paw Icon" className="paw-icon" />
            <div className="line"></div>
          </div>
          <div className="row mt-4">
            <div className="col-md-4">
              <div
                className="card shadow p-3 border-light rounded"
                style={{ minHeight: "400px" }}
              >
                <img
                  src={kham_meo}
                  className="card-img-top rounded"
                  alt="Khám và tư vấn"
                />
                <div className="card-body">
                  <h5 className="fw-bold">Khám và tư vấn, điều trị bệnh</h5>
                  <p className="textsize">
                    Đội ngũ bác sĩ chuyên môn cao trực tiếp thăm khám, điều trị
                    bệnh cho các bé.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div
                className="card shadow p-3 border-light rounded"
                style={{ minHeight: "400px" }}
              >
                <img
                  src={kham_meo}
                  className="card-img-top rounded"
                  alt="Tắm sấy, spa"
                />
                <div className="card-body">
                  <h5 className="fw-bold">Tắm sấy, Spa và cắt tỉa</h5>
                  <p className="textsize">
                    Đội ngũ nhân viên, kỹ thuật viên chuyên nghiệp, chúng tôi sử
                    dụng kỹ thuật và các thiết bị hiện đại.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div
                className="card shadow p-3 border-light rounded"
                style={{ minHeight: "400px" }}
              >
                <img
                  src={kham_meo}
                  className="card-img-top rounded"
                  alt="Dịch vụ khác"
                />
                <div className="card-body">
                  <h5 className="fw-bold">Dịch vụ khác</h5>
                  <p className="textsize">
                    Chúng tôi cung cấp rất nhiều dịch vụ chăm sóc thú cưng như:
                    cắt mài móng, tạo kiểu,...
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container bg-body">
        <h1 className="tieude">ĐỘI NGŨ CHUYÊN GIA & BÁC SĨ</h1>
        <div class="linemax"></div>
        <div className="row">
          <div className="col-md-4">
            <div className="card">
              <img
                src={doctor2}
                className="card-img-top anh"
                alt="Dr. Nguyen Ngoc Mai"
              />
              <div className="card-body">
                <h5 className="card-title">Dr. Nguyễn Ngọc Mai</h5>
                <p className="card-text textsize">
                  X-Quang và Siêu âm / Y khoa và nội khoa
                  <br />
                  Hoàng Mai - Hà Nội
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card">
              <img
                src={doctor1}
                className="card-img-top anh"
                alt="Dr. Duong Anh Ngoc"
              />
              <div className="card-body">
                <h5 className="card-title">Dr. Dương Anh Ngọc</h5>
                <p className="card-text textsize">
                  X-Quang và Siêu âm / Y khoa và nội khoa
                  <br />
                  Hoàng Mai - Hà Nội
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card">
              <img
                src={doctor2}
                className="card-img-top anh"
                alt="Dr. Duong Anh Ngoc"
              />
              <div className="card-body">
                <h5 className="card-title">Dr. Dương Anh Ngọc</h5>
                <p className="card-text textsize">
                  X-Quang và Siêu âm / Y khoa và nội khoa
                  <br />
                  Hoàng Mai - Hà Nội
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="row mt-4">
          <div className="col-md-12 text-center">
            <button className="btn nut">XEM THÊM</button>
          </div>
        </div>
      </div>
      <div className="mt-5 feedback">
        <div className="container">
          <h2 className="mb-4 tieude fw-bold">
            PHẢN HỒI TỪ KHÁCH HÀNG
          </h2>
          <div className="row justify-content-center">
            {feedbacks.map((feedback, index) => (
              <div key={index} className="col-md-4 mb-4">
                <div
                  className={`card text-start p-4 d-flex flex-column ${
                    index === 1 ? "offset-card" : ""
                  }`}
                  style={{ height: "100%" }}
                >
                  <div className="d-flex justify-content-center mb-3">
                    <img
                      src={feedback.imageUrl}
                      alt={feedback.name}
                      className="rounded-circle"
                      style={{ width: "80px", height: "80px" }}
                    />
                  </div>
                  <p className="text-p" style={{ textAlign: "left" }}>{feedback.comment}</p>
                  <h5 className="card-text">{feedback.name}</h5>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentDetail;