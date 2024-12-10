import React, { useState } from "react";
import axios from "axios";

const TranslateTest = () => {
  const [address, setAddress] = useState("");
  const [coordinates, setCoordinates] = useState(null);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/search`,
        {
          params: {
            q: address,
            format: "json",
          },
        }
      );

      if (response.data.length > 0) {
        const location = response.data[0];
        setCoordinates({ lat: location.lat, lon: location.lon });
        setError("");
      } else {
        setError("Indirizzo non trovato.");
      }
    } catch (err) {
      console.error(err);
      setError("Si è verificato un errore.");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Inserisci un indirizzo"
        />
        <button type="submit">Converti</button>
      </form>
      {coordinates && (
        <p>
          Latitudine: {coordinates.lat}, Longitudine: {coordinates.lon}
        </p>
      )}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default TranslateTest;
