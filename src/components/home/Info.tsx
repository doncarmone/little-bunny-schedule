'use client';
import { format } from 'date-fns';
import { useEffect, useState } from 'react';

import {
  WiSunrise,
  WiSolarEclipse,
  WiMoonAltWaningCrescent5,
  WiNa,
} from 'react-icons/wi';

import { AiFillExperiment } from 'react-icons/ai';
import { FiPackage } from 'react-icons/fi';
import { FcBiomass } from 'react-icons/fc';
import { getPrettyDate, getShiftPretty } from '@/helpers/schuduleHelper';
import DatePicker from 'react-datepicker';
import { getSchedule } from '@/helpers/schudule';
import { Schedule } from '@/helpers/interafaces';

import 'react-datepicker/dist/react-datepicker.css';

export const Info = () => {
  const sysDate = format(new Date(), 'yyyy-MM-dd');

  const [startDate, setStartDate] = useState(new Date());
  const [info, setInfo] = useState<Schedule>();
  const [yearInfo, setYearInfo] = useState<Schedule[]>();
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const darkModeMediaQuery = window.matchMedia(
      '(prefers-color-scheme: dark)'
    );
    setTheme(darkModeMediaQuery.matches ? 'dark' : 'light');

    getSchedule(sysDate.slice(0, 4)).then((data) => {
      console.log(data);
      setYearInfo(data);
      // setInfo(getShiftObject(sysDate));
    });

    const handleChange = (e: MediaQueryListEvent) => {
      setTheme(e.matches ? 'dark' : 'light');
    };

    darkModeMediaQuery.addEventListener('change', handleChange);

    return () => {
      darkModeMediaQuery.removeEventListener('change', handleChange);
    };
  }, [sysDate]);

  const handleClick = (e: React.FormEvent) => {
    e.preventDefault();
    setIsOpen(!isOpen);
  };

  const handleChange = (
    date: Date | null,
    event?: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>
  ) => {
    setIsOpen(!isOpen);
    if (date === null) {
      //   setInfo(undefined);
      setStartDate(new Date());
      return;
    }
    setStartDate(date);
    // setInfo(getShiftObject(moment(date).format('YYYY-MM-DD')));
  };

  const getIconForShift = (shift: string) => {
    const iconClass = `inline pr-2 text-5xl ${
      theme === 'dark' ? 'text-white' : 'text-black'
    }`;
    switch (shift) {
      case '1':
        return <WiSunrise className={iconClass} />;
      case '2':
        return <WiSolarEclipse className={iconClass} />;
      case '3':
        return <WiMoonAltWaningCrescent5 className={iconClass} />;
      default:
        return <WiNa className={iconClass} />;
    }
  };

  const getIconForActivity = (activity: string) => {
    const iconClass = `inline pr-2 text-5xl ${
      theme === 'dark' ? 'text-white' : 'text-black'
    }`;
    switch (activity) {
      case 'Siembra':
        return <AiFillExperiment className={iconClass} />;
      case 'Preparación':
        return <FcBiomass className={iconClass} />;
      case 'Material de Empaque':
        return <FiPackage className={iconClass} />;
      default:
        return <WiNa className={iconClass} />;
    }
  };

  return (
    <div className='hero'>
      <div className='text-center hero-content'>
        <div className='max-w-lg'>
          {info === undefined ? (
            <h1 className='mb-5 text-5xl font-bold'>
              No hay datos para esa fecha
            </h1>
          ) : (
            <div>
              <h2 className='mb-5 text-3xl font-bold'>
                <span className='font-bold'>Fecha:</span>{' '}
                {getPrettyDate(sysDate)}
              </h2>
              <h2 className='mb-5 text-2xl'>
                Del: {getPrettyDate(info.start)}
              </h2>
              <h2 className='mb-5 text-2xl'>
                Hasta: {getPrettyDate(info.finish)}
              </h2>
              <h2 className='mb-5 text-3xl'>
                <span className='font-bold'>Turno: </span>{' '}
                {getShiftPretty(info.shift)} {getIconForShift(info.shift)}
              </h2>
              <h2 className='mb-5 text-3xl'>
                <span className='font-bold'>Actividad: </span> {info.activity}{' '}
                {getIconForActivity(info.activity)}
              </h2>

              <h3 className='mb-5 text-3xl'>
                <span className='font-bold'>Compañeros:</span>
              </h3>
              {info?.colleagues !== undefined ? (
                info?.colleagues.map((colleague, index) => (
                  <h3 key={index} className='mb-5 text-2xl'>
                    {colleague.activity} - {colleague.name}
                  </h3>
                ))
              ) : (
                <span>Error Loading Colleagues!</span>
              )}
            </div>
          )}
          <div>
            <div className='mb-5 text-2xl font-bold'>Consultar otra fecha:</div>
            <button className='btn btn-primary mx-4 my-2' onClick={handleClick}>
              {getPrettyDate(`${startDate}`)}
            </button>
            {isOpen && (
              <DatePicker selected={startDate} onChange={handleChange} inline />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
