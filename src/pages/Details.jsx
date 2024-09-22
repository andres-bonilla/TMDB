import React, { useEffect } from "react";
import { List } from "../components/commons/List";
import { useParams } from "react-router";
import { useAxios } from "../utils/useAxios.jsx";
import { useImgUrl } from "../utils/useImgUrl.jsx";
import NoImg from "../assets/no-img.svg?react";

export const Details = () => {
  const { type, id } = useParams();

  const { loading, data, err } = useAxios({
    method: "get",
    url: `/api/${type}/${id}`,
  });

  const imgUrl = useImgUrl(!loading && data ? data.img : "");
  return !loading ? (
    <>
      <div className="poster">
        {data.img ? (
          <img src={imgUrl} alt={data.name} className="m-img" />
        ) : (
          <NoImg className="m-img" />
        )}
        <h2></h2>
      </div>
      <div className="details">
        <h1 className="details-title">{data.name}</h1>
        {data.description[0] !== "" ? (
          data.description.map((text, i) =>
            text !== "" ? <p key={i}>{text}.</p> : <></>
          )
        ) : (
          <p>No hay descripción</p>
        )}
      </div>
      {data.related.length && (
        <>
          <h2 className="related-title">Relacionados</h2>
          <div className="related-container">
            <List data={data.related} />
          </div>
        </>
      )}
    </>
  ) : (
    <></>
  );
};
