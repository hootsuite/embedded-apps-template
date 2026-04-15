import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { fn } from 'storybook/test';

import { TimePicker } from 'hootsuite-bento';

const meta = {
  title: 'Bento/DateTime/TimePicker',
  component: TimePicker,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    value: {
      options: ['none', '10:45 AM', '08:25 PM'],
      mapping: {
        none: undefined,
        '10:45 AM': [10, 45],
        '08:25 PM': [20, 25],
      },
    },
    onChange: { control: false },
  },
  args: {
    onChange: fn(),
  },
} satisfies Meta<typeof TimePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Base: Story = {
  args: { 'aria-label': 'Start time picker' },
};

export const Segmented: Story = {
  args: {
    mode: 'segmented',
    'aria-label': 'End time picker',
  },
};

export const WithDefaultValue: Story = {
  args: {
    defaultValue: (() => {
      const date = new Date();
      return [date.getHours(), date.getMinutes()] as [number, number];
    })(),
  },
};
