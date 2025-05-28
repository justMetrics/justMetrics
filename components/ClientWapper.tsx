'use client';

import React, { useState } from 'react';
import KeyInPut from './KeyInPut';
import Metrics from './Metrics';
import RegionSelector from './RegionSelector';

// type KeyInPutProps = {
//   setInsData: React.Dispatch<React.SetStateAction<any[]>>;
//   setCredentials: React.Dispatch<React.SetStateAction<string[]>>;
//   setAllRegions: React.Dispatch<React.SetStateAction<string[]>>;
// };

const ClientWapper = () => {
  // use States
  const [insData, setInsData] = useState<any[]>([]);
  const [credentials, setCredentials] = useState<string[]>([]);
  const [allRegions, setAllRegions] = useState<string[]>([]);
  const [selectedRegion, setSelectedRegion] = useState<string>('');

  console.log('clientwrapperRerender')
  return (
    <div>
      {credentials.length !== 0 ? 
      selectedRegion !=='placeholder' ?
       (
        <Metrics setSelectedRegion={setSelectedRegion} insData={insData} credentials={credentials} allRegions={allRegions} selectedRegion={selectedRegion} /> //3rd second component on if selectedRegion is falsy
      ): //put our actual component for selecting region
      <RegionSelector setSelectedRegion={setSelectedRegion} allRegions ={allRegions} setInsData={setInsData} selectedRegion={selectedRegion} credentials={credentials}/> //2nd
      : (
        <KeyInPut setInsData={setInsData} setCredentials={setCredentials} setAllRegions={setAllRegions} selectedRegion={selectedRegion}/> //1st
      )}
    </div>
  );
};

export default ClientWapper;
