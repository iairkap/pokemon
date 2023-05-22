import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  getPokemonByID,
  setPokemonsDetail,
  getPokemons,
  getType,
} from "../../redux/actions/actions";
import PokemonDetailPresentation from "../../components/PokemonDetailPresentation/PokemonDetailPresentation";

function Detail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const pokemonDetail = useSelector(
    (state) => state.pokemonDetail && state.pokemonDetail[0]
  );
  const pokemons = useSelector((state) => state.pokemons);
  const types = useSelector((state) => state.types);

  const handleBackClick = () => {
    dispatch(setPokemonsDetail([]));
    dispatch(getType());
    dispatch(getPokemons());
  };
  useEffect(() => {
    if (types.length === 0 && pokemons.length === 0) {
      dispatch(getType());
      dispatch(getPokemons());
      dispatch(getPokemonByID(id));
    }
  }, []);

  useEffect(() => {
    dispatch(getPokemonByID(id));

    return () => {
      dispatch(setPokemonsDetail([]));
      dispatch(getType());
      dispatch(getPokemons());
    };
  }, []);

  return (
    <PokemonDetailPresentation
      pokemonDetail={pokemonDetail}
      handleBackClick={handleBackClick}
    />
  );
}

export default Detail;
