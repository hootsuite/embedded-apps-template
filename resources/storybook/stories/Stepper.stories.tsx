import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { fn } from 'storybook/test';

import { Stepper } from 'hootsuite-bento';

const meta = {
  title: 'Bento/Stepper',
  component: Stepper,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    onChange: { control: false },
    minValue: { control: { type: 'number' } },
    maxValue: { control: { type: 'number' } },
    step: { control: { type: 'number' } },
    defaultValue: { control: { type: 'number' } },
    'aria-label': { control: 'text' },
  },
  args: {},
} satisfies Meta<typeof Stepper>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Base: Story = {
  args: {
    onChange: fn(),
    minValue: 0,
    maxValue: 5,
    'aria-label': 'example stepper',
  },
};

export const AllowNegativeValues: Story = {
  name: 'Allow negative values',
  args: {
    onChange: fn(),
    minValue: -4,
    inputWidth: 'auto',
    'aria-label': 'example stepper with negative values',
  },
};

export const WithManualValue: Story = {
  name: 'Control with manual value',
  args: {
    onChange: fn(),
    value: 5,
    'aria-label':
      'example stepper with a manual value that will change only when parent comp changes the value',
  },
};

export const WithCustomInputWidth: Story = {
  name: 'Uses a custom width for the input',
  args: {
    inputWidth: '100px',
    'aria-label':
      'example stepper with a manual value that will change only when parent comp changes the value',
  },
};

export const WithCustomStep: Story = {
  name: 'Uses a custom step',
  args: {
    inputWidth: '100px',
    defaultValue: 3,
    step: 3,
    'aria-label':
      'example stepper with a value that will change based on an increment of 2',
  },
};
