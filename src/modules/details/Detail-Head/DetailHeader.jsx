import React from "react";
import "./detailHead.scss";
const DetailHeader = ({ data }) => {
  return (
    <div className="detail-header">
      <h1>{data.tenPhong}</h1>
      <img style={{ margin: "20px 0" }} src={data.hinhAnh} alt="" />
    </div>
  );
};

export default DetailHeader;
