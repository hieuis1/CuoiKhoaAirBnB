import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useEffect, useRef } from "react";
import { Navigate } from "react-router-dom";
import { editUserApi, getInforUserApi } from "../../apis/userAPI";
import { Col, Container, Row } from "react-bootstrap";
import img from "../../assets/pngwing.com (2).png";
import GppGoodOutlinedIcon from "@mui/icons-material/GppGoodOutlined";
import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
  TextField,
} from "@mui/material";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import { useState } from "react";

import Modal from "react-bootstrap/Modal";
import "./profile.scss";
import { DatePicker } from "@mui/lab";
import { DesktopDatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";

import Swal from "sweetalert2";
import { queryClient } from "../../main";
import OrderRoom from "./OderRoom/OrderRoom";
import {
  deleteOrderRoomApi,
  getListRoomAPI,
  getOrderRoomApi,
  upDateOrderRoomApi,
  updateRoomAPI,
} from "../../apis/roomAPI";
import OrderAvatar from "./OrderAvatar";

const Profile = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const fileRef = useRef();
  const [file, setFile] = useState(null);
  const user = JSON.parse(localStorage.getItem("CURRENT_USER"));
  const { data, isPending } = useQuery({
    queryKey: ["infoUser"],
    queryFn: () => getInforUserApi(user.user.id),
  });
  const { data: orderRoom, isPending: orderPending } = useQuery({
    queryKey: ["orderRoom"],
    queryFn: () => getOrderRoomApi(user.user.id),
  });
  const { data: listRoom, isPending: listPendding } = useQuery({
    queryKey: ["listRoom"],
    queryFn: getListRoomAPI,
  });
  const { mutate: handleUpdate } = useMutation({
    mutationFn: (payload) => upDateOrderRoomApi(payload.id, payload),
    onSuccess: () => {
      queryClient.refetchQueries(["orderRoom"]);
      Swal.fire({
        icon: "success",
        title: "Thông tin đã được cập nhật",
        showConfirmButton: false,
        timer: 1500,
      });
    },
  });
  const { mutate: handleDelete } = useMutation({
    mutationFn: (id) => deleteOrderRoomApi(id),
    onSuccess: () => {
      Swal.fire({
        title: "Deleted!",
        text: "Your file has been deleted.",
        icon: "success",
      });
      queryClient.refetchQueries(["orderRoom"]);
    },
  });

  const { mutate } = useMutation({
    mutationFn: (value) => editUserApi(value),
    onSuccess: () => {
      handleClose();
      queryClient.refetchQueries(["infoUser"]);
      Swal.fire({
        icon: "success",
        title: "Thông tin đã được cập nhật",
        showConfirmButton: false,
        timer: 1500,
      });
    },
  });
  const { mutate: upload } = useMutation({});
  if (user == null) {
    return <Navigate to={"/sign-in"}></Navigate>;
  }
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [name, setName] = useState(null);
  const [phone, setPhone] = useState(null);
  const [birth, setBirth] = useState(dayjs(Date.now()));
  const [gender, setGender] = useState(null);
  useEffect(() => {
    if (data) {
      setName(data.name);
      setGender(data.gender);
      setPhone(data.phone);
      setBirth(dayjs(data.birthday));
    }
  }, [data]);
  const handleSubmit = () => {
    let content = {
      id: data.id,
      name,
      phone,
      email: user.user.email,
      birthday: birth.$d,
      gender,
      rold: "USER",
    };
    mutate(content);
  };

  if (!isPending && !orderPending && !listPendding) {
    return (
      <div style={{ marginTop: "50px" }}>
        <Container>
          <Row>
            <Col lg={3}>
              <OrderAvatar data={data}></OrderAvatar>
            </Col>
            <Col>
              <div id="profile-right">
                <h2>Xin chào {data.name}</h2>
                <p className="start">Bắt đầu tham gia 2024</p>
                <p
                  style={{
                    margin: "10px 0",
                    textDecoration: "underline",
                    cursor: "pointer",
                  }}
                  onClick={handleShow}
                >
                  Chỉnh sửa thông tin
                </p>

                <Modal show={show} onHide={handleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title>Chỉnh sửa thông tin</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <Stack spacing={2}>
                      <TextField
                        className="field"
                        sx={{ width: "100%" }}
                        label="Họ tên"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      ></TextField>
                      <TextField
                        className="field"
                        sx={{ width: "100%" }}
                        label="Số điện thoại"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                      ></TextField>
                      <DesktopDatePicker
                        sx={{ zIndex: "99999999" }}
                        label="Ngay sinh"
                        onChange={(value) => setBirth(value)}
                        defaultValue={birth}
                      ></DesktopDatePicker>
                      <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue={gender ? "true" : "flase"}
                        name="radio-buttons-group"
                        onChange={(e) => {
                          if (e.target.value == "true") {
                            setGender(true);
                          } else {
                            setGender(false);
                          }
                        }}
                      >
                        <FormControlLabel
                          value="flase"
                          control={<Radio />}
                          label="Nữ"
                        />
                        <FormControlLabel
                          value="true"
                          control={<Radio />}
                          label="Nam"
                        />
                      </RadioGroup>
                    </Stack>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                      Hủy bỏ
                    </Button>
                    <Button variant="primary" onClick={handleSubmit}>
                      Lưu thay đổi
                    </Button>
                  </Modal.Footer>
                </Modal>
              </div>
              <div id="orderRoom">
                <OrderRoom
                  room={orderRoom}
                  listRoom={listRoom}
                  updateRoom={handleUpdate}
                  deleteRoom={handleDelete}
                ></OrderRoom>
              </div>
            </Col>
          </Row>
          <object data="" type=""></object>
          <div id="overlayAvatar"></div>
          <div id="uploadAvatar"></div>
        </Container>
      </div>
    );
  }
};

export default Profile;
