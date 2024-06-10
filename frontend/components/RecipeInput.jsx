import { useState, useRef, useContext, createContext } from "react";
import ConvertedRecipeDisplay from "./ConvertedRecipeDisplay";

function RecipeInput() {
  const recipeContext = createContext(null);

  // array of ingredient line objects including id, full line text, and text split by spaces
  const [ingredientLines, setIngredientLines] = useState([]);
  const [ingredientData, setIngredientData] = useState([]);

  // used to access the textarea value
  const ref = useRef(null);

  // splits each line from textarea into a separate object in ingredientLine
  const handleClick = (e) => {
    const recipeInput = ref.current.value; // access textarea value

    // split lines to separate ingredient information
    const recipeLines = recipeInput.split("\n");

    // Assign id to each recipeLine and convert to object
    let uniqueId = 1000;
    recipeLines.forEach((line) => {
      let splitLine = line.split(" "); // consider updating this so that words is not stored in object
      if (line !== "") {
        let lineObject = {
          id: uniqueId++,
          text: line, // used to preserve original text for ingredients that are not converted
          words: splitLine, // used to parse ingredients for unit and quantity conversion
          qtyType: "unknown",
          qtyWholeNum: null, // assigned as ingredient line is parsed, if applicable
          qtyNumerator: null,
          qtyDenominator: null,
          unit: null, // assigned as ingredient line is parsed, if applicable
          unitScale: null,
          ingredient: null, // assigned after ingredient line is parsed
          unitsPerCup: null, // number of units per cup; used to convert from to grams
          gramsPerCup: null,
        };
        line = lineObject;
        // if the first word is a number assign it to  the whole number quantity
        if (!isNaN(line.words[0])) {
          line.qtyWholeNum = line.words[0];
          // if the second word is a fraction
          // the quantity is a mixed number including whole number and fraction
          if (line.words[1].includes("/")) {
            let fraction = line.words[1].split("/");
            line.qtyType = "mixed";
            line.qtyNumerator = fraction[0];
            line.qtyDenominator = fraction[1];
            // parse unit and update corresponding properties
            if (
              line.words[2] === "T" ||
              ["tbsp", "tablespoon", "tablespoons"].includes(
                line.words[2].toLowerCase()
              )
            ) {
              line.unit = "tablespoon";
              line.unitsPerCup = 16;
              line.unitScale = "US";
            } else if (
              ["t", "tsp", "teaspoon", "teaspoons"].includes(
                line.words[2].toLowerCase()
              )
            ) {
              line.unit = "teaspoon";
              line.unitsPerCup = 48.7;
              line.unitScale = "US";
            } else if (
              ["c", "cup", "cups"].includes(line.words[2].toLowerCase())
            ) {
              line.unit = "cup";
              line.unitsPerCup = 1;
              line.unitScale = "US";
            } else if (
              ["g", "gram", "grams"].includes(line.words[2].toLowerCase())
            ) {
              line.unit = "gram";
              line.unitScale = "metric";
            }
          } else {
            // make the quantity type whole if it is a number not followed by a fraction
            // this could also include decimals; not relevant since it does not affect calculations
            line.qtyType = "whole";
            // assume the following word is unit
            line.unit = line.words[1];
          }
        } else if (line.words[0].includes("/")) {
          // The first word is a fraction, so the quantity type is a fraction
          let fraction = line.words[0].split("/");
          line.qtyType = "fraction";
          line.qtyNumerator = fraction[0];
          line.qtyDenominator = fraction[1];
        } else {
          // The first word is NOT a number
          line.qtyType = "NaN";
        }
      }
      console.log(line);
    });
    // setIngredientLines(recipeLines);
    // parseIngredientLine(recipeLines);
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
