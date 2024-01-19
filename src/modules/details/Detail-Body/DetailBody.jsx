import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import StarIcon from "@mui/icons-material/Star";
import "./detailBody.scss";
import HolidayVillageIcon from "@mui/icons-material/HolidayVillage";
import ShowerIcon from "@mui/icons-material/Shower";
import WifiIcon from "@mui/icons-material/Wifi";
import HotelIcon from "@mui/icons-material/Hotel";
import IronIcon from "@mui/icons-material/Iron";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import SoupKitchenIcon from "@mui/icons-material/SoupKitchen";
import BedIcon from "@mui/icons-material/Bed";
import PoolIcon from "@mui/icons-material/Pool";
import BathroomIcon from "@mui/icons-material/Bathroom";
import ConnectedTvIcon from "@mui/icons-material/ConnectedTv";
import LocalLaundryServiceIcon from "@mui/icons-material/LocalLaundryService";
import { DatePicker } from "@mui/lab";
import dayjs from "dayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers";
import {
  Alert,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { set } from "date-fns";
import { useMutation } from "@tanstack/react-query";
import { orderRoomApi } from "../../../apis/roomAPI";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
const DetailBody = ({ data, room }) => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("CURRENT_USER"));
  const [ngayDi, setNgayDi] = useState(dayjs(Date.now()));
  const [ngayVe, setNgayVe] = useState(dayjs(Date.now()));
  const [soNguoi, setSoNguoi] = useState("");
  const [err, setErr] = useState(null);
  const { mutate: handLeOrderRoom } = useMutation({
    mutationFn: (value) => orderRoomApi(value),
    onSuccess: () => {
      Swal.fire({
        icon: "success",
        title: "Đặt phòng thành công",
        showConfirmButton: true,
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/profile");
        }
      });
    },
  });
  const handleOrder = () => {
    if (ngayVe - ngayDi <= 0) {
      setErr("Ngày đặt không hợp lệ");
      return;
    } else if (soNguoi == "") {
      setErr("Vui lòng chọn số người");
      return;
    }
    setErr(null);
    let content = {
      id: 0,
      soLuongKhach: soNguoi,
      maPhong: room,
      ngayDen: ngayDi.$d,
      ngayDi: ngayVe.$d,
      maNguoiDung: user.user.id,
    };
    handLeOrderRoom(content);
  };

  return (
    <div className="detailBody">
      <Container>
        <Row className="justify-space-between">
          <Col md={12} lg={6} xl={7}>
            <div className="detail-left">
              <div className="detailBody-yeuThich">
                <p className="detailBody-text">
                  Khách đánh giá đây là một trong những ngôi nhà được yêu thích
                  nhất trên Airbnb
                </p>
                <div className="detail-star">
                  <p>4,98</p>
                  <div className="detail-star-icon">
                    <StarIcon sx={{ fontSize: 17 }} />
                    <StarIcon sx={{ fontSize: 17 }} />
                    <StarIcon sx={{ fontSize: 17 }} />
                    <StarIcon sx={{ fontSize: 17 }} />
                    <StarIcon sx={{ fontSize: 17 }} />
                  </div>
                </div>
                <div className="detail-comment">
                  <p>41</p>
                  <a href="#">Đánh giá</a>
                </div>
              </div>
              <div className="detailBody-con">
                <div className="detailBody-con-item">
                  <div className="detailBody-con-icon">
                    <HolidayVillageIcon sx={{ fontSize: 30 }} />
                  </div>
                  <div className="detailBody-con-text">
                    <div className="detailBody-con-text1">
                      <p>Phòng trong căn hộ cho thuê</p>
                    </div>
                    <div className="detailBody-con-text2">
                      <p>
                        Bạn sẽ có phòng riêng trong một ngôi nhà và được sử dụng
                        những khu vực chung.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="detailBody-con-item">
                  <div className="detailBody-con-icon">
                    <ShowerIcon sx={{ fontSize: 30 }} />
                  </div>
                  <div className="detailBody-con-text">
                    <div className="detailBody-con-text1">
                      <p>Phòng vệ sinh chung</p>
                    </div>
                    <div className="detailBody-con-text2">
                      <p>
                        Bạn sẽ dùng chung phòng vệ sinh với những người khác.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="detailBody-con-item">
                  <div className="detailBody-con-icon">
                    <WifiIcon sx={{ fontSize: 30 }} />
                  </div>
                  <div className="detailBody-con-text">
                    <div className="detailBody-con-text1">
                      <p>Rất thích hợp để làm việc từ xa</p>
                    </div>
                    <div className="detailBody-con-text2">
                      <p>
                        Wi-fi tốc độ cao (64 Mbps) và không gian riêng để làm
                        việc.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="detailBody-moTA">
                <h3>Giới thiệu về chỗ ở này</h3>
                <p>{data.moTa}</p>
              </div>

              <div className="detailBody-tienIch">
                <h3>Nơi này có những gì cho bạn</h3>
                <div className="detailBody-tienIch-container">
                  {data.banLa ? (
                    <div className="detailBody-tienIch-item">
                      <div className="detailBody-tienIch-icon">
                        <IronIcon />
                      </div>
                      <div className="detailBody-tienIch-text">
                        Máy sấy phí Miễn phí – Trong căn hộ
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                  {data.bep ? (
                    <div className="detailBody-tienIch-item">
                      <div className="detailBody-tienIch-icon">
                        <SoupKitchenIcon />
                      </div>
                      <div className="detailBody-tienIch-text">
                        Nơi này có bếp
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                  {data.doXe ? (
                    <div className="detailBody-tienIch-item">
                      <div className="detailBody-tienIch-icon">
                        <DirectionsCarIcon />
                      </div>
                      <div className="detailBody-tienIch-text">
                        Nơi này có bãi đỗ xe
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                  {data.hoBoi ? (
                    <div className="detailBody-tienIch-item">
                      <div className="detailBody-tienIch-icon">
                        <PoolIcon />
                      </div>
                      <div className="detailBody-tienIch-text">
                        Nơi này có hồ bơi
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                  <div className="detailBody-tienIch-item">
                    <div className="detailBody-tienIch-icon">
                      <HotelIcon />
                    </div>
                    <div className="detailBody-tienIch-text">
                      Nơi này có {data.giuong} giường
                    </div>
                  </div>
                  <div className="detailBody-tienIch-item">
                    <div className="detailBody-tienIch-icon">
                      <ShowerIcon />
                    </div>
                    <div className="detailBody-tienIch-text">
                      Nơi này có {data.phongTam} phòng tắm
                    </div>
                  </div>
                  {data.wifi ? (
                    <div className="detailBody-tienIch-item">
                      <div className="detailBody-tienIch-icon">
                        <WifiIcon />
                      </div>
                      <div className="detailBody-tienIch-text">
                        Wi-fi nhanh – 64 Mbps
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                  {data.tivi ? (
                    <div className="detailBody-tienIch-item">
                      <div className="detailBody-tienIch-icon">
                        <ConnectedTvIcon />
                      </div>
                      <div className="detailBody-tienIch-text">
                        40" HDTV với Netflix, Disney+
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                  {data.mayGiat ? (
                    <div className="detailBody-tienIch-item">
                      <div className="detailBody-tienIch-icon">
                        <LocalLaundryServiceIcon />
                      </div>
                      <div className="detailBody-tienIch-text">
                        Máy giặt phí Miễn phí – Trong căn hộ
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
          </Col>
          <Col>
            <div id="order">
              <div className="order-head">
                <p>
                  {data.giaTien} $ <small> / đêm</small>
                </p>
              </div>
              <div className="order-body">
                <DesktopDatePicker
                  label="Ngày đến"
                  value={ngayDi}
                  views={["year", "month", "day"]}
                  onChange={(newValue) => setNgayDi(newValue)}
                  sx={{ width: "50%" }}
                />
                <DesktopDatePicker
                  label="Ngày về"
                  value={ngayVe}
                  onChange={(newValue) => setNgayVe(newValue)}
                  sx={{ width: "50%" }}
                />
              </div>
              <div className="order-body2">
                <FormControl variant="standard" sx={{ m: 1, width: "100%" }}>
                  <InputLabel id="demo-simple-select-standard-label">
                    Số người
                  </InputLabel>
                  <Select
                    className="select_order"
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    label="Age"
                    onChange={(e) => setSoNguoi(e.target.value)}
                    value={soNguoi}
                    sx={{ width: "100%" }}
                  >
                    {[...Array(data.khach)].map((item, index) => {
                      return (
                        <MenuItem value={index + 1}>{index + 1} người</MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </div>
              <div className="btndatPhong">
                <Button onClick={handleOrder} variant="contained">
                  Đặt phòng
                </Button>
              </div>
              {err ? <Alert severity="error">{err}</Alert> : ""}
              <div className="order-body3">
                <small>
                  Chỗ ở này cho phép tối đa {data.khach} khách, không tính em
                  bé. Nếu bạn mang theo nhiều hơn 2 thú cưng, vui lòng báo cho
                  Chủ nhà biết.
                </small>
              </div>
              <div className="order-bot">
                <p>Tổng tiền</p>
                <p>{data.giaTien} $</p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default DetailBody;
