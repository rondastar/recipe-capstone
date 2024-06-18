import { useEffect, useState } from "react";

// Child component of RecipeInput
function ConvertedRecipeDisplay({ parsedIngredientLines, isParsingComplete }) {
  const [convertedLines, setConvertedLines] = useState([]);
  // id: uniqueId++,
  // text: line, // used to preserve original text for ingredients that are not converted
  // words: splitLine, // used to parse ingredients for unit and quantity conversion
  // qtyType: "unknown",
  // qtyWholeNum: null, // assigned as ingredient line is parsed, if applicable
  // qtyNumerator: null,
  // qtyDenominator: null,
  // unit: null, // assigned as ingredient line is parsed, if applicable
  // unitScale: null, // US or metric
  // ingredient: null, // assigned after ingredient line is parsed
  // ingredientSearchTerm: null, // used to query ingredient in mongodb
  // unitsPerCup: null, // number of units per cup; used to convert from to grams
  // gramsPerCup: null,
  // parsedToIndex: null, // tracks the last parsed index before ingredient

  useEffect(() => {
    convertUStoMetric();
  }, [parsedIngredientLines, isParsingComplete === true]);

  const clear = () => {
    setConvertedLines([]);
  };

  const convertUStoMetric = () => {
    clear();
    parsedIngredientLines.map((line) => {
      if (
        // If the line couldn't be converted, print the original line
        line.qtyType === "unknown" ||
        line.unit === null ||
        line.unitScale === "metric" ||
        line.gramsPerCup === null
      ) {
        // setParsedIngredientLines((parsedIngredientLines) => [
        //   ...parsedIngredientLines,
        //   line,
        // ]);

        setConvertedLines((convertedLines) => [
          ...convertedLines,
          { id: line.id, display: line.text, color: "red" },
        ]);
        console.log(`This ran too - ${line.text}`);
      } else {
        // If the line can be converted, convert the quantity to grams
        let quantity =
          line.qtyWholeNum + line.qtyNumerator / line.qtyDenominator;
        let upc = line.unitsPerCup;
        let gpc = line.gramsPerCup;
        let grams = Math.floor((quantity / upc) * gpc);
        let text = `${grams} grams ${line.ingredient}`;
        console.log(`This also ran - ${grams} grams ${line.ingredient}`);

        setConvertedLines((convertedLines) => [
          ...convertedLines,
          { id: line.id, display: text, color: "black" },
        ]);
      }
    });
  };

  return (
    <div className="card-container">
      <h2>Converted ingredient list:</h2>
      <div className="card">
        {convertedLines.map((line) => (
          <div key={line.id} style={{ color: `${line.color}` }}>
            <p className="line-display">{line.display}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ConvertedRecipeDisplay;
