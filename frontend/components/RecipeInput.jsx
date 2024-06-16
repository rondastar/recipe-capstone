import { useState, useRef, useEffect } from "react";
import axios from "axios";
import ConvertedRecipeDisplay from "./ConvertedRecipeDisplay";

function RecipeInput() {
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
          ingredientSearchTerm: null, // used to query ingredient in mongodb
          unitsPerCup: null, // number of units per cup; used to convert from to grams
          gramsPerCup: null,
          parsedToIndex: null, // tracks the last parsed index before ingredient
          data: null,
        };
        line = lineObject;
        // if the first word is a number assign it to  the whole number quantity
        if (!isNaN(line.words[0])) {
          line.qtyWholeNum = line.words[0];
          line.parsedToIndex = 0;
          // the quantity is a mixed number including whole number and fraction
          if (line.words[1].includes("/")) {
            let fraction = line.words[1].split("/");
            line.qtyType = "mixed";
            line.qtyNumerator = fraction[0];
            line.qtyDenominator = fraction[1];
            // parse unit and update corresponding properties
            line.parsedToIndex = 0;
            if (
              line.words[2] === "T" ||
              ["tbsp", "tablespoon", "tablespoons"].includes(
                line.words[2].toLowerCase()
              )
            ) {
              line.unit = "tablespoon";
              line.unitsPerCup = 16;
              line.unitScale = "US";
              line.parsedToIndex = 2;
            } else if (
              ["t", "tsp", "teaspoon", "teaspoons"].includes(
                line.words[2].toLowerCase()
              )
            ) {
              line.unit = "teaspoon";
              line.unitsPerCup = 48.7;
              line.unitScale = "US";
              line.parsedToIndex = 2;
            } else if (
              ["c", "cup", "cups"].includes(line.words[2].toLowerCase())
            ) {
              line.unit = "cup";
              line.unitsPerCup = 1;
              line.unitScale = "US";
              line.parsedToIndex = 2;
            } else if (
              ["g", "gram", "grams"].includes(line.words[2].toLowerCase())
            ) {
              line.unit = "gram";
              line.unitScale = "metric";
              line.parsedToIndex = 2;
            }
          } else {
            // make the quantity type whole if it is a number not followed by a fraction
            // this could also include decimals; not relevant since it does not affect calculations
            line.qtyType = "whole";
            line.parsedToIndex = 0;
            // parse the next word to determine unit
            if (
              line.words[1] === "T" ||
              ["tbsp", "tablespoon", "tablespoons"].includes(
                line.words[1].toLowerCase()
              )
            ) {
              line.unit = "tablespoon";
              line.unitsPerCup = 16;
              line.unitScale = "US";
              line.parsedToIndex = 1;
            } else if (
              ["t", "tsp", "teaspoon", "teaspoons"].includes(
                line.words[1].toLowerCase()
              )
            ) {
              line.unit = "teaspoon";
              line.unitsPerCup = 48.7;
              line.unitScale = "US";
              line.parsedToIndex = 1;
            } else if (
              ["c", "cup", "cups"].includes(line.words[1].toLowerCase())
            ) {
              line.unit = "cup";
              line.unitsPerCup = 1;
              line.unitScale = "US";
              line.parsedToIndex = 1;
            } else if (
              ["g", "gram", "grams"].includes(line.words[1].toLowerCase())
            ) {
              line.unit = "gram";
              line.unitScale = "metric";
              line.parsedToIndex = 1;
            }
          }
        } else if (line.words[0].includes("/")) {
          // The first word is a fraction, so the quantity type is a fraction
          let fraction = line.words[0].split("/");
          line.qtyType = "fraction";
          line.qtyNumerator = fraction[0];
          line.qtyDenominator = fraction[1];
          line.parsedToIndex = 0;
          if (
            line.words[1] === "T" ||
            ["tbsp", "tablespoon", "tablespoons"].includes(
              line.words[1].toLowerCase()
            )
          ) {
            line.unit = "tablespoon";
            line.unitsPerCup = 16;
            line.unitScale = "US";
            line.parsedToIndex = 1;
          } else if (
            ["t", "tsp", "teaspoon", "teaspoons"].includes(
              line.words[1].toLowerCase()
            )
          ) {
            line.unit = "teaspoon";
            line.unitsPerCup = 48.7;
            line.unitScale = "US";
            line.parsedToIndex = 1;
          } else if (
            ["c", "cup", "cups"].includes(line.words[1].toLowerCase())
          ) {
            line.unit = "cup";
            line.unitsPerCup = 1;
            line.unitScale = "US";
            line.parsedToIndex = 1;
          } else if (
            ["g", "gram", "grams"].includes(line.words[1].toLowerCase())
          ) {
            line.unit = "gram";
            line.unitScale = "metric";
            line.parsedToIndex = 1;
          }
        } else {
          // The first word is NOT a number
          line.qtyType = "NaN";
        }
        // parse ingredient if unit or quantity has been parsed
        if (line.parsedToIndex !== null) {
          let ingredient = "";
          let ingredientSearchTerm = "";
          for (let i = line.parsedToIndex + 1; i < line.words.length; i++) {
            if (i + 1 < line.words.length) {
              ingredient += `${line.words[i]} `;
              ingredientSearchTerm += `${line.words[i]}%20`;
            } else {
              ingredient += line.words[i];
              ingredientSearchTerm += line.words[i];
            }
          }
          line.ingredient = ingredient;
          line.ingredientSearchTerm = ingredientSearchTerm;
        }
      }
      console.log(line);
    });

    setIngredientLines(recipeLines);
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
      <ConvertedRecipeDisplay ingredientLines={ingredientLines} />
    </div>
  );
}

export default RecipeInput;
