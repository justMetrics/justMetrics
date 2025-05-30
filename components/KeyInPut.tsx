'use client';

import { useState, useEffect } from 'react';
import useApiKeysFetch from '../fetch/apiKeysFetch';
import dynamic from 'next/dynamic';

// Lazy load Select component to avoid SSR issues
const Select = dynamic(() => import('react-select'), { ssr: false });

// type Credential = [accessKeyId: string, secretAccessKey: string];
type KeyInPutProps = {
  setInsData: React.Dispatch<React.SetStateAction<string[]>>;
  setCredentials: React.Dispatch<React.SetStateAction<string[]>>;
  setSelectedRegion: React.Dispatch<React.SetStateAction<string>>;
};

// KeyInPut Component: Handles AWS credential input and region selection

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

  // Handle API response
  useEffect(() => {
    if (response) {
      setInsData(response);
      // save credentials to state
      setCredentials([awsAccessKey, secretAccessKey]);
      setSelectedRegion(testRegion);
    }
  }, [response]);

  // Handle region selection from dropdown with arg = the selected region value
  const handleSelectRegion = (selectRegion: string) => {
    // * For debugging: Uncomment to verify selected Region from dropdown list
    // console.log('👀 👀 👀 👀 Select Region from dropdown list', selectRegion);
    setTestRegion(selectRegion);
  };

  // Handle connect button click
  const sendApi = () => {
    const url = '/api/awsmodelcreation';

    // Reset previous errors
    setFetchError('');

    // Validate inputs
    if (!awsAccessKey || !secretAccessKey || !testRegion) {
      setFetchError('Missing AWS Access Key or Secret Key or Region');
      return;
    }

    // Call API
    sendApiKeys(url, awsAccessKey, secretAccessKey, testRegion);

    // if error is returned
    if (error) {
      setFetchError(error);
    }
  };

  // create an array with all us regions
  const regions = [
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
            onChange={(selected) => handleSelectRegion(selected?.value)}
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

        {/* Error Display */}
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
