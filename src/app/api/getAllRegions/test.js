const data = {
  $metadata: {
    httpStatusCode: 200,
    requestId: '6d96a4b3-9c4b-4865-81f5-dc0737f35caa',
    extendedRequestId: undefined,
    cfId: undefined,
    attempts: 1,
    totalRetryDelay: 0,
  },
  MetricDataResults: [
    {
      Id: 'test0',
      Label: 'i-02a29f2e459e18bf0 CPUUtilization',
      Timestamps: [Array],
      Values: [Array],
      StatusCode: 'Complete',
    },
    {
      Id: 'test1',
      Label: 'i-02a29f2e459e18bf0 NetworkIn',
      Timestamps: [Array],
      Values: [Array],
      StatusCode: 'Complete',
    },
    {
      Id: 'test2',
      Label: 'i-02a29f2e459e18bf0 DiskWriteOps',
      Timestamps: [],
      Values: [],
      StatusCode: 'Complete',
    },
    {
      Id: 'test3',
      Label: 'i-06099a5a414309d0e CPUUtilization',
      Timestamps: [Array],
      Values: [Array],
      StatusCode: 'Complete',
    },
    {
      Id: 'test4',
      Label: 'i-06099a5a414309d0e NetworkIn',
      Timestamps: [Array],
      Values: [Array],
      StatusCode: 'Complete',
    },
    {
      Id: 'test5',
      Label: 'i-06099a5a414309d0e DiskWriteOps',
      Timestamps: [Array],
      Values: [Array],
      StatusCode: 'Complete',
    },
  ],
  Messages: [],
};

const finalResponse = {};
for (let i = 0; i < data.MetricDataResults.length; i++) {
  const labelArray = data.MetricDataResults[i].Label.split(' ');
  //result in instanceid, metric
  // console.log(labelArray);
  const instanceId = labelArray[0];
  const metric = labelArray[1];
  const instance = {};

  const metricsObject = {};
  metricsObject[labelArray[1]] = {
    Timestamps: data.MetricDataResults[i].Timestamps,
    Values: data.MetricDataResults[i].Values,
  };

  if (finalResponse[instanceId]) {
    //problem is here
    finalResponse[instanceId].push(metricsObject);
  } else {
    const instance = [];
    instance.push(metricsObject);
    finalResponse[instanceId] = instance;
  }
}

// console.log('finalResponse', finalResponse);
// console.log('cpuusage', finalResponse['i-02a29f2e459e18bf0'][0].CPUUtilization);
const res = {
  'i-02a29f2e459e18bf0': [
    {
      CPUUtilization: {
        Timestamps: [],
        Value: [],
      },
    },
    {
      NetworkIn: {
        Timestamps: [],
        Value: [],
      },
    },
    {
      DiskWriteOps: {
        Timestamps: [],
        Value: [],
      },
    },
  ],
};

 

{
  'i-0d0415734a474f0c0': [
    { CPUUtilization: {
      Timestamps:['2025-05-23T19:34:00.000Z',...], 
      Values:[0.20116699083079342, ...]
    } 
  },

   

    { NetworkIn: [Object] },
    { DiskWriteOps: [Object] }
  ],
  'i-082dfd7d331d68492': [
    { CPUUtilization: [Object] },
    { NetworkIn: [Object] },
    { DiskWriteOps: [Object] }
  ],
  'i-00df2f423731a9178': [
    { CPUUtilization: [Object] },
    { NetworkIn: [Object] },
    { DiskWriteOps: [Object] }
  ]
}