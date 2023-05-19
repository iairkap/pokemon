import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getPokemons,
  getType,
  createPokemon,
} from "../../redux/actions/actions";
import styles from "./FormPage.module.css";

function CreatePokemon() {
  const dispatch = useDispatch();
  const types = useSelector((state) => state.types);

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
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validate({
        ...form,
        [e.target.name]: e.target.value,
      })
    );
  }

  /*   function handleSelect(e) {
    if (!form.types.includes(e.target.value)) {
      const newTypes = [...form.types, e.target.value];
      console.log("New types after select:", newTypes);
      setForm({ ...form, types: newTypes });
      setErrors(validate({ ...form, types: newTypes }));
      setTypesNames([...typesNames, e.target.name]);
    }
  } */

  function handleCheckbox(e) {
    const { value, checked } = e.target;
    let newTypes;

    if (checked && !form.types.includes(value)) {
      newTypes = [...form.types, value];
    } else {
      newTypes = form.types.filter((type) => type !== value);
    }

    console.log("New types after checkbox:", newTypes);
    setForm({ ...form, types: newTypes });
    setErrors(validate({ ...form, types: newTypes }));
  }

  function handleDelete(e) {
    const newTypes = form.types.filter((type) => type !== e.target.value);
    console.log("New types after delete:", newTypes);
    setForm({ ...form, types: newTypes });
    setErrors(validate({ ...form, types: newTypes }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (Object.values(errors).length > 0) {
      alert("No se pudo crear el pokemon");
    } else {
      console.log("Form types:", form.types);
      console.log("All types:", types);
    }

    const finalForm = { ...form };
    dispatch(createPokemon(finalForm));
    setCreated(finalForm);
    alert("Pokemon creado con éxito");
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
    } else if (isNaN(Number(input.hp))) {
      errors.hp = "Vida debe ser un número";
    } else if (Number(input.hp) >= 100) {
      errors.hp = "Vida debe ser menor a 100";
    }

    if (!input.attack) {
      errors.attack = "Ataque es requerido";
    } else if (isNaN(Number(input.attack))) {
      errors.attack = "Ataque debe ser un número";
    } else if (Number(input.attack) >= 100) {
      errors.attack = "Ataque debe ser menor a 100";
    }

    if (!input.defense) {
      errors.defense = "Defensa es requerida";
    } else if (isNaN(Number(input.defense))) {
      errors.defense = "Defensa debe ser un número";
    } else if (Number(input.defense) >= 100) {
      errors.defense = "Defensa debe ser menor a 100";
    }

    if (!input.speed) {
      errors.speed = "Velocidad es requerida";
    } else if (isNaN(Number(input.speed))) {
      errors.speed = "Velocidad debe ser un número";
    } else if (Number(input.speed) >= 100) {
      errors.speed = "Velocidad debe ser menor a 100";
    }

    if (!input.height) {
      errors.height = "Altura es requerida";
    } else if (isNaN(Number(input.height))) {
      errors.height = "Altura debe ser un número";
    } else if (Number(input.height) >= 30) {
      errors.height = "Altura debe ser menor a 30";

      if (!input.weight) {
        errors.weight = "Peso es requerido";
      } else if (isNaN(Number(input.weight))) {
        errors.weight = "Peso debe ser un número";
      } else if (Number(input.weight) >= 1000) {
        errors.weight = "Peso debe ser menor a 1000";
      }

      if (!input.image) {
        errors.image = "Imagen es requerida";
      } else if (!/^https?:\/\/.+\.(png)$/.test(input.image)) {
        errors.image = "URL de la imagen no es válida o no es un archivo PNG";
      }
    }

    if (form.types.length === 0) {
      errors.types = "Al menos un tipo es requerido";
    }

    return errors;
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Nombre:
          <input name="name" value={form.name} onChange={handleChange} />
          {errors.name && <p>{errors.name}</p>}
        </label>
        <label>
          Vida:
          <input name="hp" value={form.hp} onChange={handleChange} />
          {errors.hp && <p>{errors.hp}</p>}
        </label>
        <label>
          Ataque:
          <input name="attack" value={form.attack} onChange={handleChange} />
          {errors.attack && <p>{errors.attack}</p>}
        </label>
        <label>
          Defensa:
          <input name="defense" value={form.defense} onChange={handleChange} />
          {errors.defense && <p>{errors.defense}</p>}
        </label>
        <label>
          Velocidad:
          <input name="speed" value={form.speed} onChange={handleChange} />
          {errors.speed && <p>{errors.speed}</p>}
        </label>
        <label>
          Altura:
          <input name="height" value={form.height} onChange={handleChange} />
          {errors.height && <p>{errors.height}</p>}
        </label>
        <label>
          Peso:
          <input name="weight" value={form.weight} onChange={handleChange} />
          {errors.weight && <p>{errors.weight}</p>}
        </label>
        <label>
          Imagen:
          <input name="image" value={form.image} onChange={handleChange} />
          {errors.image && <p>{errors.image}</p>}
        </label>
        {/* Aquí van todos los campos del formulario... */}

        {/*    <label>
          Tipos:
          <select onChange={handleSelect}>
            <option value="">Selecciona un tipo</option>
            {types.map((type) => (
              <option key={type.id} value={type.id} name={type.name}>
                {type.name}
              </option>
            ))}
          </select>
          {errors.types && <p>{errors.types}</p>}
        </label> */}
        <label>
          Tipos:
          {types.map((type) => (
            <div key={type.id}>
              <label>
                <input
                  className={styles.checkbox}
                  type="checkbox"
                  name={type.name}
                  value={type.id}
                  onChange={handleCheckbox}
                  checked={form.types.includes(type.id)}
                />
                <span className={styles.checkmark}></span>
                {type.name}
              </label>
            </div>
          ))}
          {errors.types && <p>{errors.types}</p>}
        </label>
      </form>
    </div>
  );
}

