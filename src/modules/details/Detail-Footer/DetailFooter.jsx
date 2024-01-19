import React from "react";
import { Container } from "react-bootstrap";
import "./detailFooter.scss";
const DetailFooter = () => {
  return (
    <div id="detail-footer">
      <Container>
        <div className="detail-footer-head">
          <img
            src="https://a0.muscache.com/pictures/ec500a26-609d-440f-b5d0-9e5f92afd478.jpg"
            alt=""
            width={"100px"}
          />
          <h2>4,98</h2>
          <img
            src="https://a0.muscache.com/pictures/65bb2a6c-0bdf-42fc-8e1c-38cec04b2fa5.jpg"
            alt=""
            width={"100px"}
          />
        </div>
        <div className="detail-footer-head-text">
          <h3>Được khách yêu thích</h3>
          <p>
            Một trong những ngôi nhà được yêu thích nhất trên Airbnb dựa trên
            điểm xếp hạng, đánh giá và độ tin cậy
          </p>
        </div>
      </Container>
    </div>
  );
};

export default DetailFooter;
