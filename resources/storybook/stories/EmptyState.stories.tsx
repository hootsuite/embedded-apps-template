import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { fn } from 'storybook/test';

import { EmptyState } from 'hootsuite-bento';

const meta = {
  title: 'Bento/EmptyState',
  component: EmptyState,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  args: {
    title: 'No content yet',
    message:
      'Sorry, the data is not able to show at the moment. Please try again later.',
    onPrimaryAction: fn(),
    onSecondaryAction: fn(),
  },
} satisfies Meta<typeof EmptyState>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Base: Story = {
  args: {
    title: 'Something went wrong',
    message: 'We encountered an issue while loading your content.',
    iconProps: {
      name: 'heart_broken',
    },
    primaryActionLabel: 'Try Again',
    secondaryActionLabel: 'Contact Support',
  },
};
