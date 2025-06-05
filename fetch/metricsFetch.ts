import { useCallback, useState } from 'react';

// import type
import { instanceMetricbody } from '../types/componentsTypes'

// api keys POST request
const useMetricsFetch = () => {
  // create usestats
  const [response, setResponse] = useState(null);
  const [error, setError] = useState<null | string>(null);

  // create POST request for api keys
  const sendMetricsRequest = useCallback(
    async (
      //!change out the async function to support metric request
      url: string,
      instanceMetricbody: instanceMetricbody
    ): Promise<void> => {
      try {
        // deconstruct instanceMetricBody
        const { metrics, instances, credentials, region } = instanceMetricbody;

        const res = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            //!frontend to pass in instanceMetricbody object
            instanceIds: instances,
            requestedMetrics: metrics,
            awsAccessKey: credentials[0],
            secretKey: credentials[1],
            region:region
          }),
        });

        if (!res.ok) throw new Error(`Error ${res.status}: ${res.statusText}`);

        const data = await res.json();

        setResponse(data.res);
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('An unkown error occured');
        }  
      }
    },
    []
  );

  return { response, error, sendMetricsRequest };
};

export default useMetricsFetch;
