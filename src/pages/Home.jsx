// src/pages/Home.jsx
import { Link } from 'react-router';
import useAPI from '../hooks/useAPI';

const Home = () => {
  const { data, loading, error } = useAPI('https://uselessfacts.jsph.pl/api/v2/facts/random?language=en');

  return (
    <section>
      <div className="hero">
        <h1>Welcome to My React SPA!</h1>
        <p>This is a small React single-page application built with Vite.</p>
        <Link to="/trivia">
          <button>Play Trivia Game</button>
        </Link>
      </div>
      <div className="useless-fact">
        <h2>Useless Fact</h2>
        {loading && <p>Loading fact...</p>}
        {error && <p>Error loading fact.</p>}
        {data && <p>{data.text}</p>}
      </div>
    </section>
  );
};

export default Home;
