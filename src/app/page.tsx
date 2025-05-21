import Link from 'next/link';

export default function Home() {
  return (
    <section className='w-screen h-screen bg-blue-50 flex flex-col justify-center items-center'>
      <h1 className='text-4xl font-bold'>Just Metrics</h1>
      <h2>The best way to monitor your EC2</h2>
      <Link href={'/apiKeys'}>
        <button className='bg-white w-25 h-8 border rounded-lg cursor-pointer hover:bg-cyan-500'>
          Join in
        </button>
      </Link>
    </section>
  );
}
