import React from "react";
import Card from "../Card/Card";
import style from "./CardsContainer.module.css";

const CardsContainer = ({ pokemons }) => {
  return (
    <div className={style.container}>
      {pokemons.length > 0 &&
        pokemons.map(({ id, image, name, Types, attack }) => (
          <Card
            key={id}
            id={id}
            image={image}
            name={name}
            types={Types}
            attack={attack}
          />
        ))}
    </div>
  );
};

export default CardsContainer;
