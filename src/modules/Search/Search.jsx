import React, { useEffect } from "react";
import "./search.scss";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getRoomWithLocation } from "../../apis/locationAPI";
import { Col, Container, Row } from "react-bootstrap";
const Search = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const { id } = useParams();
  const { data, isPending } = useQuery({
    queryKey: ["khuVuc"],
    queryFn: () => getRoomWithLocation(id),
  });
  console.log(data);
  const navigate = useNavigate();
  if (!isPending) {
    return (
      <div id="search" style={{ marginTop: "40px" }}>
        <Container>
          <div className="search-header">
            <p className="search-title">Hơn 300 chỗ ở- 1 thg 1 - 18 thg 1</p>
            <h1>Chỗ ở tại khu vực bạn đã chọn</h1>
            <div className="seach-header-item">
              <p>Loại nơi ở</p>
              <p>Giá</p>
              <p>Đặt ngay</p>
              <p>Phòng và Phòng ngủ</p>
            </div>
          </div>
          <Row>
            <Col lg={8} style={{ marginBottom: "30px" }}>
              {data.map((item) => {
                return (
                  <div
                    style={{ cursor: "pointer" }}
                    key={item.id}
                    className="history-item"
                    onClick={() => navigate(`/room/${item.id}`)}
                  >
                    <div className="history-img">
                      <img src={item.hinhAnh} alt="" />
                    </div>
                    <div className="history-des">
                      <h3>{item.tenPhong}</h3>
                      <div className="history-des-item">
                        <p>
                          {item.soLuongKhach} khách - {item.phongNgu} phòng ngủ
                          - {item.phongTam} phòng tắm
                        </p>
                        <p>
                          {item.banLa ? "Bàn là -" : ""}{" "}
                          {item.bep ? "bếp -" : ""}{" "}
                          {item.dieuHoa ? "Điều hòa -" : ""}{" "}
                          {item.doXe ? "bãi đỗ xe -" : ""}
                          {item.hoBoi ? "hồ bơi -" : ""}
                          {item.matGiat ? "máy giặt -" : ""}{" "}
                          {item.tivi ? "tivi" : ""}
                        </p>
                        <div className="history-price">
                          {item.giaTien}$ / đêm
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </Col>
            <Col></Col>
          </Row>
        </Container>
      </div>
    );
  }
};

export default Search;
