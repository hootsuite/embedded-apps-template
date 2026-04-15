import type { Meta } from '@storybook/react-webpack5';
import type { CalendarProps } from 'hootsuite-bento';

const timeZoneOptions = [
  'America/Los_Angeles',
  'America/Toronto',
  'Europe/Berlin',
  'Europe/Paris',
  'Asia/Tokyo',
];

const DEFAULT_TIME_ZONE = Intl.DateTimeFormat().resolvedOptions().timeZone;

const localeOptions = ['en', 'fr', 'it', 'de', 'es', 'pt', 'ar'];
const DEFAULT_LOCALE = 'en';

export const baseArgTypes: Meta<CalendarProps>['argTypes'] = {
  isDisabled: { control: 'boolean' },
  minDate: { control: 'date' },
  maxDate: { control: 'date' },
  selectedDate: { control: 'date' },
  locale: {
    options: localeOptions,
    control: { type: 'select' },
  },
  timeZone: {
    options: timeZoneOptions,
    control: { type: 'select' },
  },
  startsOnMonday: {
    control: 'boolean',
    description:
      'Whether the calendar forcefully starts on Monday or Sunday. This is determined by local otherwise.',
  },
};

/** Story/meta defaults (explicit object so story `args` is not typed as possibly undefined). */
export const baseArgs = {
  timeZone: DEFAULT_TIME_ZONE,
  locale: DEFAULT_LOCALE,
} satisfies Partial<CalendarProps>;

export const calendarAddlArgTypes: Meta<CalendarProps>['argTypes'] = {
  timePickerLabel: {
    if: { arg: 'withTime', truthy: true },
  },
  displayedDateRange: {
    control: 'radio',
    options: ['undefined', 'last 3 days'],
    mapping: {
      undefined: undefined,
      'last 3 days': {
        start: new Date(new Date().setDate(new Date().getDate() - 3)),
        end: new Date(),
      },
    },
  },
};
