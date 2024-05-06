const asyncHandler = require("express-async-handler");

const Ingredient = require("../models/ingredientModel");

// @desc   Get ingredients
// @route GET /api/ingredients
// @access ----------- TBD --------------
const getIngredients = asyncHandler(async (req, res) => {
  const ingredients = await Ingredient.find();
  res.status(200).json(ingredients);
});
// @desc   Create ingredients
// @route POST /api/ingredients
// @access ----------- TBD --------------
const addIngredient = asyncHandler(async (req, res) => {
  // if the request body text does not return OK
  if (!req.body.name) {
    res.status(400);
    throw new Error("Please add a name field");
  }
  const ingredient = await Ingredient.create({
    name: req.body.name,
    gramsPerCup: req.body.gpc,
  });
  res.status(200).json(ingredient);
});
// @desc   Update ingredients
// @route PUT /api/ingredients/:id
// @access ----------- TBD --------------
const updateIngredient = asyncHandler(async (req, res) => {
  const ingredient = await Ingredient.findByID(req.params.id);
  if (!ingredient) {
    res.status(400);
    throw new Error("Ingredient not found");
  }
  const updatedIngredient = await Ingredient.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.status(200).json(updatedIngredient);
});
// @desc   Delete ingredient
// @route DELETE /api/ingredients/:id
// @access ----------- TBD --------------
const deleteIngredient = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `Delete ingredient ${req.params.id}` });
});

module.exports = {
  getIngredients,
  addIngredient,
  updateIngredient,
  deleteIngredient,
};
