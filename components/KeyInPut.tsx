'use client';

import { useState, useEffect } from 'react';
import useApiKeysFetch from '../fetch/apiKeysFetch';
import dynamic from 'next/dynamic';
const Select = dynamic(() => import('react-select'), { ssr: false });

// type Credential = [accessKeyId: string, secretAccessKey: string];
type KeyInPutProps = {
  setInsData: React.Dispatch<React.SetStateAction<any[]>>;
  setCredentials: React.Dispatch<React.SetStateAction<string[]>>;
  setSelectedRegion: React.Dispatch<React.SetStateAction<string>>;
};

const KeyInPut = ({ setInsData, setCredentials, setSelectedRegion }: KeyInPutProps) => {
  const [awsAccessKey, setAwsAccessKey] = useState('');
  const [secretAccessKey, setSecretAccessKey] = useState('');
  const [testRegion, setTestRegion] = useState('');
  const [fetchError, setFetchError] = useState<string | null>(null);
  // custom hooks
  const { response, error, sendApiKeys } = useApiKeysFetch();

  useEffect(() => {
    if (response) {
      console.log('useEffectResponse', response)
      setInsData(response);
      // save credentials to state
      setCredentials([awsAccessKey, secretAccessKey]);
      setSelectedRegion(testRegion);
      console.log('testRegionfromuseEffect',testRegion)
    }
  }, [response]);

  const handleSelectRegion = (selectRegion) => {
    console.log('Select Region from dropdown list on main page', selectRegion);
    setTestRegion(selectRegion)
    // setRegion(selectRegion)
  };

  // invoke fetch function
  const sendApi = () => {
    const url = '/api/awsmodelcreation';

    // reset state
    setFetchError('');
    // throw error if missing keys
    if (!awsAccessKey || !secretAccessKey) {
      setFetchError('Missing AWS Access Key or Secret Key');
      return;
    }
    // invoke function to POST keys
    sendApiKeys(url, awsAccessKey, secretAccessKey, testRegion);

    // if error is returned
    if (error) {
      setFetchError(error);
    }
  };

  // create an array with all us regions
    const regions = [{value: 'us-west-1', label: 'US West 1'}, {value: 'us-west-2', label: 'US West 2'}, {value: 'us-east-1', label: 'US East 1'}, {value: 'us-east-2', label: 'US East 2'}];
    // create drop down list for react option
  //  const regionLists = regions.map((region: string) => ({
  //   value: region,
  //   label: region,
  // }));

  return (
    <div className='h-screen p-4 box-border'>
      <div className='min-h-full flex flex-col items-center rounded-3xl border-2 bg-gray-200'>
        <header className='h-[25vh] flex flex-row items-center text-5xl font-serif p-7'>
          <h1>Just Metrics</h1>
        </header>

        <main className='h-[60vh] flex flex-col justify-end gap-8 p-7'>
          <input
            className='aws-access-key-input bg-white rounded-2xl border-[1.5px] p-3 w-[500px] shadow-xl'
            placeholder='AWS Access Key'
            value={awsAccessKey}
            onChange={(e) => setAwsAccessKey(e.target.value)}
          ></input>
          <input
            className='secret-access-key-input bg-white rounded-2xl border-[1.5px] p-3 w-[500px] shadow-xl'
            placeholder='Secret Access Key'
            type='password'
            value={secretAccessKey}
            onChange={(e) => setSecretAccessKey(e.target.value)}
          ></input>
          <Select
          classNamePrefix="regionLists"
          options={regions}
          onChange={(selected) => handleSelectRegion(selected?.value)}
          placeholder="Select a region..."
          isSearchable={false}
          />
          <button
            className='connect-button bg-white hover:bg-gray-100 rounded-3xl border-[2.25px] p-1 w-[200px] shadow-xl self-center m-10'
            onClick={sendApi}
          >
            Connect
          </button>
        </main>
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
