import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  filterPokemonsByType,
  orderByAscendentDescendent,
  orderByAttack,
  filterPokemonsByOrigin,
  orderByAToZZToA,
} from "../../redux/actions/actions";
import Sort from "../../assets/Sort";
import styles from "./FilterAndOrder.module.css";

function FilterAndOrder() {
  const dispatch = useDispatch();
  const types = useSelector((state) => state.types);

  // const pokemons = useSelector((state) => state.pokemons);

  const [openFilter, setOpenFilter] = useState({ display: "none" });
  const [openOrder, setOpenOrder] = useState({ display: "none" });
  const error = useSelector((state) => state.error);

  function handlerOpenFilter() {
    openFilter.display === "flex" //aca estoy preguntando si openFilter es true, si es true lo pongo en false, si es false lo pongo en true, flex me sirve para que se muestre el div.
      ? setOpenFilter({ display: "none" })
      : setOpenFilter({ display: "flex" });
    openOrder && setOpenOrder({ display: "none" });
  }

  function handlerOpenOrder() {
    openOrder.display === "flex"
      ? setOpenOrder({ display: "none" })
      : setOpenOrder({ display: "flex" });
    openFilter && setOpenFilter({ display: "none" }); //aca estoy preguntando si openFilter es true, si es true lo pongo en false, si es false lo pongo en true
  }

  return (
    <div className="FilterAndOrder">
      <div className="Filter">
        <div onClick={handlerOpenFilter}>
          <Sort />
        </div>
        <div className="FilterOptions" style={openFilter}>
          <div onClick={handlerOpenFilter}>
            <span>x</span>
          </div>
          <select
            onChange={(event) => {
              console.log("Selected type:", event.target.value);
              return dispatch(filterPokemonsByType(event.target.value));
            }}
          >
            <option value="Types">Types</option>
            <option value="All Types">All Types</option>
            {types.map((type) => (
              <option value={type.name} key={type.id}>
                {type.name}
              </option>
            ))}
          </select>

          <select
            onChange={(event) => {
              return dispatch(filterPokemonsByOrigin(event.target.value));
            }}
          >
            <option value="All Origins">Alls origins</option>
            <option value="API">Api</option>{" "}
            {/* Cambiado de <option value="Api">Api</option> */}
            <option value="Data base">Data base</option>{" "}
            {/* Cambiado de <option value="Db">Data base</option> */}
          </select>
        </div>
      </div>
      <div className="Order">
        <div onClick={handlerOpenOrder}>
          <span>botton reemplazar</span>
        </div>
        <div className="OrderOptions" style={openOrder}>
          <div onClick={handlerOpenOrder}>
            <span>x</span>
          </div>
          <button
            onClick={() => dispatch(orderByAscendentDescendent("Ascendent"))}
          >
            Ascendent
          </button>
          <button
            onClick={() => dispatch(orderByAscendentDescendent("Descendent"))}
          >
            Descendent
          </button>
          <button onClick={() => dispatch(orderByAToZZToA("A-Z"))}>A-Z</button>
          <button onClick={() => dispatch(orderByAToZZToA("Z-A"))}>Z-A</button>
          <button onClick={() => dispatch(orderByAttack("Worse attack"))}>
            Worse attack "flecha para abajo"
          </button>
          <button onClick={() => dispatch(orderByAttack("Best attack"))}>
            Best attack "flecha para arriba"
          </button>
        </div>
        {error && <div className={styles.error}>{error}</div>}
      </div>
    </div>
  );
}

export default FilterAndOrder;
