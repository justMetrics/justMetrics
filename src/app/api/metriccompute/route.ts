import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  // Extract credentials and region from the request body
  const data = await req.json();
  // console.log('data', data.instanceMetrics)
  const getAnalysis = await fetch('http://54.234.40.140//python/analysis', {
    //move to backend, then make backend connect
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      data: data.instanceMetrics,
    }),
  });
  const res = await getAnalysis.json()


  return NextResponse.json({ res:res }, { status: 200 });
}
