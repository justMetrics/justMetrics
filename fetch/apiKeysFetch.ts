import { useCallback, useState } from 'react';

// Custom hook to handle API requests for submitting AWS credentials and region

// The hook returns:
// - response: the result of a successful API call (or null before success)
// - error: error message from a failed request (or null before failure)
// - sendApiKeys: the function to perform the POST request with given credentials and region

const useApiKeysFetch = () => {
  // State to store successful response data
  const [response, setResponse] = useState(null);
  // State to capture error
  const [error, setError] = useState(null);

  // A function to send credentialsm and region to the backend
  const sendApiKeys = useCallback(
    async (
      url: string, // The backend endpoint
      awsAccessKey: string | number, // AWS Access Key provided by the user
      secretAccessKey: string | number, // AWS Secret Access Key provided by the user
      region: string // AWS region
    ): Promise<any> => {
      try {
        // Perform the POST request with the user's AWS credentials and selected region
        const res = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            accessKey: awsAccessKey,
            secretKey: secretAccessKey,
            region: region,
          }),
        });

        // Handle HTTP errors
        // If the server responds is not ok, throw an error
        if (!res.ok) throw new Error(`Error ${res.status}: ${res.statusText}`);

        // Parse the response and store the result in state for front end to use
        const data = await res.json();
        setResponse(data.res);
      } catch (error: any) {
        // If any error occurs (e.g., network issues, bad credentials), store it in state
        setError(error.message);
      }
    },
    [] // Dependencies are empty so the function identity remains stable across renders
  );

  // Return the response, error, and the callback function to frontend components using this hook
  return { response, error, sendApiKeys };
};

export default useApiKeysFetch;
