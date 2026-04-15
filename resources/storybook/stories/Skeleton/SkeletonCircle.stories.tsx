import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';

import { SkeletonCircle } from 'hootsuite-bento';

const meta = {
  title: 'Bento/Skeleton/SkeletonCircle',
  component: SkeletonCircle,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    size: { description: 'The size is limited to the DS grid system' },
  },
} satisfies Meta<typeof SkeletonCircle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Base: Story = {};

export const CustomSize: Story = {
  name: 'With custom size',
  args: { size: '12' },
};
