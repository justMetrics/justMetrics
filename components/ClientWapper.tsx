'use client';

import React, { useState } from 'react';
import KeyInPut from './KeyInPut';
import Metrics from './Metrics';

const ClientWapper = () => {
  const [insData, setInsData] = useState<string[]>([]); //This state is set to the array of instances for the specified region/AWS keys in KeyInput.tsx
  const [credentials, setCredentials] = useState<string[]>([]); //Holds the AWS Keys required for login. Note they are only set AFTER they have been validated
  //(by "validated" we mean returned a response that isn't null) see KeyInput and the useEffect function using setCredentials for further details
  const [selectedRegion, setSelectedRegion] = useState<string>('') //The region specified by the user on the login page.
  
  return (
    <div>
      {credentials.length !== 0 ? ( //ternary operator. if credentials is an empty array, display KeyInput so the user can provide them. 
      // Otherwise, display Metrics.tsx.
        <Metrics
          insData={insData} //needs InsData to display the instance metadata for the selected instance
          credentials={credentials} //credentials/selectedRegon required to send request to Cloudwatch to obtain metrics for insData instances
          selectedRegion={selectedRegion}
          setCredentials={setCredentials} //setCredentials is passed because the sidebar component inside Metrics.tsx uses it to reassign credentials to
          //an empty array, logging the user out and bringing them back to the keyInput page
        />
      ) : (
        <KeyInPut //requires all setStates above to set credentials and selected region used to access EC2 client, and insData to save the response
          setSelectedRegion={setSelectedRegion}
          setInsData={setInsData}
          setCredentials={setCredentials}
        />
      )}
    </div>
  );
};

export default ClientWapper;
