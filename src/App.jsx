import React, { useEffect } from "react";
import { Routes, Route } from "react-router";
import { Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { setImgData } from "./store/img";

import { Head } from "./layouts/Head.jsx";
import { Foot } from "./layouts/Foot.jsx";
import { Home } from "./pages/Home.jsx";
import { Results } from "./pages/Results.jsx";
import { Details } from "./pages/Details.jsx";

import { useAxios } from "./utils/useAxios.jsx";
import { ResetScroll } from "./utils/ResetScroll.jsx";

export const App = () => {
  const dispatch = useDispatch();

  const { loading, data } = useAxios({
    method: "get",
    url: "/api/data/img_data",
  });

  useEffect(() => {
    if (!loading) dispatch(setImgData(data));
  }, [loading]);

  return (
    <>
      <Head />

      <main id="content2">
        <ResetScroll element={window}>
          <Routes>
            <Route path="/" element={<Home />} />

            <Route path="/search/:type/:words/on/:page" element={<Results />} />

            <Route path="/search/:type/:words" element={<Results />} />

            <Route path="/search/*" element={<Results />} />

            <Route path="/search" element={<Results />} />

            <Route path="details/:type/:id" element={<Details />} />

            <Route path="*" element={<Navigate to={"/"} />} />
          </Routes>
        </ResetScroll>
      </main>

      <Foot />
    </>
  );
};
