import { getIconForActivity, getIconForShift } from '@/helpers/IconHelpers';
import { Schedule } from '@/helpers/interafaces';
import { getPrettyDate, getShiftPretty } from '@/helpers/schuduleHelper';

interface Props {
  sysDate: string;
  info: Schedule;
  theme: string;
}

export const CurrentSchudule = ({ sysDate, info, theme }: Props) => {
  return (
    <div className='text-slate-600'>
      <h2 className='mb-5 text-3xl font-bold'>
        <span className='font-bold'>Fecha:</span> {getPrettyDate(sysDate)}
      </h2>
      <h2 className='mb-5 text-2xl'>Del: {getPrettyDate(info.start)}</h2>
      <h2 className='mb-5 text-2xl'>Hasta: {getPrettyDate(info.finish)}</h2>
      <h2 className='mb-5 text-3xl'>
        <span className='font-bold'>Turno: </span> {getShiftPretty(info.shift)}{' '}
        {getIconForShift(info.shift, theme)}
      </h2>
      <h2 className='mb-5 text-3xl'>
        <span className='font-bold'>Actividad: </span> {info.activity}{' '}
        {getIconForActivity(info.activity, theme)}
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
  );
};
