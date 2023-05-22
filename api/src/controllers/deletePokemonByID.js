const { Pokemon } = require("../db");

const deletePokemonById = async (req, res, next) => {
  const { id } = req.params;

  try {
    // Comprueba si el ID es mayor que 1200 (para evitar la eliminación de los Pokemon de la API)
    if (id <= 1200) {
      return res.status(400).json({ message: "Cannot delete API Pokemon" });
    }

    const deleted = await Pokemon.destroy({
      where: {
        id: id,
      },
    });

    if (deleted) {
      return res
        .status(200)
        .json({ message: `Pokemon id ${id} deleted successfully` });
    } else {
      return res.status(404).json({ message: "Pokemon not found" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

module.exports = { deletePokemonById };
