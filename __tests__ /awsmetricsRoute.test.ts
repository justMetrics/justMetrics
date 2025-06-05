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
          Label: 'i-03034239cc385e858 CPUUtilization',
          Timestamps: ['2025-05-23T19:34:00.000Z'],
          Values: [0.20116699083079342],
          StatusCode: 'Complete',
        },
      ],
    };

    require('@aws-sdk/client-cloudwatch').CloudWatchClient.mockImplementation(
      () => ({
        send: jest.fn().mockResolvedValue(mockAWSResponse),
      })
    );

    const req = createMockRequest({
      requestedMetrics: ['CPUUtilization'],
      instanceIds: [{ instanceId: 'i-03034239cc385e858' }],
      awsAccessKey: 'test',
      secretKey: 'test',
      region: 'us-west-2',
    });

    const response = await POST(req);
    const data = await response.json();
    expect(response.status).toBe(200);
    expect(data.res).toHaveProperty('i-03034239cc385e858');
    expect(data.res['i-03034239cc385e858'][0]).toHaveProperty('CPUUtilization');
  });

  // it (should return error if request is not valid)
  it('should return error mentioning which field is missing if request is NOT valid', async () => {
    const badReq = createMockRequest({
      //requestedMetrics: ['CPUUtilization'],
      instanceIds: [{ instanceId: 'i-03034239cc385e858' }],
      awsAccessKey: 'test',
      secretKey: 'test',
      region: 'us-west-2',
    });
    const response = await POST(badReq);
    const data = await response.json();

    expect(response.status).toBe(500);
    expect(data.error).toContain('requestedMetrics');
  });

  // Test transformation from original response to final response is working correctly
  it('should transform orginal response correctly', async () => {
    const mockAWSResponse = {
      MetricDataResults: [
        {
          Id: 'test0',
          Label: 'i-03034239cc385e858 CPUUtilization',
          Timestamps: ['2025-05-23T19:34:00.000Z'],
          Values: [0.20116699083079342],
          StatusCode: 'Complete',
        },
        {
          Id: 'test1',
          Label: 'i-03034239cc385e858 NetworkIn',
          Timestamps: ['2025-05-23T19:34:00.000Z'],
          Values: [100],
          StatusCode: 'Complete',
        },
      ],
    };

    require('@aws-sdk/client-cloudwatch').CloudWatchClient.mockImplementation(
      () => ({
        send: jest.fn().mockResolvedValue(mockAWSResponse),
      })
    );

    const request = createMockRequest({
      requestedMetrics: ['CPUUtilization', 'NetworkIn'],
      instanceIds: [{ instanceId: 'i-03034239cc385e858' }],
      awsAccessKey: 'test',
      secretKey: 'test',
      region: 'us-west-2',
    });
    const response = await POST(request);
    const data = await response.json();
    expect(data.res).toHaveProperty('i-03034239cc385e858');
    expect(data.res['i-03034239cc385e858'][0]).toHaveProperty('CPUUtilization');
    expect(data.res['i-03034239cc385e858'][1].NetworkIn.Values[0]).toBe(100);
  });

  // Test error handler

  it('should handle multiple instances correctly', async () => {
    const mockAWSResponse = {
      MetricDataResults: [
        {
          Id: 'test1',
          Label: 'i-03034239cc385e858 NetworkIn',
          Timestamps: ['2025-05-23T19:34:00.000Z'],
          Values: [100],
          StatusCode: 'Complete',
        },
        {
          Id: 'test1',
          Label: 'i-03034239cc385e860 NetworkIn',
          Timestamps: ['2025-05-23T19:34:00.000Z'],
          Values: [100],
          StatusCode: 'Complete',
        },
      ],
    };

    require('@aws-sdk/client-cloudwatch').CloudWatchClient.mockImplementation(
      () => ({
        send: jest.fn().mockResolvedValue(mockAWSResponse),
      })
    );
    const request = createMockRequest({
      requestedMetrics: ['NetworkIn'],
      instanceIds: [
        { instanceId: 'i-03034239cc385e858' },
        { instanceId: 'i-03034239cc385e860' },
      ],
      awsAccessKey: 'test',
      secretKey: 'test',
      region: 'us-west-2',
    });

    const response = await POST(request);
    const data = await response.json();
    expect(data.res).toHaveProperty('i-03034239cc385e858');
    expect(data.res).toHaveProperty('i-03034239cc385e860');
  });

  it('should handle AWS error', async () => {
    require('@aws-sdk/client-cloudwatch').CloudWatchClient.mockImplementation(
      () => ({
        send: jest.fn().mockRejectedValue(new Error('testing')),
      })
    );
    const request = createMockRequest({
      requestedMetrics: ['NetworkIn'],
      instanceIds: [{ instanceId: 'i-03034239cc385e858' }],
      awsAccessKey: 'test',
      secretKey: 'test',
      region: 'us-west-2',
    });
    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(500);
    expect(data.error).toContain(
      'testing error in obtaining metrics from query'
    );
  });
});
