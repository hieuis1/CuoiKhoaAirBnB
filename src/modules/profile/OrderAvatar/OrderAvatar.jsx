import React, { useState } from "react";
import GppGoodOutlinedIcon from "@mui/icons-material/GppGoodOutlined";
import "../profile.scss";
import { Button } from "@mui/material";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import img from "../../../assets/pngwing.com (2).png";
import Modal from "react-bootstrap/Modal";
import { useMutation } from "@tanstack/react-query";
import { uploadAvatarApi } from "../../../apis/userAPI";
const OrderAvatar = ({ data }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [formFile, setFormFile] = useState(null);
  const { mutate } = useMutation({
    mutationFn: (value) => uploadAvatarApi(value),
    onSuccess: () => {
      window.location.reload();
    },
  });
  const handleUpload = () => {
    handleClose();
    if (formFile) {
      mutate(formFile);
    }
  };
  return (
    <div id="profile">
      <div className="profile-head">
        <img src={data.avatar == "" ? img : data.avatar} alt="" />
        <a href="#!" onClick={handleShow}>
          Cập nhật ảnh
        </a>
        <input style={{ display: "none" }} type="file" />
      </div>
      <div className="profile-body">
        <div className="profile-body-icon">
          <GppGoodOutlinedIcon />
        </div>
        <div className="profile-body-text">
          <h3>Xác thực danh tính</h3>
          <p>Xác thực danh tính của bạn với huy hiệu xác minh danh tính</p>
          <Button variant="outlined">Nhận huy hiệu</Button>
        </div>
      </div>
      <div className="profile-bot">
        <h3>{data.name} đã xác nhận </h3>
        <p>
          <CheckOutlinedIcon /> Địa chỉ email
        </p>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Cập nhật avatar</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input type="file" onChange={(e) => setFormFile(e.target.files[0])} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            hủy bỏ
          </Button>
          <Button variant="primary" onClick={handleUpload}>
            Lưu thay đổi
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default OrderAvatar;
