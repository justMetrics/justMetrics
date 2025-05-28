import { useCallback, useState } from 'react';

// create custom type

// api keys POST request
const useApiKeysFetch = () => {
  // create usestats
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  // create POST request for api keys
  const sendApiKeys = useCallback(
    async (
      url: string,
      awsAccessKey: string | number,
      secretAccessKey: string | number,
      region:string,
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
            region:region
          }),
        });

        if (!res.ok) throw new Error(`Error ${res.status}: ${res.statusText}`);

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
