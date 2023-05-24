const validate = (input) => {
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
  } else if (Number(input.hp) >= 100) {
    errors.hp = "Vida debe ser menor a 100";
  }

  if (!input.attack) {
    errors.attack = "Ataque es requerido";
  } else if (
    isNaN(Number(input.attack)) ||
    !Number.isInteger(Number(input.attack))
  ) {
    errors.attack = "Ataque debe ser un número entero";
  } else if (Number(input.attack) >= 100) {
    errors.attack = "Ataque debe ser menor a 100";
  }

  if (!input.defense) {
    errors.defense = "Defensa es requerida";
  } else if (
    isNaN(Number(input.defense)) ||
    !Number.isInteger(Number(input.defense))
  ) {
    errors.defense = "Defensa debe ser un número entero";
  } else if (Number(input.defense) >= 100) {
    errors.defense = "Defensa debe ser menor a 100";
  }

  if (!input.speed) {
    errors.speed = "Velocidad es requerida";
  } else if (
    isNaN(Number(input.speed)) ||
    !Number.isInteger(Number(input.speed))
  ) {
    errors.speed = "Velocidad debe ser un número entero";
  } else if (Number(input.speed) >= 100) {
    errors.speed = "Velocidad debe ser menor a 100";
  }

  if (!input.height) {
    errors.height = "Altura es requerida";
  } else if (
    isNaN(Number(input.height)) ||
    !Number.isInteger(Number(input.height))
  ) {
    errors.height = "Altura debe ser un número entero";
  } else if (Number(input.height) > 31) {
    errors.height = "Altura debe ser menor a 30";
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
};

export default validate;
