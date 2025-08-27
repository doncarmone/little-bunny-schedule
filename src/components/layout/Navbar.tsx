import Link from 'next/link';
import { Bunny } from './Bunny';

interface Props {
  title: string;
}

export const Navbar = ({ title }: Props) => {
  return (
    <nav className='navbar mb-12 shadow-lg bg-indigo-700 text-neutral-content'>
      <div className='container mx-auto'>
        <div className='flex-none px-2 mx-2'>
          <Bunny />
          <Link href='/' className='text-lg text-white font-bold align-middle'>
            {title}
          </Link>
        </div>
      </div>
    </nav>
  );
};
