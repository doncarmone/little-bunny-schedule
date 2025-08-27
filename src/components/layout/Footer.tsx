import { Bunny } from './Bunny';

export const Footer = () => {
  const footerYear = new Date().getFullYear();
  return (
    <footer className='footer p-10 bg-gray-700 text-primary-content footer-center'>
      <div className='flex flex-col justify-between'>
        <Bunny />
        <p className='text-white'>
          Horario de la conejesinga hecho con ❤️, {footerYear} All Rights
          Reserved
        </p>
      </div>
    </footer>
  );
};
