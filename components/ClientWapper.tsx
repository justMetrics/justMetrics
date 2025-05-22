'use client';

import React, { useState } from 'react';
import KeyInPut from './KeyInPut';
import Metrics from './Metrics';


const ClientWapper = () => {
  const [insData, setInsData] = useState<any[]>([]);
  const [isAccessKey, setIsAccessKey] = useState(false);
  const [credentials, setCredentials] = useState<string[]>([]);
  
  const accessKeyHandler = () => {
    setIsAccessKey(true);
  };
  // useEffect(() => {
  //   if (insData) {
  //     console.log('insData', insData);
  //   }
  // }, [insData]);

  return (
    <div>
      {isAccessKey ? (
        <Metrics insData={insData} credentials={credentials} />
      ) : (
        <KeyInPut accessKeyHandler={accessKeyHandler} setInsData={setInsData} setCredentials={setCredentials} />
      )}
    </div>
  );
};

export default ClientWapper;
