'use client';

import { useState, useEffect } from 'react';
import useApiKeysFetch from '../../fetch/apiKeysFetch';
import dynamic from 'next/dynamic';
import { SingleValue } from 'react-select';

<<<<<<< HEAD:components/KeyInPut.tsx
// Dynamically import the Select component to prevent issues with server-side rendering (SSR)
const Select = dynamic(() => import('react-select'), { ssr: false });

type selectedType = { value: string; label: string };

// Define Props type
type KeyInPutProps = {
  setInsData: React.Dispatch<React.SetStateAction<string[]>>; // Sets instance data returned from backend
  setCredentials: React.Dispatch<React.SetStateAction<string[]>>; // Sets stored AWS credentials
  setSelectedRegion: React.Dispatch<React.SetStateAction<string>>; // Sets selected region
};
=======
// Lazy load Select component to avoid SSR issues
const Select = dynamic(() => import('react-select'), {
  ssr: false,
}) as unknown as select;

// import types
import { KeyInPutProps, select, OptionType } from '../../types/componentsTypes';
>>>>>>> dfddea7d8d3e78549f7c0b761760b60e8a5311bd:components/application/KeyInPut.tsx

// KeyInPut Component: Handles credential input, region selection, and initiates API request

const KeyInPut = ({
  setInsData,
  setCredentials,
  setSelectedRegion,
}: KeyInPutProps) => {
  // Component state
  const [awsAccessKey, setAwsAccessKey] = useState('');
  const [secretAccessKey, setSecretAccessKey] = useState('');
  const [testRegion, setTestRegion] = useState('');
  const [fetchError, setFetchError] = useState<string | null>(null);

  // Custom hook for API calls
  const { response, error, sendApiKeys } = useApiKeysFetch();

  // Update parent components with API response once available
  useEffect(() => {
    if (response) {
      setInsData(response); // set instance data
      setCredentials([awsAccessKey, secretAccessKey]); // store credentials in parent state
      setSelectedRegion(testRegion); // update selected region
    }
  }, [response]);

  // Callback when a region is selected from dropdown
  const handleSelectRegion = (selectRegion: string) => {
    // * For debugging: Uncomment to verify selected Region from dropdown list
    // console.log('👀 👀 👀 👀 Select Region from dropdown list', selectRegion);
    setTestRegion(selectRegion); // update state for selected region
  };

  // Validate input and trigger API request on Connect button click
  const sendApi = () => {
    const url = '/api/awsmodelcreation'; // backend route

    // clear any existing error
    setFetchError('');

    // Check all fields are filled
    if (!awsAccessKey || !secretAccessKey || !testRegion) {
      setFetchError('Missing AWS Access Key or Secret Key or Region');
      return;
    }

    // Initiate request with provided input
    sendApiKeys(url, awsAccessKey, secretAccessKey, testRegion);

    // Handle any errors returned from the custom hook
    if (error) {
      setFetchError(error);
    }
  };

<<<<<<< HEAD:components/KeyInPut.tsx
  // AWS region options formatted for react-select
  const regions = [
=======
  // create an array with all us regions
  const regions: OptionType[] = [
>>>>>>> dfddea7d8d3e78549f7c0b761760b60e8a5311bd:components/application/KeyInPut.tsx
    { value: 'us-west-1', label: 'US West 1' },
    { value: 'us-west-2', label: 'US West 2' },
    { value: 'us-east-1', label: 'US East 1' },
    { value: 'us-east-2', label: 'US East 2' },
  ];

  return (
    <div className='h-screen p-10 box-border'>
      <div className='min-h-full flex flex-col items-center rounded-3xl bg-gradient-to-br from-gray-200 to-blue-200  shadow-2xl'>
        {/* Header Section */}
        <header className='h-[25vh] flex flex-row items-center text-5xl  p-7'>
          <h1 className=' font-thin'>Just Metrics</h1>
        </header>

        {/* Main Form Section */}
        <main className='h-[60vh] flex flex-col justify-end gap-8 p-7'>
          {/* Access Key Input */}
          <input
            className='aws-access-key-input bg-white rounded-2xl p-3 w-[500px] shadow-md focus:outline-none'
            placeholder='AWS Access Key'
            value={awsAccessKey}
            onChange={(e) => setAwsAccessKey(e.target.value)}
          ></input>

          {/* Secret Access Key Input */}
          <input
            className='secret-access-key-input bg-white rounded-2xl p-3 w-[500px] shadow-md focus:outline-none'
            placeholder='Secret Access Key'
            type='password'
            value={secretAccessKey}
            onChange={(e) => setSecretAccessKey(e.target.value)}
          ></input>

          {/* Region Selection Dropdown */}
          <Select
            classNamePrefix='regionLists'
            options={regions}
            onChange={(selected) => handleSelectRegion(selected?.value ?? '')}
            placeholder='Select a region...'
            isSearchable={false}
          />

          {/* Connect Button */}
          <button
            className='connect-button bg-white hover:bg-blue-300 rounded-2xl  p-1 w-[200px] h-[40px] shadow-md self-center m-10 transition-all cursor-pointer'
            onClick={sendApi}
          >
            Connect
          </button>
        </main>

        {/* Error message display */}
        {fetchError ? (
          <div className='missingParam-error flex items-center bg-red-500 p-4 rounded-2xl m-10'>
            {fetchError}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default KeyInPut;
