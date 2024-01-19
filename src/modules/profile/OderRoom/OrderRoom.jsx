import {
  Button,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import dayjs from "dayjs";
import "./orderRoom.scss";
import React, { useState } from "react";
import { array } from "yup";
import Modal from "react-bootstrap/Modal";
import { DesktopDatePicker } from "@mui/x-date-pickers";
import Swal from "sweetalert2";

const OrderRoom = ({ room, listRoom, updateRoom, deleteRoom }) => {
  const user = JSON.parse(localStorage.getItem("CURRENT_USER"));
  const [show, setShow] = useState(false);
  const [soNguoi, setSoNguoi] = useState(0);
  const [ngayDi, setNgayDi] = useState(dayjs(Date.now()));
  const [ngayVe, setNgayVe] = useState(dayjs(Date.now()));
  const [num, setNum] = useState(1);
  const [maPhong, setMaPhong] = useState(0);
  const [idPhong, setIdPhong] = useState(0);

  const handleClose = () => setShow(false);
  const handleShow = (nguoi, ngayden, ngayve, khach, maphong, id) => {
    setNum(khach);
    setNgayDi(dayjs(ngayden));
    setNgayVe(dayjs(ngayve));
    setSoNguoi(nguoi);
    setShow(true);
    setMaPhong(maphong);
    setIdPhong(id);
  };
  let list = room.map((item) => {
    const find = listRoom.find((ele) => ele.id == item.maPhong);

    return {
      ...item,
      room: find,
    };
  });

  const handleUpdate = () => {
    let content = {
      id: idPhong,
      ngayDen: ngayDi.$d,
      ngayDi: ngayVe.$d,
      soLuongKhach: parseInt(num),
      maNguoiDung: user.user.id,
      maPhong,
    };

    updateRoom(content);
    handleClose();
  };
  const handleDelete = (id) => {
    Swal.fire({
      title: "Bạn có chắc?",
      text: "Nếu hủy phòng bạn sẽ bị trừ điểm",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Hủy phòng!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteRoom(id);
      }
    });
  };

  return (
    <div id="orderRoom">
      <h2 id="orderRoom-title">Lịch sử đặt phòng</h2>
      <div className="history">
        <Stack>
          {list.map((item) => {
            return (
              <div key={item.id} className="history-item">
                <div className="history-img">
                  <img src={item.room.hinhAnh} alt="" />
                </div>
                <div className="history-des">
                  <h3>{item.room.tenPhong}</h3>
                  <div className="history-des-item">
                    <p>Ngày đến: {dayjs(item.ngayDen).format("DD-MM-YYYY")}</p>
                    <p>Ngày về: {dayjs(item.ngayDi).format("DD-MM-YYYY")}</p>
                    <p>
                      {item.soLuongKhach} khách - {item.room.phongNgu} phòng ngủ
                      - {item.room.phongTam} phòng tắm
                    </p>
                    <p>
                      {item.room.banLa ? "Bàn là -" : ""}{" "}
                      {item.room.bep ? "bếp -" : ""}{" "}
                      {item.room.dieuHoa ? "Điều hòa -" : ""}{" "}
                      {item.room.doXe ? "bãi đỗ xe -" : ""}
                      {item.room.hoBoi ? "hồ bơi -" : ""}
                      {item.room.matGiat ? "máy giặt -" : ""}{" "}
                      {item.room.tivi ? "tivi" : ""}
                    </p>
                    <div className="history-price">
                      {item.room.giaTien}$ / đêm
                    </div>
                    <div className="history-edit">
                      <Button
                        variant="outlined"
                        onClick={() =>
                          handleShow(
                            item.room.khach,
                            item.ngayDen,
                            item.ngayDi,
                            item.soLuongKhach,
                            item.maPhong,
                            item.id
                          )
                        }
                        style={{ color: "black", border: "1px solid black" }}
                      >
                        Cập nhật thông tin
                      </Button>
                      <Button
                        onClick={() => handleDelete(item.id)}
                        variant="outlined"
                        style={{ color: "black", border: "1px solid black" }}
                      >
                        Hủy đặt phòng
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </Stack>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Cập nhật thông tin đặt phòng</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Stack>
            <Stack spacing={2}>
              <DesktopDatePicker
                sx={{ zIndex: "99999999" }}
                label="Ngay Đến"
                defaultValue={ngayDi}
                onChange={(value) => setNgayDi(value)}
              ></DesktopDatePicker>

              <DesktopDatePicker
                sx={{ zIndex: "99999999" }}
                label="Ngày về"
                defaultValue={ngayVe}
                onChange={(value) => setNgayVe(value)}
              ></DesktopDatePicker>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue={num}
                name="radio-buttons-group"
                onChange={(e) => setNum(e.target.value)}
              >
                {[...Array(soNguoi)].map((item, index) => {
                  const text = `${index + 1} người`;
                  return (
                    <FormControlLabel
                      key={index}
                      value={index + 1}
                      control={<Radio />}
                      label={text}
                    />
                  );
                })}
              </RadioGroup>
            </Stack>
          </Stack>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Hủy bỏ
          </Button>
          <Button variant="primary" onClick={handleUpdate}>
            Cập nhật
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default OrderRoom;
