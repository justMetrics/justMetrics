import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import useInstanceIdsFetch from '../fetch/instanceIdsFetch'

type RegionSelector = {
  setSelectedRegion: React.Dispatch<React.SetStateAction<string>>;
  allRegions: string[];
  setInsData: React.Dispatch<React.SetStateAction<string[]>>;
  credentials: string[];
  selectedRegion: string;
};

export default function RegionSelector({ setSelectedRegion, allRegions, setInsData, credentials, selectedRegion}: RegionSelector) {
  // custom hooks
  const { response, error, sendInstanceIDsRequest } = useInstanceIdsFetch();

  // state hooks
  const [fetchError, setFetchError] = useState(null);

   useEffect(() => {
    if (response) {//!problem is with setInsData
      // save state for regions and instances
      console.log('response', response)
      //are we setting insData to the new instancess successfully (isntead of the hardcoded value)
      //AND IF WE ARE ARE WE UPDATING STATE PROPERLY ACROSS RELEVANT COMPONENTS
      // console.log(InsData)
      setInsData(response)
      // save credentials to state
    }
  }, [response]);

  // handle drop down list change
  let x = 'hi'
  const handleSelectRegion = (region: string) => {
    console.log('region', region)
    x = region
    setSelectedRegion(region);
    sendApi()
    
  }

  // invoke fetch function
  const sendApi = () => {
    const url = '/api/awsinstances';

    // invoke function to POST keys
    sendInstanceIDsRequest(url, credentials[0], credentials[1], x);
    // sendInstanceIDsRequest(url, credentials[0], credentials[1], selectedRegion);
    // add data to setInsatnceIds

    // if error is returned
    if (error) {
      setFetchError(error);
    };
  };
  //now, we need to do metrics fetch request
  //we need credentials, instance array and hardcoded metrics


  // map all the regions for react select
  const regionOptions = allRegions.map((region) => ({
    value: region,
    label: region,
  }));
  
  return (

    <div>
      <Select
      options={regionOptions}
      onChange={(selectedOption) => handleSelectRegion(selectedOption!.value)}
      className="border rounded-3xl p-2 m-2 mr-7 bg-gray-100"
      />
    </div>
  );
}