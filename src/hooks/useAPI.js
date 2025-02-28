/*
  useAPI.js
  ===========
  This custom React hook is responsible for fetching data from a provided API endpoint.
  It manages three key states: 'data' for the API response, 'loading' to indicate the fetch status,
  and 'error' to capture any issues that occur during the request.
  The hook uses the 'useEffect' hook to trigger the fetch whenever the URL changes.
*/

import { useState, useEffect } from 'react';

const useAPI = (url) => {
  // 'data' will hold the response from the API once fetched.
  const [data, setData] = useState(null);
  // 'loading' indicates whether the fetch operation is in progress.
  const [loading, setLoading] = useState(true);
  // 'error' will capture any errors that occur during the fetch.
  const [error, setError] = useState(null);

  // useEffect runs the fetch operation when the 'url' changes.
  useEffect(() => {
    // Begin fetch by setting loading to true.
    setLoading(true);
    // Perform the GET request to the specified URL.
    fetch(url)
      .then((response) => {
        // If the response is not successful, throw an error to be caught later.
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        // Parse the response as JSON.
        return response.json();
      })
      .then((json) => {
        // On successful fetch, update 'data' with the JSON response.
        setData(json);
        // Set 'loading' to false as the fetch is complete.
        setLoading(false);
      })
      .catch((error) => {
        // If an error occurs, capture it in the 'error' state.
        setError(error);
        // Also set 'loading' to false since the operation is complete.
        setLoading(false);
      });
  }, [url]); // The effect re-runs only if the 'url' changes.

  // Return the data, loading status, and any error encountered.
  return { data, loading, error };
};

export default useAPI;
