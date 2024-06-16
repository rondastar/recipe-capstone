const express = require("express");
const router = express.Router();
const {
  getIngredients,
  addIngredient,
  updateIngredient,
  deleteIngredient,
  getIngredientByName,
  getIngredientGPCByName,
} = require("../controllers/ingredientController");

router.route("/").get(getIngredients).post(addIngredient);
// router.get("/", getIngredients);
// router.post("/", createIngredient);

// gets entire ingredient document
router.get("/:name", getIngredientByName);

// gets only the id, name, and grams per cup
router.get("/gpc/:name", getIngredientGPCByName);

router.route("/:id").put(updateIngredient).delete(deleteIngredient);
// router.put("/:id", updateIngredient);
// router.delete("/:id", deleteIngredient);

module.exports = router;
