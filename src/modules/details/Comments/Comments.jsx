import React, { useRef, useState } from "react";
import { Container } from "react-bootstrap";
import "./comment.scss";
import img from "../../../assets/pngwing.com (2).png";
import { Alert, Button } from "@mui/material";
import dayjs from "dayjs";
import { set } from "date-fns";
import StarIcon from "@mui/icons-material/Star";
import { FaStar } from "react-icons/fa";
import { useMutation } from "@tanstack/react-query";
import { postComment } from "../../../apis/roomAPI";
const Comments = ({ data, room, submit }) => {
  const user = localStorage.getItem("CURRENT_USER")
    ? JSON.parse(localStorage.getItem("CURRENT_USER"))
    : null;
  const [noEmlement, setNoElement] = useState(6);
  const slice = data.slice(0, noEmlement);
  const handleLoadMore = () => {
    setNoElement(noEmlement + 6);
  };
  const radioRefs = Array.from({ length: 5 }, () => useRef(null));
  const handleClick = (index) => {
    radioRefs[index].current.click();
    setStarNum(index + 1);
  };

  const [starNum, setStarNum] = useState(null);
  const [hover, setHover] = useState(null);
  const [comment, setComment] = useState("");
  const [err, setErr] = useState(null);
  const handleSubmit = (e) => {
    let date = new Date();
    e.preventDefault();
    if (starNum == null) {
      setErr("Vui lòng đánh giá để thêm bình luận");
      return;
    } else if (comment == "") {
      setErr("Vui lòng thêm nội dung để đăng bình luận");
      return;
    }

    setComment("");
    setErr(null);
    setStarNum(null);
    submit({
      id: 0,
      maPhong: room,
      maNguoiBinhLuan: user.user.id,
      ngayBinhLuan: Date.now(),
      noiDung: comment,
      saoBinhLuan: starNum,
    });
  };
  return (
    <div id="comment">
      <Container>
        <div className="comment-item-container">
          {slice.map((item) => {
            return (
              <div className="comment-item">
                <div className="comment-item-avatar">
                  <div className="comment-item-avatar-left">
                    <img src={item.avatar ? item.avatar : img} alt="" />
                  </div>
                  <div className="comment-item-avatar-right">
                    <h5>{item.tenNguoiBinhLuan}</h5>
                  </div>
                </div>
                <div className="comment-item-time">
                  {[...Array(item.saoBinhLuan)].map((star, index) => {
                    return <StarIcon sx={{ fontSize: 14 }} />;
                  })}
                  {"   "}
                  {dayjs(item.ngayBinhLuan).format(
                    "DD-MM-YYYY ~ hh[h]:ss[p] a"
                  )}
                </div>
                <div style={{ width: "400px" }} className="comment-item-text">
                  {item.noiDung}
                </div>
              </div>
            );
          })}
          {data.length - noEmlement <= 0 ? (
            ""
          ) : (
            <Button
              style={{ color: "black", border: "1px solid black" }}
              variant="outlined"
              onClick={handleLoadMore}
            >
              Thêm bình {data.length - noEmlement} luận
            </Button>
          )}
        </div>
        {user != null ? (
          <div className="add-comment mt-5 mb-5">
            <div className="add-comment-avatar">
              <img
                style={{ borderRadius: "50%", objectFit: "cover" }}
                src={user.user.avatar == "" ? img : user.user.avatar}
                alt=""
              />
            </div>
            <form action="" onSubmit={handleSubmit}>
              {[...Array(5)].map((star, index) => {
                const starValue = index + 1;
                return (
                  <label
                    htmlFor="rating"
                    key={index}
                    onClick={() => handleClick(index)}
                    style={{ marginRight: "3px" }}
                    onMouseEnter={() => setHover(starValue)}
                    onMouseLeave={() => setHover(null)}
                  >
                    <input
                      type="radio"
                      name="rating"
                      ref={radioRefs[index]}
                      style={{ display: "none" }}
                    />
                    <FaStar
                      color={
                        starValue <= (starNum || hover) ? "#ffc107" : "#e4e5e9"
                      }
                      size={23}
                    />
                  </label>
                );
              })}
              <textarea
                value={comment}
                name=""
                id=""
                cols="30"
                rows="3"
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
              {err == null ? "" : <Alert severity="error">{err}</Alert>}
              <Button type="submit" variant="contained">
                Bình luận
              </Button>
            </form>
          </div>
        ) : (
          ""
        )}
      </Container>
    </div>
  );
};

export default Comments;
