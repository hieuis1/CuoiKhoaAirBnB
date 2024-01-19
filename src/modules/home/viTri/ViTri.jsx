import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { getListLocationAPI } from "../../../apis/locationAPI";
import { Container } from "react-bootstrap";
import "./vitri.scss";
import { LocalFireDepartmentSharp } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
const ViTri = () => {
  const [list, setList] = useState([]);
  const [no, setNo] = useState(8);
  const { data, isPending } = useQuery({
    queryKey: ["location"],
    queryFn: getListLocationAPI,
  });
  let slice = data ? data.slice(0, no) : [];
  const navigate = useNavigate();
  return (
    <Container>
      <div id="viTri">
        <h2 className="viTri-title">Khám phá điểm đến gần đây</h2>
        <div className="vitri-list">
          {data &&
            slice.map((item) => {
              return (
                <div
                  onClick={() => navigate(`/search/${item.id}`)}
                  className="vitri-list-item"
                >
                  <div className="vitri-item-left">
                    <img
                      style={{
                        width: "70px",
                        height: "70px",
                        objectFit: "cover",
                      }}
                      src={item.hinhAnh}
                      alt=""
                    />
                  </div>
                  <div className="vitri-item-right">
                    <h5>{item.tenViTri}</h5>
                    <p>Tỉnh thành {item.tinhThanh}</p>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </Container>
  );
};

export default ViTri;
