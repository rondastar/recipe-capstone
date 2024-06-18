import { useState } from "react";
import RecipeInput from "./RecipeInput";
import ConvertedRecipeDisplay from "./ConvertedRecipeDisplay";

function RecipeConverter() {
  const [parsedIngredientLines, setParsedIngredientLines] = useState([]);
  const [isParsingComplete, setIsParsingComplete] = useState(false);
  return (
    <div className="converter-container">
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
  );
}

export default RecipeConverter;
