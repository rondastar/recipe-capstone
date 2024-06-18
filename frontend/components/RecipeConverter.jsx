import { useState } from "react";
import RecipeInput from "./RecipeInput";
import ConvertedRecipeDisplay from "./ConvertedRecipeDisplay";

function RecipeConverter() {
  const [parsedIngredientLines, setParsedIngredientLines] = useState([]);
  const [isParsingComplete, setIsParsingComplete] = useState(false);
  return (
    <div className="card">
      <h2 className="card-title">Ingredient Converter</h2>
      <div className="split-card-container">
        <RecipeInput
          parsedIngredientLines={parsedIngredientLines}
          setParsedIngredientLines={setParsedIngredientLines}
          isParsingComplete={isParsingComplete}
          setIsParsingComplete={setIsParsingComplete}
        />
        <ConvertedRecipeDisplay
          parsedIngredientLines={parsedIngredientLines}
          isParsingComplete={isParsingComplete}
        />
      </div>
    </div>
  );
}

export default RecipeConverter;
