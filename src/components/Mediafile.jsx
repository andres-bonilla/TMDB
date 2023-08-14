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

  let [mFile, setMFile] = useState({
    name: "",
    madeOn: [],
    description: "",
    imgPath: "",
    similar: [],
  });

  useEffect(() => {
    if (type) {
      axios.get(`/api/${type}/${id}`).then(({ data }) => {
        console.log("XXXXX", data, "XXXXX");
        let madeOn =
          data["release_date"] || data["first_air_date"] || data["birthday"];
        setMFile({
          name: data.name || data["original_title"],
          madeOn: madeOn ? madeOn.split("-") : [],
          description: data["overview"] || data["biography"],
          imgPath: data["poster_path"] || data["profile_path"],
          similar: data["similar"]
            ? data["similar"]["results"].slice(0, 5)
            : [],
        });
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
            mFile.madeOn.length !== 0 ? " (" + mFile.madeOn[0] + ")" : ""
          }`}</h1>

          <p>{mFile.description || "Ups, parece que no hay descripción"}</p>
        </div>
        <h2>Relacionados</h2>
        <div id="similarBox">
          <div id="similar">
            {mFile.similar.map((simil, index) => {
              return (
                <Card data={simil} media={type} key={simil.id * (index + 1)} />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
