import "../styles/results.css";
import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { urlImg } from "../utils/utils";
import NoImg from "../assets/no-img.svg?react";

export const Card = ({ data, media }) => {
  const urlBaseImg = useSelector((state) => state.img);

  return (
    <div className="cardBox" key={data.id}>
      <Link
        className="linkCardBox"
        to={`/${data["media_type"] || media}/${data.id}`}
      >
        {data["poster_path"] || data["profile_path"] ? (
          <img
            className="posterImg"
            src={urlImg(
              urlBaseImg,
              data["poster_path"] || data["profile_path"]
            )}
            alt={`${data["name"] || data["title"]}`}
          />
        ) : (
          <NoImg className="posterImg" />
        )}

        <div className="cardTitleBox">
          <h3 className="cardTitle">{data["name"] || data["title"]}</h3>
        </div>
        {/*
      <div className="cardButtonsBox">
        <div className="cardButton1"></div>
        <div className="cardButton2"></div>
        <div className="cardButton3"></div>
      </div>*/}
      </Link>
    </div>
  );
};
