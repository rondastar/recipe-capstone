import { useState, useRef } from "react";

// Child component of RecipeInput
function ConvertedRecipeDisplay({ ingredientLines }) {
  //   const [parsedIngredientLines, setParsedIngredientLines] = useState([]);

  //   const handleIngredientLineParse = (ingredientLines) => {
  //     ingredientLines.forEach((il) => {});
  //   };

  return (
    <div className="card">
      {/* <label htmlFor={recipeInput}>Converted ingredient list:</label>
      <textarea
        id="converted-recipe-display"
        name="converted-recipe-display"
        value={convertedRecipeDisplay}
        onChange={(e) => setRecipeInput(e.target.value)}
        rows="20"
        cols="50"
      ></textarea> */}
      {ingredientLines}
    </div>
  );
}

export default ConvertedRecipeDisplay;
