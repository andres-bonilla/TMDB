import { Link } from "react-router-dom";
import { urlImg } from "../utils/utils";
import { useSelector } from "react-redux";
import "../styles/results.css";

export const Card = ({ data }) => {
  const urlBaseImg = useSelector((state) => state.img);

  return (
    <div className="cardBox" key={data.id}>
      <Link to={`/${data["media_type"]}/${data.id}`}>
        <img
          className="cardImg"
          src={urlImg(urlBaseImg, data["poster_path"] || data["profile_path"])}
          alt={`${data.name || data["original_title"]}`}
        />
        <div className="cardTitleBox">
          <h3 className="cardTitle">{data.name || data["original_title"]}</h3>
        </div>
      </Link>
    </div>
  );
};
