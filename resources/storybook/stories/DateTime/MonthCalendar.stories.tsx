import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';
import type { MonthCalendarProps } from 'hootsuite-bento';

import { MonthCalendar } from 'hootsuite-bento';

import { baseArgTypes, baseArgs } from '../datePickerCommonArgs';

const meta = {
  title: 'Bento/DateTime/MonthCalendar',
  component: MonthCalendar,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: baseArgTypes,
  args: baseArgs,
} satisfies Meta<typeof MonthCalendar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Base: Story = {
  render: function Render(args: MonthCalendarProps) {
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);

    function handleDateChange(date: Date) {
      setSelectedDate(date);
    }

    return (
      <MonthCalendar
        {...args}
        selectedDate={selectedDate}
        onDateChange={handleDateChange}
      />
    );
  },
};
