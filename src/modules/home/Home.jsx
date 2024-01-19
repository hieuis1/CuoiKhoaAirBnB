import React from "react";

import Showing from "./Showing";
import Banner from "./Banner/Banner";
import ViTri from "./viTri/ViTri";
import KhuVuc from "./khuVuc";
import { useQuery } from "@tanstack/react-query";
import { getListRoomAPI } from "../../apis/roomAPI";
import { dark } from "@mui/material/styles/createPalette";
import { getListLocationAPI } from "../../apis/locationAPI";

const Home = () => {
  const { data, isPending } = useQuery({
    queryKey: ["listRoomHome"],
    queryFn: getListLocationAPI,
  });
  console.log(data);

  if (!isPending) {
    return (
      <>
        <Banner />
        <KhuVuc list={data} />
        <ViTri />
        <Showing />
      </>
    );
  }
};

export default Home;
