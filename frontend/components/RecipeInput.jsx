import { useState, useRef } from "react";

function RecipeInput() {
  const ref = useRef(null);
  const [ingredientLines, setIngredientLines] = useState([]);
  const handleClick = (e) => {
    // access textarea value
    const recipeInput = ref.current.value;

    // split recipe input textarea by lines
    const recipeInputLines = recipeInput.split("\n");

    // store the split recipe input lines in ingredientLines
    setIngredientLines(recipeInputLines);
    console.log(ingredientLines);
  };
  return (
    // <div className="component-body">
    //   <label htmlFor={recipeInput}>Original ingredient list:</label>
    //   <textarea
    //     id="recipe-input"
    //     name="recipe-input"
    //     value={recipeInput}
    //     onChange={(e) => setRecipeInput(e.target.value)}
    //     rows="20"
    //     cols="50"
    //     placeholder="Enter ingredient list here."
    //   ></textarea>
    //   {/* <button onClick={handleClick}>Convert Recipe</button> */}
    // </div>
    <div className="component-body">
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
  );
}

export default RecipeInput;
