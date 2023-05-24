import React from "react";
import styles from "../views/Form Page/FormPage.module.css";
import Menu from "./menu";

function Form({
  form,
  handleChange,
  handleSubmit,
  errors,
  handleBotonMenu,
  openMenu,
  handleCheckbox,
  types,
}) {
  return (
    <div className={styles.container}>
      <div>
        <div className={styles.Menu} onClick={handleBotonMenu}>
          <div className={styles.Menu__line}></div>
          <div className={styles.Menu__line}></div>
          <div className={styles.Menu__line}></div>
        </div>
        <Menu handleBotonMenu={handleBotonMenu} openMenu={openMenu} />
      </div>

      <div className={styles.form}>
        <div>
          <div>
            <label>Tipos:</label>
          </div>
        </div>
        <div className={styles.types}>
          {types.map((type) => (
            <div key={type.id}>
              <label>
                <input
                  className={`${styles.checkbox} ${
                    errors.types ? styles.error : ""
                  }`}
                  type="checkbox"
                  name={type.name}
                  value={type.id}
                  onChange={handleCheckbox}
                  checked={form.types.includes(type.id)}
                />
                <span
                  className={`${styles.checkmark} ${
                    form.types.includes(type.id) ? styles.checked : ""
                  }`}
                ></span>
                <span className={styles.typesNames}>{type.name}</span>
              </label>
            </div>
          ))}
          <p className={styles.errorText}>{errors.types}</p>
        </div>
        <form onSubmit={handleSubmit} className={styles.inputs}>
          <label className={styles.label}>Nombre:</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            className={`${styles.input} ${errors.name ? styles.error : ""}`}
          />
          <p className={styles.errorText}>{errors.name}</p>

          <label className={styles.label}>Vida:</label>
          <input
            name="hp"
            value={form.hp}
            onChange={handleChange}
            className={`${styles.input} ${errors.hp ? styles.error : ""}`}
          />
          <p className={styles.errorText}>{errors.hp}</p>

          <label className={styles.label}>Ataque:</label>
          <input
            name="attack"
            value={form.attack}
            onChange={handleChange}
            className={`${styles.input} ${errors.attack ? styles.error : ""}`}
          />
          <p className={styles.errorText}>{errors.attack}</p>

          <label className={styles.label}>Defensa:</label>
          <input
            name="defense"
            value={form.defense}
            onChange={handleChange}
            className={`${styles.input} ${errors.defense ? styles.error : ""}`}
          />
          <p className={styles.errorText}>{errors.defense}</p>

          <label className={styles.label}>Velocidad:</label>
          <input
            name="speed"
            value={form.speed}
            onChange={handleChange}
            className={`${styles.input} ${errors.speed ? styles.error : ""}`}
          />
          <p className={styles.errorText}>{errors.speed}</p>

          <label className={styles.label}>Altura:</label>
          <input
            name="height"
            value={form.height}
            onChange={handleChange}
            className={`${styles.input} ${errors.height ? styles.error : ""}`}
          />
          <p className={styles.errorText}>{errors.height}</p>

          <label className={styles.label}>Peso:</label>
          <input
            name="weight"
            value={form.weight}
            onChange={handleChange}
            className={`${styles.input} ${errors.weight ? styles.error : ""}`}
          />
          <p className={styles.errorText}>{errors.weight}</p>

          <label className={styles.label}>Imagen:</label>
          <input
            name="image"
            value={form.image}
            onChange={handleChange}
            className={`${styles.input} ${errors.image ? styles.error : ""}`}
          />
          <p className={styles.errorText}>{errors.image}</p>
          <button className={styles.boton} type="submit">
            Crear Pokemon
          </button>
        </form>
      </div>
    </div>
  );
}

export default Form;
