const asyncHandler = require("express-async-handler");

// @desc   Get ingredients
// @route GET /api/ingredients
// @access ----------- TBD --------------
const getIngredients = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Get ingredients" });
});
// @desc   Create ingredients
// @route POST /api/ingredients
// @access ----------- TBD --------------
const createIngredient = asyncHandler(async (req, res) => {
  // if the request body text does not return OK
  if (!req.body.text) {
    res.status(400);
    throw new Error("Please add a text field");
  }
  res.status(200).json({ message: "Create ingredient" });
});
// @desc   Update ingredients
// @route PUT /api/ingredients/:id
// @access ----------- TBD --------------
const updateIngredient = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `Update ingredient ${req.params.id}` });
});
// @desc   Delete ingredient
// @route DELETE /api/ingredients/:id
// @access ----------- TBD --------------
const deleteIngredient = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `Delete ingredient ${req.params.id}` });
});

module.exports = {
  getIngredients,
  createIngredient,
  updateIngredient,
  deleteIngredient,
};
