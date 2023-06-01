const { Type } = require("../db.js");

const postType = async (req, res) => {
  const newType = req.body;

  try {
    const createdType = await Type.create({
      name: newType.name,
    });
    res.send(createdType);
  } catch (error) {
    res.status(500).json({ message: "Error al crear el Type" });
  }
};

module.exports = {
  postType,
};
