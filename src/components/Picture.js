import React from "react";

export default function Picture({ data }) {
  return (
    <div className="picture">
      <p>{data.photographer}</p>
      <div className="imageContainer">
        <img src={data.src.large} alt="" />
      </div>
      <p>
        在此下載圖片:{" "}
        <a target="_blank" href={data.src.large}>
          按一下
        </a>
      </p>
    </div>
  );
}
