import axios from "axios";
import React, { useEffect } from "react";
import { Routes, Route } from "react-router";
import { Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setImg } from "../store/img";
import { Mediafile } from "../components/Mediafile";
import { Footbar } from "./Footbar";
import { Navbar } from "./Navbar";
import { Access } from "./Access";
import { Enroll } from "./Enroll";
import { Results } from "./Results";

export const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    axios.get("/api/data/img_data").then(({ data }) => {
      dispatch(setImg(`${data["secure_base_url"]}${data["poster_sizes"][1]}`));
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>
      <Navbar />

      <div id="content" style={{ paddingTop: "70px" }}>
        <Routes>
          <Route path="/" element={<></>} />

          <Route path="/access" element={<Access />} />

          <Route path="/enroll" element={<Enroll />} />

          <Route path="/search/:type" element={<Results />} />

          <Route path="/:type/:id" element={<Mediafile />} />

          <Route path="*" element={<Navigate to={"/"} />} />
        </Routes>
      </div>

      <Footbar />
    </div>
  );
};
