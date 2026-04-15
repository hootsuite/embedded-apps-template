import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { useArgs } from 'storybook/preview-api';
import type { InlineCalendarProps } from 'hootsuite-bento';

import { InlineCalendar } from 'hootsuite-bento';

import {
  baseArgTypes,
  baseArgs,
  calendarAddlArgTypes,
} from '../datePickerCommonArgs';

const meta = {
  title: 'Bento/DateTime/InlineCalendar',
  component: InlineCalendar,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    ...baseArgTypes,
    ...calendarAddlArgTypes,
  },
  args: baseArgs,
} satisfies Meta<typeof InlineCalendar>;

export default meta;
type Story = StoryObj<typeof InlineCalendar>;

export const Base: Story = {
  args: baseArgs,
  render: function Render() {
    const [args, updateArgs] = useArgs<InlineCalendarProps>();

    function handleDateChange(date: Date) {
      updateArgs({ selectedDate: date });
    }

    return <InlineCalendar {...args} onDateChange={handleDateChange} />;
  },
};
