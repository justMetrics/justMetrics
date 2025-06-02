import '@testing-library/jest-dom';

import { POST } from '../src/app/api/awsmetrics/route';
import { NextRequest, NextResponse } from 'next/server';

// create a jest.mock for AWS API

jest.mock('@aws-sdk/client-cloudwatch', () => {
  return {
    CloudWatchClient: jest.fn(() => ({
      send: jest.fn(),
    })),
    GetMetricDataCommand: jest.fn(),
  };
});
// beforeEach => create a mock request

describe('AWS Metrics', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  const createMockRequest = (body: any) => {
    return {
      json: () => Promise.resolve(body),
    } as NextRequest;
  };

  // it (should return right response if request is valid)

  it('should return correct response if request is valid', async () => {
    const mockAWSResponse = {
      MetricDataResults: [
        {
          Id: 'test0',
          Label: 'i-02a29f2e459e18bf0 CPUUtilization',
          Timestamps: ['2025-05-23T19:34:00.000Z'],
          Values: [0.20116699083079342],
          StatusCode: 'Complete',
        },
      ],
    };

    require('@aws-sdk/client-cloudwatch').cloudwatchClient.mockImplementation(
      () => {
        send: jest.fn().mockResolvedValue(mockAWSResponse);
      }
    );

    const req = createMockRequest({
      requestedMetrics: ['CPUUtilization'],
      instanceIds: [{ instanceId: 'i-02a29f2e459e18bf0' }],
      awsAccessKey: 'test',
      secretKey: 'test',
      region: 'us-east-1',
    });

    const response = await POST(req);
    const data = response.json();
    expect(response.status).toBe(200);
    expect(data.res).toHaveProperty('i-02a29f2e459e18bf0');
    expect(data.res['i-02a29f2e459e18bf0'][0]).toHaveProperty('CPUUtilization');
  });
});

// it (should return error if request is not valid)
