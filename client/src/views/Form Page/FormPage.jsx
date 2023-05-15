import React, { useEffect, useState } from "react";
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
    types: [],
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
      setSendTypes([...sendTypes, e.target.value]);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (Object.values(errors).length > 0) {
      alert("No se pudo crear el pokemon");
    } else {
      dispatch(createPokemon(form));
      setCreated(form);
      alert("Pokemon creado con exito");
    }
  }

  function handleDelete(e) {
    setSendTypes(sendTypes.filter((type) => type !== e.target.value));
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
    }

    if (!input.attack) {
      errors.attack = "Ataque es requerido";
    } else if (isNaN(Number(input.attack))) {
      errors.attack = "Ataque debe ser un número";
    }

    if (!input.defense) {
      errors.defense = "Defensa es requerida";
    } else if (isNaN(Number(input.defense))) {
      errors.defense = "Defensa debe ser un número";
    }

    if (!input.speed) {
      errors.speed = "Velocidad es requerida";
    } else if (isNaN(Number(input.speed))) {
      errors.speed = "Velocidad debe ser un número";
    }

    if (!input.height) {
      errors.height = "Altura es requerida";
    } else if (isNaN(Number(input.height))) {
      errors.height = "Altura debe ser un número";
    }

    if (!input.weight) {
      errors.weight = "Peso es requerido";
    } else if (isNaN(Number(input.weight))) {
      errors.weight = "Peso debe ser un número";
    }

    if (!input.image) {
      errors.image = "Imagen es requerida";
    } else if (!/^https?:\/\/.+\..+/.test(input.image)) {
      errors.image = "URL de la imagen no es válida";
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

/* import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getPokemons } from "../../redux/actions/actions";
import { getType } from "../../redux/actions/actions";
import { URL } from "../../redux/actions/actions"; */
/* FORM PAGE |: en esta vista se encontrará el formulario para crear un nuevo pokemon.

Este formulario debe ser controlado completamente con JavaScritp. No se pueden utilizar validaciones HTML, ni utilizar librerías especiales para esto. Debe contar con los siguientes campos:

Nombre.
Imagen.
Vida.
Ataque.
Defensa.
Velocidad (si tiene).
Altura (si tiene).
Peso (si tiene).
Posibilidad de seleccionar/agregar varios tipos en simultáneo.
Botón para crear el nuevo pokemon.
[IMPORANTE]: es requisito que el formulario de creación esté validado sólo con JavaScript. Puedes agregar las validaciones que consideres. Por ejemplo: que el nombre del pokemon no pueda contener números, o que la defensa no pueda exceder determinado valor, etc. */
/* function CreatePokemon() {
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
    types: [],
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
    }, [created]); //el created dentro del array me sirve para que se ejecute el useEffect cuando se crea un pokemon
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
            setSendTypes([...sendTypes, e.target.value]);
        }
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (Object.values(errors).length > 0) {
            alert("No se pudo crear el pokemon");
        } else {
            setCreated(form);
            alert("Pokemon creado con exito");
        }
    }

    function handleDelete(e) {
        setSendTypes(sendTypes.filter((type) => type !== e.target.value));
    }

    function validate(input) {


        


}
 */
