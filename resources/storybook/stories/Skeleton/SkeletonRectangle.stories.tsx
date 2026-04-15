import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';

import { SkeletonRectangle } from 'hootsuite-bento';

const meta = {
  title: 'Bento/Skeleton/SkeletonRectangle',
  component: SkeletonRectangle,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    width: {
      description: 'Custom width of the rectangle skeleton',
    },
    height: {
      description: 'Custom height of the rectangle skeleton',
    },
  },
} satisfies Meta<typeof SkeletonRectangle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Base: Story = {};

export const CustomProps: Story = {
  name: 'With custom width and height',
  args: { width: '200px', height: '80px' },
};
