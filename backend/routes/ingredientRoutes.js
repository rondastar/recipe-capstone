const express = require("express");
const router = express.Router();
const {
  getIngredients,
  addIngredient,
  updateIngredient,
  deleteIngredient,
} = require("../controllers/ingredientController");

router.route("/").get(getIngredients).post(addIngredient);
// router.get("/", getIngredients);
// router.post("/", createIngredient);

router.route("/:id").put(updateIngredient).delete(deleteIngredient);
// router.put("/:id", updateIngredient);
// router.delete("/:id", deleteIngredient);

module.exports = router;
