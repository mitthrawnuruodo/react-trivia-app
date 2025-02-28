/*
  Trivia.jsx
  ===========
  This component implements a simple trivia game.
  It fetches a set of trivia questions from an external API and displays them one at a time.
  Users select answers, and the component keeps track of the score.
  After the last question, the final score is displayed with an option to restart the game.
*/

import { useState, useEffect } from 'react';
import useAPI from '../hooks/useAPI';

const Trivia = () => {
  // Define the number of trivia questions to fetch.
  const numberOfQuestions = 5;

  // useAPI hook fetches trivia questions from the API.
  const { data, loading, error } = useAPI(`https://opentdb.com/api.php?amount=${numberOfQuestions}`);

  // Track the index of the current question.
  const [currentQuestion, setCurrentQuestion] = useState(0);
  // Track the user's score.
  const [score, setScore] = useState(0);
  // Track the user's selected answer for the current question.
  const [selected, setSelected] = useState(null);
  // Hold the shuffled list of answer options (combining correct and incorrect answers).
  const [shuffledOptions, setShuffledOptions] = useState([]);

  // Utility function to shuffle an array.
  const shuffleArray = (array) => array.sort(() => Math.random() - 0.5);

  // useEffect to prepare the options for the current question whenever data or currentQuestion changes.
  useEffect(() => {
    // Ensure data exists, contains results, and that the current question index is valid.
    if (data && data.results && data.results.length > 0 && currentQuestion < data.results.length) {
      const question = data.results[currentQuestion];
      // Combine incorrect answers with the correct answer.
      const options = [...question.incorrect_answers, question.correct_answer];
      // Randomize the order of the options.
      setShuffledOptions(shuffleArray(options));
    }
  }, [data, currentQuestion]);

  // Function to handle user's answer selection.
  const handleAnswer = (option) => {
    // Save the selected option to disable further selections.
    setSelected(option);
    const question = data.results[currentQuestion];
    // Increase the score if the answer is correct.
    if (option === question.correct_answer) {
      setScore((prevScore) => prevScore + 1);
    }
  };

  // Move to the next question.
  const nextQuestion = () => {
    // Reset the selected answer.
    setSelected(null);
    // Increment the current question index.
    setCurrentQuestion((prev) => prev + 1);
  };

  // Function to reset the game.
  // Here, the page is reloaded, but state could be reset manually as an alternative.
  const resetGame = () => {
    window.location.reload();
    // Alternatively, reset the state variables:
    // setCurrentQuestion(0);
    // setScore(0);
    // setSelected(null);
  };

  // Display a loading message while the API call is in progress.
  if (loading) return <p>Loading trivia questions...</p>;
  // Display an error message if the API call fails.
  if (error) return <p>Error loading trivia questions.</p>;

  // When all questions have been answered, display the final score and a button to start a new game.
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

  // Retrieve the current question object.
  const question = data.results[currentQuestion];

  return (
    <div className="trivia">
      <h2>
        Question {currentQuestion + 1} of {numberOfQuestions}
      </h2>
      {/* Display the question text. 'dangerouslySetInnerHTML' is used to render any HTML content included in the question */}
      <p dangerouslySetInnerHTML={{ __html: question.question }} />
      <div className="options">
        {/* Render each answer option as a button; disable all buttons once an option is selected */}
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
      {/* Once an answer is selected, provide feedback and a button to move to the next question */}
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