export default CreatePokemon;

/* import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getPokemons } from "../../redux/actions/actions";
import { getType } from "../../redux/actions/actions";
import { URL } from "../../redux/actions/actions";
import { createPokemon } from "../../redux/actions/actions";

function CreatePokemon() {
  const dispatch = useDispatch();
  const types = useSelector((state) => state.types);

  const [created, setCreated] = useState({});
  const [sendTypes, setSendTypes] = useState([]);
  const [form, setForm] = useState({
    name: "",
    hp: "",
    attack: "",
    defense: "",
    speed: "",
    height: "",
    weight: "",
    image: "",
    types: sendTypes,
  });

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
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validate({
        ...form,
        [e.target.name]: e.target.value,
      })
    );
  }
  function handleSelect(e) {
    if (!sendTypes.includes(e.target.value)) {
      const newTypes = [...sendTypes, e.target.value];
      console.log("New types after select:", newTypes);
      setSendTypes(newTypes);
      setErrors(validate({ ...form, types: newTypes }));
    }
  }
  function handleSubmit(e) {
    e.preventDefault();
    if (Object.values(errors).length > 0) {
      alert("No se pudo crear el pokemon");
    } else {
      const completeForm = { ...form, types: sendTypes };
      dispatch(createPokemon(completeForm));
      setCreated(completeForm);
      alert("Pokemon creado con exito");
    }
  }

  function handleDelete(e) {
    const newTypes = sendTypes.filter((type) => type !== e.target.value);
    console.log("New types after delete:", newTypes);
    setSendTypes(newTypes);
    setErrors(validate({ ...form, types: newTypes }));
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
    } else if (isNaN(Number(input.hp))) {
      errors.hp = "Vida debe ser un número";
    } else if (Number(input.hp) >= 100) {
      errors.hp = "Vida debe ser menor a 100";
    }

    if (!input.attack) {
      errors.attack = "Ataque es requerido";
    } else if (isNaN(Number(input.attack))) {
      errors.attack = "Ataque debe ser un número";
    } else if (Number(input.attack) >= 100) {
      errors.attack = "Ataque debe ser menor a 100";
    }

    if (!input.defense) {
      errors.defense = "Defensa es requerida";
    } else if (isNaN(Number(input.defense))) {
      errors.defense = "Defensa debe ser un número";
    } else if (Number(input.defense) >= 100) {
      errors.defense = "Defensa debe ser menor a 100";
    }

    if (!input.speed) {
      errors.speed = "Velocidad es requerida";
    } else if (isNaN(Number(input.speed))) {
      errors.speed = "Velocidad debe ser un número";
    } else if (Number(input.speed) >= 100) {
      errors.speed = "Velocidad debe ser menor a 100";
    }

    if (!input.height) {
      errors.height = "Altura es requerida";
    } else if (isNaN(Number(input.height))) {
      errors.height = "Altura debe ser un número";
    } else if (Number(input.height) >= 30) {
      errors.height = "Altura debe ser menor a 30";

      if (!input.weight) {
        errors.weight = "Peso es requerido";
      } else if (isNaN(Number(input.weight))) {
        errors.weight = "Peso debe ser un número";
      } else if (Number(input.weight) >= 1000) {
        errors.weight = "Peso debe ser menor a 1000";
      }

      if (!input.image) {
        errors.image = "Imagen es requerida";
      } else if (!/^https?:\/\/.+\.(png)$/.test(input.image)) {
        errors.image = "URL de la imagen no es válida o no es un archivo PNG";
      }
    }

    if (sendTypes.length === 0) {
      errors.types = "Al menos un tipo es requerido";
    }

    return errors;
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Nombre:
          <input name="name" value={form.name} onChange={handleChange} />
          {errors.name && <p>{errors.name}</p>}
        </label>
        <label>
          Vida:
          <input name="hp" value={form.hp} onChange={handleChange} />
          {errors.hp && <p>{errors.hp}</p>}
        </label>
        <label>
          Ataque:
          <input name="attack" value={form.attack} onChange={handleChange} />
          {errors.attack && <p>{errors.attack}</p>}
        </label>
        <label>
          Defensa:
          <input name="defense" value={form.defense} onChange={handleChange} />
          {errors.defense && <p>{errors.defense}</p>}
        </label>
        <label>
          Velocidad:
          <input name="speed" value={form.speed} onChange={handleChange} />
          {errors.speed && <p>{errors.speed}</p>}
        </label>
        <label>
          Altura:
          <input name="height" value={form.height} onChange={handleChange} />
          {errors.height && <p>{errors.height}</p>}
        </label>
        <label>
          Peso:
          <input name="weight" value={form.weight} onChange={handleChange} />
          {errors.weight && <p>{errors.weight}</p>}
        </label>
        <label>
          Imagen:
          <input name="image" value={form.image} onChange={handleChange} />
          {errors.image && <p>{errors.image}</p>}
        </label>
        <label>
          Tipos:
          <select onChange={handleSelect}>
            <option value="">Selecciona un tipo</option>
            {types.map((type) => (
              <option key={type.id} value={type.name}>
                {type.name}
              </option>
            ))}
          </select>
          {errors.types && <p>{errors.types}</p>}
        </label>
        <div>
          {sendTypes.map((type) => (
            <button key={type} value={type} onClick={handleDelete}>
              {type}
            </button>
          ))}
        </div>
        <button type="submit">Crear Pokemon</button>
      </form>
    </div>
  );
}

export default CreatePokemon;
 */
