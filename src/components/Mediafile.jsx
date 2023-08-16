import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { urlImg } from "../utils/utils";
import { useSelector } from "react-redux";
import "../styles/mediaFile.css";
import { Card } from "../commons/Card";

export const Mediafile = () => {
  const urlBaseImg = useSelector((state) => state.img);

  const { type, id } = useParams();
  // debo mover estas estructuras al back
  let [mFile, setMFile] = useState({
    imgPath: "",
    name: "",
    description: ["Ups, parece que no hay descripción."],
    state: "",
    startOn: [],
    lastOn: [],
    lang: "",
    genres: "",
    related: [],
    companies: [],
  });

  useEffect(() => {
    if (type) {
      axios.get(`/api/${type}/${id}`).then(({ data }) => {
        console.log(data);
        setMFile(data);
      });
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div id="wraper">
      <div id="posterBox">
        <img
          id="poster"
          src={urlImg(urlBaseImg, mFile.imgPath)}
          alt={mFile.title || ""}
        />
      </div>

      <div id="infoBox">
        <div id="description">
          <h1>{`${mFile.name || ""}${
            mFile.startOn.length !== 0 ? " (" + mFile.startOn[0] + ")" : ""
          }`}</h1>

          {mFile.description.map((paragraph) => {
            return paragraph !== "" ? <p>{`${paragraph}.`}</p> : null;
          })}
        </div>
        <h2>Relacionados</h2>
        <div id="similarBox">
          <div id="similar">
            {mFile.related.map((item, index) => {
              return (
                <Card data={item} media={type} key={item.id * (index + 1)} />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
