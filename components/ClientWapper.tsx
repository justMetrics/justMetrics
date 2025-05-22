'use client';

import React, { useState, useEffect } from 'react';
import KeyInPut from './KeyInPut';
import Metrics from './Metrics';

const ClientWapper = () => {
  const [insData, setInsData] = useState<any[]>([]);
  const [isAccessKey, setIsAccessKey] = useState(false);

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
        <Metrics insData={insData} />
      ) : (
        <KeyInPut accessKeyHandler={accessKeyHandler} setInsData={setInsData} />
      )}
    </div>
  );
};

export default ClientWapper;
