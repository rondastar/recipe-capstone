const express = require("express");
const router = express.Router();
const {
  getIngredients,
  createIngredient,
  updateIngredient,
  deleteIngredient,
} = require("../controllers/ingredientController");

router.route("/").get(getIngredients).post(createIngredient);
// router.get("/", getIngredients);
// router.post("/", createIngredient);

router.route("/:id").put(updateIngredient).delete(deleteIngredient);
// router.put("/:id", updateIngredient);
// router.delete("/:id", deleteIngredient);

module.exports = router;
