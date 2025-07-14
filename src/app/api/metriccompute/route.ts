'use client';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  // Extract credentials and region from the request body
  const data = await req.json();

  const getAnalysis = await fetch('http://18.207.127.145:5050/analysis', {
    //move to backend, then make backend connect
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      data: data.data,
    }),
  });
  const res = await getAnalysis.json()
  console.log(res);

  return NextResponse.json({ res:res }, { status: 200 });
}
