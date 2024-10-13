import { useState, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import BorderedInput from '@/components/(inputs)/BorderedInput';

export interface TimeSelectorProps {
  onTimeSelect?: (days: number, hours: number, minutes: number) => void;
}

const TimeSelector: React.FC<TimeSelectorProps> = ({ onTimeSelect }) => {
  const t = useTranslations('timeUnits');

  const [days, setDays] = useState<number>(0);
  const [hours, setHours] = useState<number>(0);
  const [minutes, setMinutes] = useState<number>(0);

  const handleTimeChange = useCallback(
    (unit: 'days' | 'hours' | 'minutes', value: string) => {
      const numericValue = Math.max(0, parseInt(value, 10) || 0);
      if (unit === 'days') setDays(numericValue);
      if (unit === 'hours') setHours(Math.min(23, numericValue));
      if (unit === 'minutes') setMinutes(Math.min(59, numericValue));

      if (onTimeSelect) {
        onTimeSelect(
          unit === 'days' ? numericValue : days,
          unit === 'hours' ? numericValue : hours,
          unit === 'minutes' ? numericValue : minutes
        );
      }
    },
    [days, hours, minutes, onTimeSelect]
  );

  return (
    <section className='flex w-full items-center gap-4'>
      <div className='flex flex-col'>
        <label className='text-sm'>{t('days')}</label>
        <BorderedInput
          type='number'
          value={days}
          onChange={(e) => handleTimeChange('days', e.target.value)}
          className='w-16 text-center'
        />
      </div>
      <div className='flex flex-col'>
        <label className='text-sm'>{t('hours')}</label>
        <BorderedInput
          type='number'
          value={hours}
          onChange={(e) => handleTimeChange('hours', e.target.value)}
          className='w-16 text-center'
        />
      </div>
      <div className='flex flex-col'>
        <label className='text-sm'>{t('minutes')}</label>
        <BorderedInput
          type='number'
          value={minutes}
          onChange={(e) => handleTimeChange('minutes', e.target.value)}
          className='w-16 text-center'
        />
      </div>
    </section>
  );
};

export default TimeSelector;
