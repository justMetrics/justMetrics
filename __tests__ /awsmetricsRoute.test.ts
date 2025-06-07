import '@testing-library/jest-dom';

import { POST } from '../src/app/api/awsmetrics/route';
import { NextRequest } from 'next/server';
import { CloudWatchClient } from '@aws-sdk/client-cloudwatch';

// Mock AWS SDK so we can simulate different AWS responses
jest.mock('@aws-sdk/client-cloudwatch', () => {
  return {
    CloudWatchClient: jest.fn(() => ({
      send: jest.fn(),
    })),
    GetMetricDataCommand: jest.fn(),
  };
});

// Ensure mocks are reset before each test to avoid cross-test interference
describe('AWS Metrics', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Helper function to simulate a Next.js API request with a given body
  const createMockRequest = (body: any) => {
    return {
      json: () => Promise.resolve(body),
    } as NextRequest;
  };

  //Test a valid request flow
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

    // Mock AWS client to return expected metric data
    CloudWatchClient.mockImplementation(() => ({
      send: jest.fn().mockResolvedValue(mockAWSResponse),
    }));

    const req = createMockRequest({
      requestedMetrics: ['CPUUtilization'],
      instanceIds: [{ instanceId: 'i-03034239cc385e858' }],
      awsAccessKey: 'test',
      secretKey: 'test',
      region: 'us-west-2',
    });

    const response = await POST(req);
    const data = await response.json();

    // Verify API processes and formats response as expected
    expect(response.status).toBe(200);
    expect(data.res).toHaveProperty('i-03034239cc385e858');
    expect(data.res['i-03034239cc385e858'][0]).toHaveProperty('CPUUtilization');
  });

  //Test invalid validation - missing required field
  it('should return error mentioning which field is missing if request is NOT valid', async () => {
    const badReq = createMockRequest({
      //requestedMetrics is omitted here to simulate a bad request
      //requestedMetrics: ['CPUUtilization'],
      instanceIds: [{ instanceId: 'i-03034239cc385e858' }],
      awsAccessKey: 'test',
      secretKey: 'test',
      region: 'us-west-2',
    });
    const response = await POST(badReq);
    const data = await response.json();

    // Expect error to mention the missing field
    expect(response.status).toBe(500);
    expect(data.error).toContain('requestedMetrics');
  });

  // Test transformation of original AWS response into frontend-friendly structure
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

    CloudWatchClient.mockImplementation(() => ({
      send: jest.fn().mockResolvedValue(mockAWSResponse),
    }));

    const request = createMockRequest({
      requestedMetrics: ['CPUUtilization', 'NetworkIn'],
      instanceIds: [{ instanceId: 'i-03034239cc385e858' }],
      awsAccessKey: 'test',
      secretKey: 'test',
      region: 'us-west-2',
    });
    const response = await POST(request);
    const data = await response.json();

    // Ensure final response is structure correctly for front-end consumption
    expect(data.res).toHaveProperty('i-03034239cc385e858');
    expect(data.res['i-03034239cc385e858'][0]).toHaveProperty('CPUUtilization');
    expect(data.res['i-03034239cc385e858'][1].NetworkIn.Values[0]).toBe(100);
  });

  // Test correct handling of multiple instances in one request

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

    CloudWatchClient.mockImplementation(() => ({
      send: jest.fn().mockResolvedValue(mockAWSResponse),
    }));

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

    // Ensure metrics are grouped by both instance IDs
    expect(data.res).toHaveProperty('i-03034239cc385e858');
    expect(data.res).toHaveProperty('i-03034239cc385e860');
  });

  // Test AWS error is caught and reported correctly
  it('should handle AWS error', async () => {
    CloudWatchClient.mockImplementation(() => ({
      send: jest.fn().mockRejectedValue(new Error('testing')),
    }));
    const request = createMockRequest({
      requestedMetrics: ['NetworkIn'],
      instanceIds: [{ instanceId: 'i-03034239cc385e858' }],
      awsAccessKey: 'test',
      secretKey: 'test',
      region: 'us-west-2',
    });
    const response = await POST(request);
    const data = await response.json();

    // Expect status 500 and custom error message when AWS call fails
    expect(response.status).toBe(500);
    expect(data.error).toContain(
      'testing error in obtaining metrics from query'
    );
  });
});
