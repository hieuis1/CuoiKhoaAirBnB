import {
  Autocomplete,
  FormControl,
  MenuItem,
  Select,
  TextField,
  InputLabel,
} from "@mui/material";
import React, { useState } from "react";
import { Container, Placeholder } from "react-bootstrap";
import "./khuVuc.scss";
import { DesktopDatePicker } from "@mui/x-date-pickers";
import SearchIcon from "@mui/icons-material/Search";
import { set } from "date-fns";
import dayjs from "dayjs";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
const KhuVuc = ({ list }) => {
  let data = list.map((item) => {
    return { ...item, label: item.tenViTri };
  });
  const navigate = useNavigate();
  const [viTri, setVitri] = useState(null);
  const [ngayDen, setNgayDen] = useState(null);
  const [ngayVe, setNgayVe] = useState(null);
  const [soNguoi, setSoNguoi] = useState(null);
  console.log(viTri);
  const handleSearch = () => {
    const today = new Date();
    const select = new Date(ngayDen);
    if (viTri == null) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Vui lòng chọn vị trí",
      });
    } else if (ngayDen == null) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Vui lòng chọn ngày đến",
      });
    } else if (ngayVe == null) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Vui lòng chọn ngày về",
      });
    } else if (soNguoi == null) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Vui lòng chọn số người",
      });
    } else if (today > select) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Ngày đến không hợp lệ",
      });
    } else {
      navigate(`/search/${viTri.id}`);
    }
  };
  return (
    <div id="khuVuc">
      <Container>
        <div className="khuVuc-search">
          <div className="khuVuc-complete">
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={data}
              sx={{ width: 300 }}
              renderInput={(params) => (
                <TextField {...params} label="Vị trí" variant="standard" />
              )}
              onChange={(e, newValue) => setVitri(newValue)}
              rx
            />
            <TextField
              label="Ngày đi"
              type="date"
              variant="standard"
              onChange={(value) => setNgayDen(value.target.value)}
              InputLabelProps={{
                shrink: true, // Để ngăn placeholder thu nhỏ
              }}
              InputProps={{
                placeholder: " ", // Đặt placeholder thành một khoảng trắng
              }}
              sx={{ width: 300 }}
            ></TextField>
            <TextField
              label="Ngày về"
              variant="standard"
              onChange={(value) => setNgayVe(value.target.value)}
              type="date"
              InputLabelProps={{
                shrink: true, // Để ngăn placeholder thu nhỏ
              }}
              InputProps={{
                placeholder: " ", // Đặt placeholder thành một khoảng trắng
              }}
              sx={{ width: 300 }}
            ></TextField>

            <Autocomplete
              className="auto"
              disablePortal
              id="combo-box-demo"
              options={["1 Người", "2 Người", "3 Người", "4 Người"]}
              sx={{ width: 300 }}
              onChange={(e, newValue) => setSoNguoi(newValue)}
              renderInput={(params) => (
                <TextField {...params} label="Số khách" variant="standard" />
              )}
            />
            <div onClick={handleSearch} className="auto-icon">
              <SearchIcon />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default KhuVuc;
