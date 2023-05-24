import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPokemons, getType, createPokemon } from "../redux/actions/actions";

const usePokemonForm = (validate) => {
  const dispatch = useDispatch();
  const types = useSelector((state) => state.types);
  const pokemons = useSelector((state) => state.pokemons);
  const [openMenu, setOpenMenu] = useState(false);
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
    if (types.length === 0 && pokemons.length === 0) {
      dispatch(getType());
      dispatch(getPokemons());
    }
  }, []);

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
  return {
    form,
    types,
    handleChange,
    handleBotonMenu,
    handleCheckbox,
    handleDelete,
    handleSubmit,
    errors,
  };
};

export default usePokemonForm;
