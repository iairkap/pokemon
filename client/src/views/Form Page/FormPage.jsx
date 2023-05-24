import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getPokemons,
  getType,
  createPokemon,
} from "../../redux/actions/actions";
import Menu from "../../components/Menu/Menu";
import styles from "./FormPage.module.css";

function CreatePokemon() {
  const dispatch = useDispatch();
  const types = useSelector((state) => state.types);
  const [openMenu, setOpenMenu] = useState(false);
  const pokemons = useSelector((state) => state.pokemons);

  useEffect(() => {
    if (types.length === 0 && pokemons.length === 0) {
      dispatch(getType());
      dispatch(getPokemons());
    }
  }, []);

  const [created, setCreated] = useState({});

  const [form, setForm] = useState({
    name: "",
    hp: "",
    attack: "",
    defense: "",
    speed: "",
    height: "",
    weight: "",
    image: "",
    types: [],
  });

  const [typesNames, setTypesNames] = useState([]);

  const [errors, setErrors] = useState({
    name: "",
    hp: "",
    attack: "",
    defense: "",
    speed: "",
    height: "",
    weight: "",
    image: "",
    types: "",
    form: "",
  });

  useEffect(() => {
    dispatch(getPokemons());
  }, [created, dispatch]);

  if (types.length === 0) {
    dispatch(getType());
  }

  function handleChange(e) {
    let value = e.target.value;

    if (e.target.name === "name") {
      value = value.toLowerCase();
    }

    setForm({
      ...form,
      [e.target.name]: value,
    });
    setErrors(
      validate({
        ...form,
        [e.target.name]: value,
      })
    );
  }
  function handleBotonMenu() {
    setOpenMenu(!openMenu);
  }

  function handleCheckbox(e) {
    const { value, checked } = e.target;
    let newTypes;

    if (checked && !form.types.includes(value)) {
      newTypes = [...form.types, value];
    } else {
      newTypes = form.types.filter((type) => type !== value);
    }

    const newFormState = { ...form, types: newTypes };

    setForm(newFormState);
    setErrors(validate(newFormState));
  }

  function handleDelete(e) {
    const newTypes = form.types.filter((type) => type !== e.target.value);

    const newFormState = { ...form, types: newTypes };

    setForm(newFormState);
    setErrors(validate(newFormState));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const errorValues = Object.values(errors);
    const formErrors = errorValues.filter((error) => error !== "");
    if (formErrors.length > 0) {
      alert("No se pudo crear el pokemon");
    } else {
      const finalForm = { ...form };
      dispatch(createPokemon(finalForm));
      setCreated(finalForm);
      alert("Pokemon creado con éxito");
    }
  }

  function validate(input) {
    let errors = {};

    if (!input.name) {
      errors.name = "Nombre es requerido";
    } else if (!/^[a-zA-Z\s]*$/.test(input.name)) {
      errors.name = "El nombre solo debe contener letras y espacios";
    }

    if (!input.hp) {
      errors.hp = "Vida es requerida";
    } else if (isNaN(Number(input.hp)) || !Number.isInteger(Number(input.hp))) {
      errors.hp = "Vida debe ser un número entero";
    } else if (Number(input.hp) >= 256) {
      errors.hp = "Vida debe ser menor a 255";
    }

    if (!input.attack) {
      errors.attack = "Ataque es requerido";
    } else if (
      isNaN(Number(input.attack)) ||
      !Number.isInteger(Number(input.attack))
    ) {
      errors.attack = "Ataque debe ser un número entero";
    } else if (Number(input.attack) >= 211) {
      errors.attack = "Ataque debe ser menor a 210";
    }

    if (!input.defense) {
      errors.defense = "Defensa es requerida";
    } else if (
      isNaN(Number(input.defense)) ||
      !Number.isInteger(Number(input.defense))
    ) {
      errors.defense = "Defensa debe ser un número entero";
    } else if (Number(input.defense) >= 251) {
      errors.defense = "Defensa debe ser menor a 250";
    }

    if (!input.speed) {
      errors.speed = "Velocidad es requerida";
    } else if (
      isNaN(Number(input.speed)) ||
      !Number.isInteger(Number(input.speed))
    ) {
      errors.speed = "Velocidad debe ser un número entero";
    } else if (Number(input.speed) >= 201) {
      errors.speed = "Velocidad debe ser menor a 200";
    }

    if (!input.height) {
      errors.height = "Altura es requerida";
    } else if (isNaN(Number(input.height))) {
      errors.height = "Altura debe ser un número";
    } else if (Number(input.height) > 21) {
      errors.height = "Altura debe ser menor a 20";
    }

    if (!input.weight) {
      errors.weight = "Peso es requerido";
    } else if (
      isNaN(Number(input.weight)) ||
      !Number.isInteger(Number(input.weight))
    ) {
      errors.weight = "Peso debe ser un número entero";
    } else if (Number(input.weight) >= 1000) {
      errors.weight = "Peso debe ser menor a 1000";
    }

    if (!input.image) {
      errors.image = "Imagen es requerida";
    } else if (!/^https?:\/\/.+\.(png)$/.test(input.image)) {
      errors.image = "URL de la imagen no es válida o no es un archivo PNG";
    }

    if (input.types.length === 0) {
      errors.types = "Al menos un tipo es requerido";
    }

    return errors;
  }
  console.log("Current form.types state:", form.types);
  console.log("Styles object:", styles);

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

          <label className={styles.label}>Altura: en metros</label>
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
export default CreatePokemon;
