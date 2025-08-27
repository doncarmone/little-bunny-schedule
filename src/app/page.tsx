import { Info } from '@/components/home/Info';
export default function Home() {
  return (
    <div className='flex flex-col justify-between'>
      <main className='container mx-auto px-3 pb-12'>
        <Info />
      </main>
    </div>
  );
}
