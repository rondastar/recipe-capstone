const mongoose = require("mongoose");

const ingredientSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add ingredient name"],
    },
    gramsPerCup: {
      type: Number,
      required: [false],
    },
  },
  {
    timestamps: Date.now,
  }
);

module.exports = mongoose.model("Ingredient", ingredientSchema);
