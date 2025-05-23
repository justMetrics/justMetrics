'use client';

import { useState, useEffect } from 'react';
import useApiKeysFetch from '../fetch/apiKeysFetch';
// type Credential = [accessKeyId: string, secretAccessKey: string];
type KeyInPutProps = {
  setInsData: React.Dispatch<React.SetStateAction<any[]>>;
  setCredentials: React.Dispatch<React.SetStateAction<string[]>>;
};

const KeyInPut = ({ setInsData, setCredentials }: KeyInPutProps) => {
  const [awsAccessKey, setAwsAccessKey] = useState('');
  const [secretAccessKey, setSecretAccessKey] = useState('');
  const [fetchError, setFetchError] = useState<string | null>(null);
  // custom hooks
  const { response, error, sendApiKeys } = useApiKeysFetch();
  
  useEffect(() => {
    if (response) {
      setInsData(response);
      // save credentials to state
      setCredentials([awsAccessKey, secretAccessKey]);
    }
  }, [response]);

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
    sendApiKeys(url, awsAccessKey, secretAccessKey);

    // if error is returned
    if (error) {
      setFetchError(error);
    }

    // reset keys input
    // setAwsAccessKey('');
    // setSecretAccessKey('');
  };
  return (
    <div>
      <div className='h-screen flex flex-col items-center rounded-3xl border-2 m-4 bg-gray-200 '>
        <header className='h-[15%] flex flex-row items-center text-5xl font-serif'>
          <h1>Just Metrics</h1>
        </header>

        <main className='h-[50%] flex flex-col justify-end gap-7'>
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
          <button
            className='connect-button bg-white hover:bg-gray-100 rounded-3xl border-[2.25px] p-1 w-[200px] shadow-xl self-center mt-10'
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
