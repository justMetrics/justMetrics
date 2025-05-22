import { useCallback, useState } from 'react';

// create custom type

// api keys POST request
const useMetricsFetch = () => {
  // create usestats
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  // create POST request for api keys
  const sendMetricsRequest = useCallback(
    async ( //!change out the async function to support metric request
      url: string,
      instanceMetricbody: any,
    ): Promise<any> => {
      try {
        // deconstruct instanceMetricBody
        const { metrics, instances, credentials } = instanceMetricbody;
        
        const res = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ //!frontend to pass in instanceMetricbody object
            instanceIds: instances,
            requestedMetrics: metrics,
            awsAccessKey: credentials[0],
            secretKey: credentials[1]
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

  return { response, error, sendMetricsRequest };
};

export default useMetricsFetch;
