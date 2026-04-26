import { useState, useEffect } from "react";

import "./App.css";

const CATEGORIES = ["gods", "heroes", "monsters", "titans"];

function App() {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const baseURL = "https://thegreekmythapi.vercel.app/";

  useEffect(() => {
    async function getAPI() {
      setLoading(true);
      setError(null);
      try {
        const results = await Promise.all(
          CATEGORIES.map((cat) =>
            fetch(`${baseURL}api/${cat}`).then((r) => r.json()),
          ),
        );
        const mapped = Object.fromEntries(
          CATEGORIES.map((cat, i) => [cat, results[i]]),
        );
        setData(mapped);
        CATEGORIES.forEach((cat, i) => console.log(cat, results[i]));
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    }

    getAPI();
  }, []);

  return (
    <>
      <section id="center">
        <h1>Greek Myth Characters</h1>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            {CATEGORIES.map((cat) => (
              <div key={cat} style={{ minWidth: "150px" }}>
                <h2 style={{ textTransform: "capitalize" }}>{cat}</h2>
                {data[cat] ? (
                  <ul>
                    {data[cat].slice(0, 5).map((item, i) => (
                      <li key={i}>{item.name ?? JSON.stringify(item)}</li>
                    ))}
                  </ul>
                ) : (
                  <p style={{ color: "gray" }}>—</p>
                )}
              </div>
            ))}
          </div>
        )}

        {error && <p style={{ color: "red" }}>Error: {error}</p>}
      </section>

      <div className="ticks"></div>
      <section id="spacer"></section>
    </>
  );
}

export default App;
