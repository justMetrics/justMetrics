import Link from 'next/link';
export default function Home() {
  return (
    <section>
      <div>home page</div>
      <Link href='/application'>Go to Application Page</Link>
    </section>
  );
}
