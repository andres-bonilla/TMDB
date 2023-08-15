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
    description: "",
    state: "",
    startOn: [],
    lastOn: [],
    lang: "",
    genres: "",
    similar: [],
    companies: [],
  });

  const mergeInfo = (info) => {
    let mergedInfo = {};
    mergedInfo.imgPath = info["poster_path"] || info["profile_path"];
    mergedInfo.name = info["name"] || info["title"];
    mergedInfo.description = info["overview"] || info["biography"];
    // startOn

    mergedInfo.startOn =
      info["release_date"] || info["first_air_date"] || info["birthday"];
    mergedInfo.startOn = mergedInfo.startOn
      ? mergedInfo.startOn.split("-")
      : [];
    // lastOn

    mergedInfo.lastOn = info["last_air_date"] || info["deathday"];
    mergedInfo.lastOn = mergedInfo.lastOn ? mergedInfo.lastOn.split("-") : [];
    // similar

    mergedInfo.similar = info["similar"]
      ? info["similar"]["results"]
      : info["combined_credits"]
      ? info["combined_credits"]["cast"].length >
        info["combined_credits"]["crew"].length
        ? info["combined_credits"]["cast"]
        : info["combined_credits"]["crew"]
      : [];
    mergedInfo.similar = mergedInfo.similar
      .sort((a, b) => b.popularity - a.popularity)
      .slice(0, 10);
    return mergedInfo;
  };

  useEffect(() => {
    if (type) {
      axios.get(`/api/${type}/${id}`).then(({ data }) => {
        setMFile(mergeInfo(data));
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
