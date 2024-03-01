import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import { getListRoomAPI } from "../../../apis/roomAPI";
import "./showing.scss";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Col, Row } from "react-bootstrap";
import IronIcon from "@mui/icons-material/Iron";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import SoupKitchenIcon from "@mui/icons-material/SoupKitchen";
import BedIcon from "@mui/icons-material/Bed";
import PoolIcon from "@mui/icons-material/Pool";
import BathroomIcon from "@mui/icons-material/Bathroom";
import AirIcon from '@mui/icons-material/Air';
import LocalLaundryServiceIcon from '@mui/icons-material/LocalLaundryService';
import TvIcon from '@mui/icons-material/Tv';
import { Container } from "@mui/material";
const Showing = () => {
  const navigate = useNavigate();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["list-room"],
    queryFn: getListRoomAPI,
  });
  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    autoplay: true,
    centerPadding: "60px",
    slidesToShow: 3,
    speed: 500,
    autoplaySpeed: 2000,
  };
  console.log(data);
  const handleClick = (id) => {
    navigate(`/room/${id}`);
  };

  if (!isLoading) {
    return (
      <div id="showing">
        <Container maxWidth="lg">
          <h2 className="showing-title">Ở bất kỳ đâu</h2>
          <Row>
            {data.map((item) => {
              return (
                <Col lg={4} md={6} sm={12} style={{ marginBottom: "30px" }}>
                  <Card
                    style={{ minWidth: "20rem", minHeight:"500px" }}
                    onClick={() => {
                      handleClick(item.id);
                    }}
                  >
                    <Card.Img variant="top" src={item.hinhAnh} />
                    <Card.Body>
                      <Card.Title>
                        {item.tenPhong.substring(0, 30) + "..."}
                      </Card.Title>
                      <Card.Title className="convice">
                        {item.banLa?
                        <div className="convice-item">
                          <IronIcon fontSize="small" color="disabled" />
                        </div>:
                        ""}
                        {item.doXe?
                        <div className="convice-item">
                          <DirectionsCarIcon
                            fontSize="small"
                            color="disabled"
                          />
                        </div>:
                        ""}
                       {item.bep? 
                       <div className="convice-item">
                          <SoupKitchenIcon fontSize="small" color="disabled" />
                        </div>
                        :""}
                        {item.dieuHoa?
                        <div className="convice-item">
                          <AirIcon fontSize="small" color="disabled" />
                        </div>:""}
                        {item.hoBoi?
                        <div className="convice-item">
                          <PoolIcon fontSize="small" color="disabled" />
                        </div>:""}
                       {item.mayGiat?
                        <div className="convice-item">
                          <LocalLaundryServiceIcon fontSize="small" color="disabled" />
                        </div>:""}
                        {item.tv?
                        <div className="convice-item">
                          <TvIcon fontSize="small" color="disabled" />
                        </div>:""}
                      </Card.Title>
                      <Card.Text className="mota">
                        {item.moTa.substring(0, 40) + "..."}
                      </Card.Text>
                      <Card.Text className="price">
                        {item.giaTien}.00$ / Đêm
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })}
          </Row>
        </Container>
      </div>
    );
  }
};

export default Showing;
