'use client';

import React, { useState } from 'react';
import KeyInPut from './KeyInPut';
import Metrics from './Metrics';

const ClientWapper = () => {
  const [insData, setInsData] = useState<any[]>([]);
  const [credentials, setCredentials] = useState<string[]>([]);
  const [allRegions, setAllRegions] = useState<string[]>([]);
  //selectedRegion, setSelectedRegion here = useState<null | string>(null)
  //set region, and then set insData upon region selection
  console.log('clientwrapperRerender')
  return (
    <div>
      {credentials.length !== 0 ? (
        <Metrics insData={insData} credentials={credentials} allRegions={allRegions} /> //use && conditional on region, if region is truthy sent to metrics, if falsy show a "select route" component
      ) : (
        <KeyInPut setInsData={setInsData} setCredentials={setCredentials} setAllRegions={setAllRegions} />
      )}
    </div>
  );
};

export default ClientWapper;
