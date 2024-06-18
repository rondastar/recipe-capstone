import { useState, useRef, useEffect } from "react";
import axios from "axios";

function RecipeInput({
  parsedIngredientLines,
  setParsedIngredientLines,
  isParsingComplete,
  setIsParsingComplete,
}) {
  const [ingredientLines, setIngredientLines] = useState([]);
  // const [isFetchingGPCComplete, setIsFetchingGPCComplete] = useState(false);
  // const [ingredientData, setIngredientData] = useState();

  // const [ingredientsWithGPCData, setingredientsWithGPCData] = useState([]);
  const [ingredientsData, setIngredientsData] = useState([]);

  // resets state variables to default
  const reset = () => {
    setIngredientLines([]);
    setParsedIngredientLines([]);
    setIsParsingComplete(false);
    // setIsFetchingGPCComplete(false);
    // setingredientsWithGPCData([]);
    // setIngredientsData([]); // Don't reset this because it can be reused between recipes
  };

  // get all ingredient data from mongoDB - THIS WORKS!!
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/ingredients")
      .then((response) => setIngredientsData(response.data))
      .catch((error) => console.error(error));
  }, []);
  // useEffect(() => {
  //   console.log(ingredientsData);
  // }, [ingredientsData]);

  // used to access the textarea value
  const ref = useRef(null);

  // splits each line from textarea into a separate ingredientLine
  const handleClick = (e) => {
    reset();
    const recipeInput = ref.current.value; // access textarea value

    // split lines to separate ingredient information
    const recipeLines = recipeInput.split("\n");
    setIngredientLines(recipeLines);
  };

  let uniqueId = 1000; // used in parseIngredientLine
  useEffect(() => {
    // making sure ingredientLines saved
    // console.log(ingredientLines);
    ingredientLines.map((line) => parseIngredientLine(line));
  }, [ingredientLines]);

  const parseIngredientLine = (line) => {
    // Assign id to each recipeLine and convert to object
    // let uniqueId = 1000;
    let splitLine = line.split(" "); // consider updating this so that words is not stored in object
    if (line !== "") {
      let lineObject = {
        id: uniqueId++,
        text: line, // used to preserve original text for ingredients that are not converted
        words: splitLine, // used to parse ingredients for unit and quantity conversion
        qtyType: "unknown",
        qtyWholeNum: 0, // default 0
        qtyNumerator: 0, // default 0
        qtyDenominator: 1, // default 1
        unit: null, // assigned as ingredient line is parsed, if applicable
        unitScale: null, // US or metric
        ingredient: null, // assigned after ingredient line is parsed
        ingredientSearchTerm: null, // used to query ingredient in mongodb
        unitsPerCup: null, // number of units per cup; used to convert from to grams
        gramsPerCup: null,
        parsedToIndex: null, // tracks the last parsed index before ingredient
      };
      line = lineObject;
      // if the first word is a number assign it to  the whole number quantity
      if (!isNaN(line.words[0])) {
        line.qtyWholeNum = Number(line.words[0]);
        line.parsedToIndex = 0;
        // the quantity is a mixed number including whole number and fraction
        if (line.words[1].includes("/")) {
          let fraction = line.words[1].split("/");
          line.qtyType = "mixed";
          line.qtyNumerator = parseInt(fraction[0]);
          line.qtyDenominator = parseInt(fraction[1]);
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
        line.qtyNumerator = parseInt(fraction[0]);
        line.qtyDenominator = parseInt(fraction[1]);
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
        } else if (["c", "cup", "cups"].includes(line.words[1].toLowerCase())) {
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
        line.ingredientSearchTerm = ingredientSearchTerm.toLowerCase();

        // FIND A BETTER WAY TO DO THIS!
        // .... but this does work!!!! Hurray!!!!!!
        ingredientsData.forEach((data) => {
          if (data.name === line.ingredient.toLowerCase()) {
            line.gramsPerCup = data.gramsPerCup;
            return;
          }
        });
      }
      setParsedIngredientLines((parsedIngredientLines) => [
        ...parsedIngredientLines,
        line,
      ]);
    }
    setIsParsingComplete(true);
  };

  // making sure parsedIngredientLines saved -- THIS WORKS!
  useEffect(() => {
    parsedIngredientLines.map((line) => console.log(line));
  }, [parsedIngredientLines, isParsingComplete === true]);

  // // THIS IS NOT WORKING
  // // get grams per cup gpc ingredient data from mongoDB
  // useEffect(() => {
  //   console.log("this ran");
  //   parsedIngredientLines.map((line) => {
  //     console.log(`this ran - ${line.ingredientSearchTerm}`);
  //     let dataGPC = null;
  //     let newLine = line;
  //     //     .get("http://localhost:5000/api/ingredients")
  //     //     .then((response) => setIngredientsData(response.data))
  //     //     .catch((error) => console.error(error));
  //     axios
  //       .get(
  //         `http://localhost:5000/api/ingredients/gpc/${line.ingredientSearchTerm}`
  //       )
  //       .then((response) => setIngredientData(response.data))
  //       .catch((error) => console.error(error));

  //     console.log(`this also ran - ${ingredientData}`);

  //     newLine.gramsPerCup = ingredientData.gramsPerCup;
  //     setIngredientsWithGPCData((ingredientsWithGPCData) => [
  //       ...ingredientsWithGPCData,
  //       newLine,
  //     ]);
  //   });
  //   setIsFetchingGPCComplete(true);
  // }, [parsedIngredientLines, isParsingComplete === true]);

  // // making sure ingredientsWithGPCData saved
  // useEffect(() => {
  //   ingredientsWithGPCData.map((line) => console.log(line));
  //   console.log("this ran too");
  // }, [ingredientsWithGPCData, isFetchingGPCComplete === true]);

  return (
    <div>
      <div className="split-card-body">
        <h3 className="subtitle">Original ingredient list:</h3>
        <label htmlFor="recipeInput"></label>
        <textarea
          id="recipe-input"
          name="recipe-input"
          ref={ref}
          rows="20"
          cols="50"
          placeholder="Enter ingredient list here."
        ></textarea>
        <button onClick={handleClick}>Convert to Grams</button>
      </div>
    </div>
  );
}

export default RecipeInput;
