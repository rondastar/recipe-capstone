import { useState } from "react";

function TemperatureConverter() {
  const [celsius, setCelsius] = useState("");
  const [fahrenheit, setFahrenheit] = useState("");

  const handleConvertCToF = (value) => {
    const convertedTemp = Math.round((value * 9) / 5 + 32);
    setFahrenheit(convertedTemp);
  };

  return (
    <div className="container">
      <div className="card">
        <h3 className="card-title">Temperature Converter</h3>
        <div className="card-body">
          <p>
            Enter temperature in Celsius or Fahrenheit, then click away to view
            converted temperature.
          </p>
          <p>Converter rounds to nearest degree.</p>
          <label>
            Celsius:
            <input
              type="number"
              value={celsius}
              onChange={(e) => setCelsius(e.target.value)}
              onBlur={(e) => handleConvertCToF(e.target.value)}
            />
          </label>
          <label>
            Fahrenheit:
            <input
              type="number"
              value={fahrenheit}
              onChange={(e) => setFahrenheit(e.target.value)}
              onBlur={(e) => {
                const convertedTemp = Math.round(
                  ((e.target.value - 32) * 5) / 9
                );
                setCelsius(convertedTemp);
              }}
            />
          </label>
        </div>
      </div>
    </div>
  );
}

export default TemperatureConverter;
