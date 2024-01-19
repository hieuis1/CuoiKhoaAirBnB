import React, { useEffect } from "react";

import { Box } from "@mui/material";
import { useParams } from "react-router-dom";
import DetailHead from "./Detail-Head";
import DetailBody from "./Detail-Body";
import DetailFooter from "./Detail-Footer";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  getCommentRoom,
  getRoomDetailsAPI,
  postComment,
} from "../../apis/roomAPI";
import { Container } from "react-bootstrap";
import Comments from "./Comments";
import { queryClient } from "../../main";

const Details = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const { roomID } = useParams();
  const { data, isPending } = useQuery({
    queryKey: ["detail"],
    queryFn: () => getRoomDetailsAPI(roomID),
  });
  const { data: comment, isPending: commentPending } = useQuery({
    queryKey: ["commentList", roomID],
    queryFn: () => getCommentRoom(roomID),
  });
  const { mutate } = useMutation({
    mutationFn: (payload) => postComment(payload),
    onSuccess: (value) => {
      queryClient.refetchQueries(["commentList"]);
    },
  });

  const submit = (payload) => {
    mutate(payload);
  };
  if (!isPending && !commentPending) {
    return (
      <div id="roomDetail">
        <Container>
          <DetailHead data={data}></DetailHead>
          <DetailBody data={data} room={roomID}></DetailBody>
          <DetailFooter data={data}></DetailFooter>
          <Comments submit={submit} data={comment} room={roomID}></Comments>
        </Container>
      </div>
    );
  }
};

export default Details;
