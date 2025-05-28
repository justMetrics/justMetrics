'use client';

import React, { useState } from 'react';
import KeyInPut from './KeyInPut';
import Metrics from './Metrics';

const ClientWapper = () => {
  const [insData, setInsData] = useState<any[]>([]);
  const [credentials, setCredentials] = useState<string[]>([]);
  const [selectedRegion, setSelectedRegion] = useState<string>('')
  console.log('clientwrapperRerender')
  return (
    <div>
      {credentials.length !== 0 ? (
        <Metrics insData={insData} credentials={credentials} selectedRegion={selectedRegion} />
      ) : (
        <KeyInPut setSelectedRegion={setSelectedRegion}setInsData={setInsData} setCredentials={setCredentials} />
      )}
    </div>
  );
};

export default ClientWapper;
