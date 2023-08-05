import "../styles/results.css";
import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { urlImg } from "../utils/utils";

export const Card = ({ data, media }) => {
  const urlBaseImg = useSelector((state) => state.img);

  return (
    <div className="card" key={data.id}>
      <div className="cardBox">
        <Link
          to={`/${data["media_type"] || media}/${data.id}`}
          className="linkCardBox"
        >
          <div className="cardImgBox">
            <img
              className="posterImg"
              src={urlImg(
                urlBaseImg,
                data["poster_path"] || data["profile_path"]
              )}
              alt={`${data.name || data["original_title"]}`}
            />
          </div>
          <div className="cardTitleBox">
            <h3 className="cardTitle">{data.name || data["original_title"]}</h3>
          </div>
        </Link>
      </div>
      <div className="cardButtonsBox">
        <div className="cardButton1"></div>
        <div className="cardButton2"></div>
        <div className="cardButton3"></div>
      </div>
    </div>
  );
};
