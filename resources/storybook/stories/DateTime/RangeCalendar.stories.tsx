import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';
import type { DateRange, RangeCalendarProps } from '@ds/comp-date-picker';

import { RangeCalendar } from 'hootsuite-bento';

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

const meta = {
  title: 'Bento/DateTime/RangeCalendar',
  component: RangeCalendar,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    locale: { options: localeOptions, control: { type: 'select' } },
    timeZone: { options: timeZoneOptions, control: { type: 'select' } },
    minDate: { control: 'date' },
    maxDate: { control: 'date' },
    startsOnMonday: { control: 'boolean' },
    selectedDate: { control: 'object' },
  },
  args: {
    selectedDate: {
      start: new Date(new Date().setDate(new Date().getDate() - 3)),
      end: new Date(),
    },
    timeZone: DEFAULT_TIME_ZONE,
    locale: DEFAULT_LOCALE,
  },
} satisfies Meta<typeof RangeCalendar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Base: Story = {
  render: function Render(args: RangeCalendarProps) {
    const [selectedDate, setSelectedDate] = useState<DateRange | null>(null);

    function handleDateChange(date: DateRange | null) {
      setSelectedDate(date);
    }

    return (
      <RangeCalendar
        {...args}
        selectedDate={selectedDate}
        onDateChange={handleDateChange}
      />
    );
  },
};
