import React from "react";
import Style from "./Card.module.scss";

interface Props {
  category: string;
  image: string;
  title: string;
  authors: string;
}

const Card: React.FunctionComponent<Props> = ({
  category,
  image,
  title,
  authors,
}) => {
  return (
    <div className={Style.card}>
      <div className={Style.cardImageBlock}>
        <img src={image} alt={title} className={Style.cardImage} />
      </div>
      <div className={Style.cardContent}>
        <p className={Style.cardCategory}>{category}</p>
        <h2 className={Style.cardTitle}>{title}</h2>
        <p className={Style.cardAuthor}>{authors}</p>
      </div>
    </div>
  );
};

export default Card;
