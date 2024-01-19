import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import { getListRoomAPI } from "../../../apis/roomAPI";
import "./showing.scss";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Col, Container, Row } from "react-bootstrap";
import IronIcon from "@mui/icons-material/Iron";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import SoupKitchenIcon from "@mui/icons-material/SoupKitchen";
import BedIcon from "@mui/icons-material/Bed";
import PoolIcon from "@mui/icons-material/Pool";
import BathroomIcon from "@mui/icons-material/Bathroom";
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
        <Container>
          <h2 className="showing-title">Ở bất kỳ đâu</h2>
          <Row>
            {data.map((item) => {
              return (
                <Col lg={4} md={6} sm={12} style={{ marginBottom: "30px" }}>
                  <Card
                    style={{ minWidth: "20rem" }}
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
                        <div className="convice-item">
                          <IronIcon fontSize="small" color="disabled" />
                        </div>
                        <div className="convice-item">
                          <DirectionsCarIcon
                            fontSize="small"
                            color="disabled"
                          />
                        </div>
                        <div className="convice-item">
                          <SoupKitchenIcon fontSize="small" color="disabled" />
                        </div>
                        <div className="convice-item">
                          <BedIcon fontSize="small" color="disabled" />
                        </div>
                        <div className="convice-item">
                          <PoolIcon fontSize="small" color="disabled" />
                        </div>
                        <div className="convice-item">
                          <BathroomIcon fontSize="small" color="disabled" />
                        </div>
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
