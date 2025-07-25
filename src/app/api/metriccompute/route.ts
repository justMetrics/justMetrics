import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const data = await req.json();
  const getAnalysis = await fetch('http://54.234.40.140//python/analysis', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      data: data.instanceMetrics,
    }),
  });
  const res = await getAnalysis.json();

  return NextResponse.json({ res: res }, { status: 200 });
}
