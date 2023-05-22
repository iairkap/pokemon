import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPokemons } from "../../redux/actions/actions";

export const useFetchPokemons = () => {
  const dispatch = useDispatch();
  const pokemons = useSelector((state) => state.filterAndOrderPokemons);
  const pokemonDeleted = useSelector((state) => state.pokemonDeleted);

  useEffect(() => {
    if (pokemons.length === 0 || pokemonDeleted) {
      dispatch(getPokemons());

      // Dispatch another action to reset pokemonDeleted back to false
      dispatch({ type: "RESET_POKEMON_DELETED", payload: false });
    }
  }, [dispatch, pokemons, pokemonDeleted]);

  return pokemons;
};
