import React from 'react';
import type { Decorator, Meta, StoryObj } from '@storybook/react-webpack5';

import { ProgressBar } from 'hootsuite-bento';

const meta = {
  title: 'Bento/ProgressBar',
  component: ProgressBar,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    value: { control: { type: 'range', min: 0, max: 100, step: 1 } },
    minValue: { control: { type: 'number', min: 0, max: 100 } },
    maxValue: { control: { type: 'number', min: 0, max: 100 } },
    label: { description: 'Content to be display as the visual label' },
    'aria-label': { control: 'text' },
  },
  args: {
    size: 'medium',
    minValue: 0,
    maxValue: 100,
  },
} satisfies Meta<typeof ProgressBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithVisualLabel: Story = {
  name: 'Using a visual label',
  args: {
    label: 'Loading…',
    value: 73,
  },
};

export const WithoutLabel: Story = {
  name: 'Using aria-label instead of a visual label',
  args: {
    'aria-label': 'The progress bar is still loading',
    value: 37,
  },
  argTypes: {
    label: { control: false },
  },
};

const narrowDecorator: Decorator = Comp => (
  <div style={{ width: 200 }}>
    <Comp />
  </div>
);

export const WithinFixedWidthContainer: Story = {
  name: 'Using a constrained space container',
  args: {
    label: 'Loading...',
    value: 37,
  },
  decorators: [narrowDecorator],
};

export const WithWrongValue: Story = {
  name: 'Using a wrong value',
  args: {
    label: 'Loading...',
    value: 370,
  },
  argTypes: {
    value: { control: { type: 'number' } },
  },
};

export const WithDefaultLabel: Story = {
  name: 'Using the default label',
  args: {
    value: 50,
    showPercentage: true,
  },
};
