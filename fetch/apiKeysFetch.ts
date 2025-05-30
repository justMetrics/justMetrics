import { useCallback, useState } from 'react';

//?  Custom hook for handling API key submission to AWS-related endpoints

//?  Return an object including:
//?   - response: AWS API response data (null until request succeeds)
//?   - error: Any error message (null until request fails)
//?   - sendApiKeys: Function to trigger the API request

const useApiKeysFetch = () => {
  // State management for API response and errors
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  // Sends credentialsm and region to the specified url - api/awsmodelcreation.ts
  const sendApiKeys = useCallback(
    async (
      url: string,
      awsAccessKey: string | number,
      secretAccessKey: string | number,
      region: string
    ): Promise<any> => {
      try {
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
        if (!res.ok) throw new Error(`Error ${res.status}: ${res.statusText}`);

        // Process successful response
        const data = await res.json();
        setResponse(data.res);
      } catch (error: any) {
        setError(error.message);
      }
    },
    []
  );

  return { response, error, sendApiKeys };
};

export default useApiKeysFetch;
