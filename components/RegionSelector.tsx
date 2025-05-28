import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import useInstanceIdsFetch from '../fetch/instanceIdsFetch'

type RegionSelector = {
  insData: any;
  setSelectedRegion: React.Dispatch<React.SetStateAction<string>>;
  allRegions: string[];
  setInsData: React.Dispatch<React.SetStateAction<string[]>>;
  credentials: string[];
  selectedRegion: string;
};

export default function RegionSelector({ insData, setSelectedRegion, allRegions, setInsData, credentials, selectedRegion}: RegionSelector) {
  // custom hooks
  const { response, error, sendInstanceIDsRequest } = useInstanceIdsFetch();

  // state hooks
  const [fetchError, setFetchError] = useState(null);

  console.log('InsData', insData)

  // handle drop down list change and set region
  const handleSelectRegion = async(region: string) => {
      await setSelectedRegion(region);
      const url = '/api/awsinstances';
      const response2 = await sendInstanceIDsRequest(url, credentials[0], credentials[1], region);
      if (response2) console.log('response2', response2);
  };


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