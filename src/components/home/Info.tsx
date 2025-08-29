'use client';
import { format } from 'date-fns';
import { useEffect, useState } from 'react';

import {
  getPrettyDate,
  getShiftObject,
  getShiftPretty,
} from '@/helpers/schuduleHelper';
import DatePicker from 'react-datepicker';
import { getSchedule } from '@/helpers/schudule';
import { Schedule } from '@/helpers/interafaces';

import 'react-datepicker/dist/react-datepicker.css';
import { CurrentSchudule } from './CurrentSchudule';

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
      setYearInfo(data);
      setInfo(getShiftObject(data, sysDate));
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
      setInfo(undefined);
      setStartDate(new Date());
      return;
    }
    setStartDate(date);
    setInfo(getShiftObject(yearInfo, format(date, 'yyyy-MM-dd')));
  };

  return (
    <div className='hero'>
      <div className='text-center hero-content'>
        <div className='max-w-lg'>
          {info === undefined ? (
            <h1 className='mb-5 text-5xl text-slate-600 font-bold'>
              No hay datos para esa fecha
            </h1>
          ) : (
            <CurrentSchudule
              sysDate={format(startDate, 'yyyy-MM-dd')}
              info={info}
              theme={theme}
            />
          )}
          <div>
            <div className='mb-5 text-2xl font-bold text-slate-600'>
              Consultar otra fecha:
            </div>
            <button
              className='btn btn-blue-200 bg-azul mx-4 my-2'
              onClick={handleClick}
            >
              <span className='text-slate-600'>
                {getPrettyDate(`${startDate}`)}
              </span>
            </button>
          </div>
          {isOpen && (
            <DatePicker selected={startDate} onChange={handleChange} inline />
          )}
        </div>
      </div>
    </div>
  );
};
