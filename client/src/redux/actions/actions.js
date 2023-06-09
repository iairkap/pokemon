import axios from "axios";

export const GET_POKEMONS = "GET_POKEMONS";
export const GET_POKEMON_BY_ID = "GET_POKEMON_BY_ID";
export const GET_POKEMON_BY_NAME = "GET_POKEMON_BY_NAME";
export const CREATE_POKEMON = "CREATE_POKEMON";
export const GET_TYPE = "GET_TYPE";
export const FILTER_POKEMONS_BY_TYPE = "FILTER_POKEMONS_BY_TYPE";
export const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";
export const FILTER_POKEMONS_BY_ORIGIN = "FILTER_POKEMONS_BY_ORIGIN";
export const ORDER_ASCENDENT_DESCENDENT = "ORDER_ASCENDENT_DESCENDENT";
export const ORDER_A_TO_Z_Z_TO_A = "ORDER_A_TO_Z_Z_TO_A";
export const ORDER_BY_ATTACK = "ORDER_BY_ATTACK";
export const SET_POKEMONS = "SET_POKEMONS";
export const SET_POKEMONS_DETAIL = "SET_POKEMONS_DETAIL";
export const CLEAR_POKEMONS = "CLEAR_POKEMONS";
export const DELETE_POKEMON_BY_ID = "DELETE_POKEMON_BY_ID";
export const FILTER_POKEMONS = "FILTER_POKEMONS";
export const URL = "http://localhost:3001/pokemon";
export const CLEAR_ERROR = "CLEAR_ERROR";
export const RESET_STATE = "RESET_STATE";

//! Funciones async
export const getPokemons = () => {
  return async function (dispatch) {
    try {
      const pokemonsData = await axios.get("http://localhost:3001/pokemon");
      const pokemons = pokemonsData.data;
      dispatch({ type: GET_POKEMONS, payload: pokemons });
    } catch (error) {
      console.error(error);
    }
  };
};

export const getPokemonByID = (id) => {
  return async function (dispatch) {
    try {
      const pokemonbyID = await axios.get(
        `http://localhost:3001/pokemon/${id}`
      );
      const pokemon = pokemonbyID.data;
      dispatch({ type: GET_POKEMON_BY_ID, payload: pokemon });
    } catch (error) {
      console.error(error);
    }
  };
};

export const getPokemonByName = (name) => {
  return async function (dispatch) {
    try {
      if (name) {
        const response = await fetch(
          `http://localhost:3001/pokemon/name/?name=${name}`
        );
        const pokemon = await response.json();

        if (pokemon.name) {
          // Si encuentra el Pokémon, lo envía como una acción al store
          return dispatch({
            type: GET_POKEMON_BY_NAME,
            payload: pokemon,
          });
        }

        if (pokemon.errorDB && pokemon.errorAPI) {
          // Si no encuentra el Pokémon en la base de datos ni en la API, envía un mensaje de "Not found"
          return dispatch({
            type: GET_POKEMON_BY_NAME,
            payload: { message: "Not found" },
          });
        }
      }
    } catch (error) {
      console.error(error);
    }
  };
};

export const createPokemon = (body) => {
  return async function (dispatch) {
    try {
      const response = await axios.post("http://localhost:3001/pokemon", body);
      console.log(body);
      const pokemon = response.data;
      if (response.status === 200) {
        dispatch({ type: CREATE_POKEMON, payload: pokemon });
      } else {
        alert("No se puede crear el Pokémon.");
      }
    } catch (error) {
      console.error(error);
      alert("No se puede crear el Pokémon.");
    }
  };
};

export const getType = () => {
  return async function (dispatch) {
    try {
      const response = await axios.get("http://localhost:3001/pokemon/types");
      const types = response.data;
      dispatch({ type: GET_TYPE, payload: types });
    } catch (error) {
      console.error(error);
    }
  };
};
export const deletePokemonById = (id) => {
  return async function (dispatch) {
    try {
      const response = await axios.delete(
        `http://localhost:3001/pokemon/${id}`
      );
      if (response.status === 200) {
        dispatch({ type: DELETE_POKEMON_BY_ID, payload: id });

        // Dispatch action to mark that a Pokemon has been deleted
        dispatch({ type: "POKEMON_DELETED", payload: true });
      } else {
        alert("No se puede eliminar el Pokémon.");
      }
    } catch (error) {
      console.error(error);
      alert("No se puede eliminar el Pokémon.");
    }
  };
};

//! funciones sync

export const setCurrentPage = (currentPage) => {
  return { type: SET_CURRENT_PAGE, payload: currentPage };
};

export const filterPokemonsByOrigin = (origin) => {
  return { type: FILTER_POKEMONS_BY_ORIGIN, payload: origin };
};

export const filterPokemonsByType = (type) => {
  return { type: FILTER_POKEMONS_BY_TYPE, payload: type };
};

export const orderByAscendentDescendent = (filter) => {
  return { type: ORDER_ASCENDENT_DESCENDENT, payload: filter };
};

export const orderByAToZZToA = (filter) => {
  return { type: ORDER_A_TO_Z_Z_TO_A, payload: filter };
};

export const orderByAttack = (filter) => {
  return { type: ORDER_BY_ATTACK, payload: filter };
};

export const setPokemons = (pokemons) => {
  return { type: SET_POKEMONS, payload: {} };
};

export const setPokemonsDetail = () => {
  return { type: SET_POKEMONS_DETAIL, payload: {} };
};

export const clearPokemons = () => {
  return { type: CLEAR_POKEMONS };
};

export const filterPokemons = (type, origin) => {
  return { type: FILTER_POKEMONS, payload: { type, origin } };
};

export const clearError = () => {
  return { type: CLEAR_ERROR };
};

export function resetState() {
  return { type: RESET_STATE };
}
