import React, { useEffect, useState } from 'react';
import useInstanceIdsFetch from '../fetch/instanceIdsFetch'

type RegionSelector = {
  setSelectedRegion: React.Dispatch<React.SetStateAction<string[]>>;
  allRegions: React.Dispatch<React.SetStateAction<string[]>>;
  setInsData: React.Dispatch<React.SetStateAction<string[]>>;
  credentials: string[];
  selectedRegion: string;
};

export default function RegionSelector({ setSelectedRegion, allRegions, setInsData, credentials, selectedRegion}: RegionSelector) {
  // custom hooks
  const { response, error, sendInstanceIDsRequest } = useInstanceIdsFetch();

  // state hooks
  const [fetchError, setFetchError] = useState(null);


  // handle drop down list change
  const handleSelectRegion = (region: string) => {
    setSelectedRegion(region);
    
   useEffect(() => {
    if (response) {
      // save state for regions and instances
      setInsData(response.allInstances);
      // save credentials to state
    }
  }, []);

  // invoke fetch function
  const sendApi = () => {
    const url = '/api/jackieroute here';

    // invoke function to POST keys
    sendInstanceIDsRequest(url, credentials[0], credentials[1], selectedRegion);

    // add data to setInsatnceIds

    // if error is returned
    if (error) {
      setFetchError(error);
    }

    //now, we need to do metrics fetch request
    //we need credentials, instance array and hardcoded metrics
  }

  
  return (

    <div>
      <select
        id='regionSelect'
        className='border rounded-3xl p-2 m-2 mr-7 bg-gray-100'
        onChange={(e) => handleSelectRegion(e.target.value)}
      >
        {allRegions.map((region, i) => (
          <option key={i} value={region}>
            {region}
          </option>
        ))}
      </select>
    </div>
  );
}
}