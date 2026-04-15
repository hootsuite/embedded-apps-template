import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';

import { SkeletonText } from 'hootsuite-bento';

const meta = {
  title: 'Bento/Skeleton/SkeletonText',
  component: SkeletonText,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    width: {
      description: 'Custom width of the text skeleton',
    },
  },
} satisfies Meta<typeof SkeletonText>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Base: Story = {};

export const CustomWidth: Story = {
  name: 'With custom width',
  args: { width: '120px' },
};
