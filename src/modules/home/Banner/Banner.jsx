import React from "react";
import Carousel from "react-bootstrap/Carousel";
import video from "../../../assets/Amanwana - Luxury Resort & Hotel in Indonesia - Aman.mp4";
import "./banner.scss";
import { Button } from "@mui/material";
const Banner = () => {
  return (
    <div id="banner">
      <video
        style={{ width: "100%", height: "80vh", objectFit: "cover" }}
        src={video}
        autoPlay
        loop
        muted
      ></video>
      <div className="banner-text">
        <h1>Welcome to AirBnB</h1>
        <p>Bao gồm những thành phố lớn với dịch vụ và phong cảnh tuyệt nhất</p>
        <Button variant="contained">Khám phá ngay</Button>
      </div>
    </div>
  );
};

export default Banner;
