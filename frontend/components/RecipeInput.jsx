import { useState, useRef, useContext, createContext } from "react";
import ConvertedRecipeDisplay from "./ConvertedRecipeDisplay";

function RecipeInput() {
  const recipeContext = createContext(null);

  // array of ingredient line objects including id, full line text, and text split by spaces
  const [ingredientLines, setIngredientLines] = useState([]);

  // used to access the textarea value
  const ref = useRef(null);

  const handleClick = (e) => {
    const recipeInput = ref.current.value; // access textarea value

    // split recipe input textarea by lines to separate ingredients
    const recipeLines = recipeInput.split("\n");

    console.log(recipeLines); // continue working with recipeLines in this function

    // Assign id to each recipeLine and convert to object
    let uniqueId = 1000;
    recipeLines.forEach((line) => {
      let splitLine = line.split(" ");
      let lineObject = {
        id: uniqueId++,
        text: line, // used to preserve original text for ingredients that are not converted
        words: splitLine, // used to parse ingredients for unit and quantity conversion
        quantity: null,
        unit: null,
        ingredient: null,
      };
      line = lineObject;
      console.log(line);
    });
    setIngredientLines(recipeLines);
  };
  return (
    <div className="card-container">
      <div className="card">
        <label htmlFor="recipeInput">Original ingredient list:</label>
        <textarea
          id="recipe-input"
          name="recipe-input"
          ref={ref}
          rows="20"
          cols="50"
          placeholder="Enter ingredient list here."
        ></textarea>
        <button onClick={handleClick}>Convert Units</button>
      </div>
      {/* <ConvertedRecipeDisplay ingredientLines={ingredientLines} /> */}
    </div>
  );
}

export default RecipeInput;
