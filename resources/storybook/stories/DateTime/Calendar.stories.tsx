import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { useArgs } from 'storybook/preview-api';
import type { CalendarProps } from 'hootsuite-bento';

import { Calendar } from 'hootsuite-bento';

import {
  baseArgTypes,
  baseArgs,
  calendarAddlArgTypes,
} from '../datePickerCommonArgs';

const meta = {
  title: 'Bento/DateTime/Calendar',
  component: Calendar,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    ...baseArgTypes,
    ...calendarAddlArgTypes,
  },
  args: baseArgs,
} satisfies Meta<typeof Calendar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Base: Story = {
  render: function Render() {
    const [args, updateArgs] = useArgs<CalendarProps>();

    function handleDateChange(date: Date) {
      updateArgs({ selectedDate: date });
    }

    return <Calendar {...args} onDateChange={handleDateChange} />;
  },
};
