'use client';

import React, { useState } from 'react';
import KeyInPut from './KeyInPut';
import Metrics from './Metrics';

const ClientWapper = () => {
  const [insData, setInsData] = useState<any[]>([]);
  const [credentials, setCredentials] = useState<string[]>([]);
  const [allRegions, setAllRegions] = useState<string[]>([]);
  console.log('clientwrapperRerender')
  return (
    <div>
      {credentials.length !== 0 ? (
        <Metrics insData={insData} credentials={credentials} allRegions={allRegions} />
      ) : (
        <KeyInPut setInsData={setInsData} setCredentials={setCredentials} setAllRegions={setAllRegions} />
      )}
    </div>
  );
};

export default ClientWapper;
