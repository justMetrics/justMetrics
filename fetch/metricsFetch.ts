import { useCallback, useState } from 'react';

// Hook to send POST requests for EC2 CloudWatch metrics
// import type
import { instanceMetricbody } from '../types/componentsTypes';

// api keys POST request
const useMetricsFetch = () => {
  // State to store successful response, allowing consuming components to access metric data
  const [response, setResponse] = useState(null);

  // State to store error messages from failed API calls

  const [error, setError] = useState<null | string>(null);

  // Function to send a metrics request to the backend
  const sendMetricsRequest = useCallback(
    async (
      //!change out the async function to support metric request

      url: string, // Backend API endpoint to send the request to
      instanceMetricbody: instanceMetricbody // Payload containing instances, metrics, credentials, and region
    ): Promise<void> => {
      try {
        // Destruct relevant fields from the request body
        const { metrics, instances, credentials, region } = instanceMetricbody;

        // Construct and send the POST request with relevent fields
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
            region: region,
          }),
        });

        // If the response is not OK, trigger an error
        if (!res.ok) throw new Error(`Error ${res.status}: ${res.statusText}`);

        // Parse the response and update the state with returned metric data
        const data = await res.json();
        setResponse(data.res);
      } catch (error: unknown) {
        // Capture and store any errors encountered during the request
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('An unkown error occured');
        }
      }
    },
    [] // Empty dependency array ensures the callback is stable and doesn't recreate on each render
  );

  // Return both the response, error and the callback for use in frontend
  return { response, error, sendMetricsRequest };
};

export default useMetricsFetch;
