import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  filterPokemonsByType,
  orderByAscendentDescendent,
  orderByAttack,
  filterPokemonsByOrigin,
  orderByAToZZToA,
  filterPokemons,
  clearError,
} from "../../redux/actions/actions";
import Sort from "../../assets/Sort";
import styles from "./FilterAndOrder.module.css";
import Order from "../../assets/Icons-Types/Order";
function FilterAndOrder() {
  const dispatch = useDispatch();
  const types = useSelector((state) => state.types);
  const [selectedType, setSelectedType] = useState("All Types");
  const [selectedOrigin, setSelectedOrigin] = useState("All Origins");

  const [openFilter, setOpenFilter] = useState({ display: "none" });
  const [openOrder, setOpenOrder] = useState({ display: "none" });
  const error = useSelector((state) => state.error);

  function handlerOpenFilter() {
    openFilter.display === "flex"
      ? setOpenFilter({ display: "none" })
      : setOpenFilter({ display: "flex" });
    openOrder && setOpenOrder({ display: "none" });
  }

  function handlerOpenOrder() {
    openOrder.display === "flex"
      ? setOpenOrder({ display: "none" })
      : setOpenOrder({ display: "flex" });
    openFilter && setOpenFilter({ display: "none" });
  }
  const handleTypeChange = (event) => {
    setSelectedType(event.target.value);
    dispatch(clearError());
    dispatch(filterPokemons(event.target.value, selectedOrigin));
  };

  const handleOriginChange = (event) => {
    setSelectedOrigin(event.target.value);
    dispatch(clearError());
    dispatch(filterPokemons(selectedType, event.target.value));
  };

  return (
    <div>
      <div className={styles.Container}>
        <div className={styles.Filter}>
          <div onClick={handlerOpenFilter}>
            <Sort className={styles.SVG} />
          </div>
          <div className={styles.filterMenu} style={openFilter}>
            <div className={styles.closeContainer}>
              <div onClick={handlerOpenFilter}>
                <span className={styles.close}>x</span>
              </div>
            </div>
            <select className={styles.selectMenu} onChange={handleTypeChange}>
              <option value="All Types">All Types</option>
              {types.map((type) => (
                <option value={type.name} key={type.id}>
                  {type.name}
                </option>
              ))}
            </select>
            <select className={styles.selectMenu} onChange={handleOriginChange}>
              <option value="All Origins">All Origins</option>
              <option value="API">API</option>
              <option value="Database">Database</option>
            </select>
          </div>
        </div>
        <div className="Order">
          <div className={styles.Order}>
            <div onClick={handlerOpenOrder}>
              <Order className={styles.SVG} />
            </div>
            <div className={styles.sortMenu} style={openOrder}>
              <div className={styles.openOrder}>
                <div onClick={handlerOpenOrder}>
                  <span className={styles.closeOrder}>x</span>
                </div>
                <div className={styles.orderContainer}>
                  <button
                    className={styles.buttonOrder}
                    onClick={() =>
                      dispatch(orderByAscendentDescendent("Ascendent"))
                    }
                  >
                    Ascendent
                  </button>
                  <button
                    className={styles.buttonOrder}
                    onClick={() =>
                      dispatch(orderByAscendentDescendent("Descendent"))
                    }
                  >
                    Descendent
                  </button>
                  <button
                    className={styles.buttonOrder}
                    onClick={() => dispatch(orderByAToZZToA("A-Z"))}
                  >
                    A-Z
                  </button>
                  <button
                    className={styles.buttonOrder}
                    onClick={() => dispatch(orderByAToZZToA("Z-A"))}
                  >
                    Z-A
                  </button>
                  <button
                    className={styles.buttonOrder}
                    onClick={() => dispatch(orderByAttack("Worse attack"))}
                  >
                    Peor Ataque{" "}
                  </button>
                  <button
                    className={styles.buttonOrder}
                    onClick={() => dispatch(orderByAttack("Best attack"))}
                  >
                    Mejor Ataque{" "}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {error && <div className={styles.error}>{error}</div>}
    </div>
  );
}

export default FilterAndOrder;
