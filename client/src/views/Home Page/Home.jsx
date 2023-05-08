import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GET_POKEMONS } from "../../redux/actions/actions";
import { usePage } from "../../usePage";
import Card from "../../components/Card/Card";

const Home = () => {
  const dispatch = useDispatch();
  const currentPage = useSelector((state) => state.currentPage);
  const pokemons = useSelector((state) => state.filterAndOrderPokemons);
  const numberOfPokemonsPerPage = 12;

  const { page, countPage } = usePage(
    pokemons,
    numberOfPokemonsPerPage,
    currentPage
  );

  return (
    <div className="Page">
      {pokemons.length === 0 && <h1>Loading...</h1>}
      <div className="Page__container">
        {pokemons.length > 0 &&
          page.map(({ id, image, name, Types, attack }) => (
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
    </div>
  );
};

export default Home;
