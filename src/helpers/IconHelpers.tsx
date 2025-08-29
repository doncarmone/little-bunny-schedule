import {
  WiSunrise,
  WiSolarEclipse,
  WiMoonAltWaningCrescent5,
  WiNa,
} from 'react-icons/wi';

import { AiFillExperiment } from 'react-icons/ai';
import { FiPackage } from 'react-icons/fi';
import { FcBiomass } from 'react-icons/fc';

export const getIconForShift = (
  shift: string,
  theme: string
): React.ReactNode => {
  const iconClass = `inline pr-2 text-5xl ${
    theme === 'dark' ? 'text-slate-600' : 'text-slate-600'
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

export const getIconForActivity = (
  activity: string,
  theme: string
): React.ReactNode => {
  const iconClass = `inline pr-2 text-5xl ${
    theme === 'dark' ? 'text-slate-600' : 'text-slate-600'
  }`;
  console.log('ACTIVITY;', activity);
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
