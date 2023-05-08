import {
  GET_POKEMONS,
  GET_POKEMON_BY_ID,
  GET_POKEMON_BY_NAME,
  CREATE_POKEMON,
  GET_TYPE,
  FILTER_POKEMONS_BY_ORIGIN,
  FILTER_POKEMONS_BY_TYPE,
  SET_CURRENT_PAGE,
  ORDER_ASCENDENT_DESCENDENT,
  ORDER_A_TO_Z_Z_TO_A,
  ORDER_BY_ATTACK,
  SET_POKEMONS,
  SET_POKEMONS_DETAIL,
} from "../actions/actions";

const initialState = {
  pokemons: [],
  filterAndOrderPokemons: [],
  filter: [],
  types: [],
  order: [],
  currentPage: 0,
  pokemon: [],
  pokemonDetail: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_POKEMONS:
      return {
        ...state,
        pokemons: action.payload,
        filterAndOrderPokemons: action.payload,
      };
    case SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.payload,
      };
    case GET_TYPE:
      return {
        ...state,
        types: action.payload,
      };
    case FILTER_POKEMONS_BY_TYPE:
      const temporal = state.pokemons.filter((pokemon) => {
        return pokemon.Types?.includes(action.payload); //el includes es para que me traiga los pokemones que tengan ese tipo, es un metodo de los arrays.
      });
      if (action.payload !== "Types") {
        if (action.payload === "All types") {
          return {
            ...state,
            filterAndOrderPokemons: [state.pokemons],
            currentPage: 0,
          };
        } else {
          return {
            ...state,
            filterAndOrderPokemons: temporal,
            filter: temporal,
            currentPage: 0,
          };
        }
      }
      break;
    case FILTER_POKEMONS_BY_ORIGIN:
      if (action.payload !== "Origin") {
        if (action.payload === "All Origins") {
          return {
            ...state,
            filterAndOrderPokemons: [state.pokemons],
            currentPage: 0,
          };
        }
        if (action.payload === "API") {
          return {
            ...state,
            filterAndOrderPokemons: state.pokemons.filter((pokemon) => {
              return pokemon.id.length < 1200;
            }),
            currentPage: 0,
          };
        } else {
          return {
            ...state,
            filterAndOrderPokemons: state.pokemons.filter((pokemon) => {
              return pokemon.id.length >= 1200;
            }),
            currentPage: 0,
          };
        }
      }
      break;
    case ORDER_ASCENDENT_DESCENDENT:
      if (action.payload === "Ascendent") {
        return {
          ...state,
          filterAndOrderPokemons: [
            ...state.filterAndOrderPokemons.sort((a, b) => b.id - a.id), //b.id - a.id es para que me ordene de forma descendente
          ],
          currentPage: 0,
        };
      } else {
        return {
          ...state,
          filterAndOrderPokemons: [
            ...state.filterAndOrderPokemons.sort((a, b) => a.id - b.id), //a.id - b.id es para que me ordene de forma ascendente
          ],
          currentPage: 0,
        };
      }
    case ORDER_A_TO_Z_Z_TO_A:
      if (action.payload === "A-Z") {
        return {
          ...state,
          filterAndOrderPokemons: [
            ...state.filterAndOrderPokemons.sort((a, b) => {
              if (a.name > b.name) {
                return 1;
              }
              if (a.name < b.name) {
                return -1;
              }
              return 0;
            }),
          ],
          currentPage: 0,
        };
      } else {
        return {
          ...state,
          filterAndOrderPokemons: [
            ...state.filterAndOrderPokemons.sort((a, b) => {
              if (a.name > b.name) {
                return -1;
              }
              if (a.name < b.name) {
                return 1;
              }
              return 0;
            }),
          ],
          currentPage: 0,
        };
      }
    case ORDER_BY_ATTACK:
      if (action.payload === "Worse attack") {
        return {
          ...state,
          filterAndOrderPokemons: [
            ...state.filterAndOrderPokemons.sort((a, b) => a.attack - b.attack),
          ],
        };
      } else {
        return {
          ...state,
          filterAndOrderPokemons: [
            ...state.filterAndOrderPokemons.sort((a, b) => b.attack - a.attack),
          ],
        };
      }

    case GET_POKEMON_BY_NAME:
      return {
        ...state,
        pokemon: [action.payload],
      };
    case GET_POKEMON_BY_ID:
      return {
        ...state,
        pokemonDetail: [action.payload],
      };
    case SET_POKEMONS:
      return {
        ...state,
        pokemon: action.payload,
      };
    case SET_POKEMONS_DETAIL:
      return {
        ...state,
        pokemonDetail: action.payload,
      };

    default:
      return { ...state };
  }
};

export default rootReducer;
