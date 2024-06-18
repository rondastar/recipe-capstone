import "./App.css";
import RecipeConverter from "../components/RecipeConverter";
import TemperatureConverter from "../components/TemperatureConverter";

function App() {
  return (
    <div className="app">
      <h1 className="app-title">Recipe Converter</h1>
      <div className="app-body">
        <RecipeConverter />
        <TemperatureConverter />
      </div>
    </div>
  );
}

export default App;
