/*
  Home.jsx
  ===========
  This component serves as the main landing page for the React single-page application.
  It welcomes the user, provides navigation to the Trivia game, and displays a random "useless fact"
  fetched from an external API. A "reload" state is used to force the API hook to re-fetch a new fact.
*/

import { useState } from 'react';
import { Link } from 'react-router';
import useAPI from '../hooks/useAPI';

const Home = () => {
  // 'reload' state is used to force the API hook to re-run by changing the query URL.
  const [reload, setReload] = useState(0);

  // useAPI custom hook fetches data from the given URL.
  // The URL includes a reload parameter so that updating it triggers a new API request.
  const { data, loading, error } = useAPI(
    `https://uselessfacts.jsph.pl/api/v2/facts/random?language=en&_reload=${reload}`
  );

  // Function to trigger another API call by incrementing the reload state.
  const handleGetAnotherFact = () => {
    setReload((prev) => prev + 1);
  };

  return (
    <section>
      <div className="hero">
        <h1>Welcome to My React SPA!</h1>
        <p>This is a small React single-page application built with Vite.</p>
        {/* Navigation link to the Trivia game page */}
        <Link to="/trivia">
          <button>Play Trivia Game</button>
        </Link>
      </div>
      <div className="useless-fact">
        <h2>Useless Fact</h2>
        {/* Display a loading message while the fact is being fetched */}
        {loading && <p>Loading fact...</p>}
        {/* Show an error message if the API call fails */}
        {error && <p>Error loading fact.</p>}
        {/* Once data is available, display the fact text */}
        {data && <p>{data.text}</p>}
        {/* Button that triggers fetching another fact */}
        <button onClick={handleGetAnotherFact}>
          Get another useless fact
        </button>
      </div>
    </section>
  );
};

export default Home;
