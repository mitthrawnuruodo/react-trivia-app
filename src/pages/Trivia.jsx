// src/pages/Trivia.jsx
import { useState, useEffect } from 'react';
import useAPI from '../hooks/useAPI';

const Trivia = () => {
  const numberOfQuestions = 3;
  const { data, loading, error } = useAPI(`https://opentdb.com/api.php?amount=${numberOfQuestions}`);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState(null);
  const [shuffledOptions, setShuffledOptions] = useState([]);

  // Utility function to shuffle an array
  const shuffleArray = (array) => array.sort(() => Math.random() - 0.5);

  useEffect(() => {
    if (data && data.results && data.results.length > 0 && currentQuestion < data.results.length) {
      const question = data.results[currentQuestion];
      const options = [...question.incorrect_answers, question.correct_answer];
      setShuffledOptions(shuffleArray(options));
    }
  }, [data, currentQuestion]);

  const handleAnswer = (option) => {
    setSelected(option);
    const question = data.results[currentQuestion];
    if (option === question.correct_answer) {
      setScore((prevScore) => prevScore + 1);
    }
  };

  const nextQuestion = () => {
    setSelected(null);
    setCurrentQuestion((prev) => prev + 1);
  };

  // Reset game function that reloads the page
  const resetGame = () => {
    window.location.reload();
    // Alternatively, you could reset the state variables manually:
    // setCurrentQuestion(0);
    // setScore(0);
    // setSelected(null);
  };

  if (loading) return <p>Loading trivia questions...</p>;
  if (error) return <p>Error loading trivia questions.</p>;

  // When game is over, show score and a "New game?" button
  if (data && currentQuestion >= data.results.length) {
    return (
      <div>
        <h2>Game Over</h2>
        <p>
          Your score: {score} / {data.results.length}
        </p>
        <button onClick={resetGame}>New game?</button>
      </div>
    );
  }

  const question = data.results[currentQuestion];

  return (
    <div className="trivia">
      <h2>
        Question {currentQuestion + 1} of {numberOfQuestions}
      </h2>
      <p dangerouslySetInnerHTML={{ __html: question.question }} />
      <div className="options">
        {shuffledOptions.map((option, index) => (
          <button
            key={index}
            onClick={() => handleAnswer(option)}
            disabled={selected !== null}
          >
            <span dangerouslySetInnerHTML={{ __html: option }} />
          </button>
        ))}
      </div>
      {selected && (
        <div>
          {selected === question.correct_answer ? (
            <p>Correct!</p>
          ) : (
            <p>
              Incorrect! The correct answer was{' '}
              <span dangerouslySetInnerHTML={{ __html: question.correct_answer }} />
            </p>
          )}
          <button onClick={nextQuestion}>
            {currentQuestion === data.results.length - 1 ? "See your score" : "Next Question"}
          </button>
        </div>
      )}
    </div>
  );
};

export default Trivia;
