import React from "react";
import { useParams } from "react-router";

import { List } from "../components/commons/List";

import { useAxios } from "../utils/useAxios.jsx";
import { useImgUrl } from "../utils/useImgUrl.jsx";

export const Details = () => {
  const { type, id } = useParams();

  const noParams = type === undefined || id === undefined;

  const { loading, data } = useAxios({
    method: "get",
    url: noParams ? "" : `/api/${type}/${id}`,
  });

  const imgUrl = useImgUrl(data ? data.img : "", "poster", "large");

  if (noParams) return <p>Tipo o ID erroneos</p>;

  if (loading) return <p>Cargando...</p>;

  if (!data) return <p>Este elemento no existe. Lo siento</p>;

  const mapDescription = (description) => {
    if (description[0] === "") return <p>No hay descripción</p>;

    return description.map((text, i) =>
      text !== "" ? <p key={i}>{text}.</p> : <></>
    );
  };

  return (
    <>
      <div className="poster">
        <img src={imgUrl} alt={data.name} className="m-img" />
      </div>
      <div className="details with-left-space">
        <h1 className="details-title">{data.name}</h1>
        {mapDescription(data.description)}
      </div>

      {data.related.length && (
        <List
          data={data.related}
          titleText="Relacionados"
          boxClass={"related-container with-left-space"}
          titleClass={"related-title with-left-space"}
        />
      )}
    </>
  );
};
