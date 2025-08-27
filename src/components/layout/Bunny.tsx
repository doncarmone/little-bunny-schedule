import Image from 'next/image';
import bunnyGif from './assets/bunny.gif';
import React from 'react';

export const Bunny = () => {
  return (
    <Image
      className='inline pr-2 h-8'
      src={bunnyGif}
      height={64}
      width={64}
      alt='Bunny'
      unoptimized
    />
  );
};
